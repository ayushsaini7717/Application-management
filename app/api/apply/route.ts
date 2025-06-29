"use server";

import { PrismaClient } from "@prisma/client";
// import { Client, Storage, ID } from "appwrite";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const prisma = new PrismaClient();

export async function POST(req: Request){
    const session=await getServerSession(authOptions);
    const formdata=await req.formData();
    const token=formdata.get("token") as string;
    const secret_key=process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
    
    let UserId: string | null=null;

    if(session?.user?.email){
        const user=await prisma.user.findFirst({
            where:{
                email: session.user?.email
            }
        })
        if(user){
            UserId=user.id;
        }
    }

    const response=await fetch("https://www.google.com/recaptcha/api/siteverify",{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },body: `secret=${secret_key}&response=${token}`
    })
    const data=await response.json();

    if(!data.success){
        return NextResponse.json({message: "Captcha Failed!"});
    }


    const Fname=formdata.get("Fname") as string;
    const Lname=formdata.get("Lname") as string;
    const email=formdata.get("email") as string;
    const mobile = formdata.get("mobile") as string;
    const resume = formdata.get("resume");
    const Role=formdata.get("role") as string;
    const jobId=formdata.get("jobid") as string;

    try{

        // const formData = await req.formData();
        // const resume = formData.get("resume");

        if (!resume || typeof resume === "string") {
            return NextResponse.json({ msg: "No valid file provided!" }, { status: 400 });
        }

        const file = resume as Blob;

        const { data, error } = await supabase.storage
        .from("application-management")
        .upload(`public/${crypto.randomUUID()}.pdf`, file, {
            cacheControl: "3600",
            upsert: false,
        });

        if (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ msg: "Upload failed!" }, { status: 500 });
        }

        const { data: urlData } = supabase.storage
        .from("application-management")
        .getPublicUrl(data.path);
        // const client = new Client()
        //     .setEndpoint("https://cloud.appwrite.io/v1")
        //     .setProject(process.env.PROJECT_ID || ""); 

        // const storage = new Storage(client);

        // const response = await storage.createFile(
        //     process.env.BUCKET_ID || "",
        //     ID.unique(),
        //     resume
        // );

        // const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.BUCKET_ID}/files/${response.$id}/view?project=${process.env.PROJECT_ID}&mode=admin`;
        // console.log(fileUrl);
        
        await prisma.application.create({
            data: {
                Fname: Fname,
                Lname: Lname,
                email: email,
                mobile: mobile,
                resumelink: urlData.publicUrl,
                position: Role,
                date: new Date().toISOString().split('T')[0],
                UserId: UserId,
                JobId: jobId
            }
        })
        return NextResponse.json({message: "Successfully Submitted!"});
    }catch(err){
        console.log(err);
        throw new Error("Something went wrong! Error: "+err);
    }
}

