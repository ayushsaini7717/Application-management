"use server";

import { PrismaClient } from "@prisma/client";
import { Client, Storage, ID } from "appwrite";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request){
    const formdata=await req.formData();
    const token=formdata.get("token") as string;
    const secret_key=process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
        
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
    const resume = formdata.get("resume") as File;
    const Role=formdata.get("role") as string;

    try{

        const client = new Client()
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject(process.env.PROJECT_ID || ""); 

        const storage = new Storage(client);

        const response = await storage.createFile(
            process.env.BUCKET_ID || "",
            ID.unique(),
            resume
        );

        const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.BUCKET_ID}/files/${response.$id}/view?project=${process.env.PROJECT_ID}&mode=admin`;
        console.log(fileUrl);
        await prisma.application.create({
            data: {
                Fname: Fname,
                Lname: Lname,
                email: email,
                mobile: mobile,
                resumelink: fileUrl,
                position: Role,
                date: new Date().toISOString().split('T')[0]
            }
        })
        return NextResponse.json({message: "Successfully Submitted!"});
    }catch(err){
        console.log(err);
        return NextResponse.json({ message: "Something went wrong!" });

    }
}

