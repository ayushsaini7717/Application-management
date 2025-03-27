"use server"
import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
import { Client, Storage, ID } from "appwrite";
const prisma = new PrismaClient();

const ApplyAction=async (formdata : FormData)=>{
    const Fname=formdata.get("Fname") as string;
    const Lname=formdata.get("Lname") as string;
    const email=formdata.get("email") as string;
    const mobile = formdata.get("mobile") as string;
    const resume = formdata.get("resume") as File;

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
        const application=await prisma.application.create({
            data: {
                Fname: Fname,
                Lname: Lname,
                email: email,
                mobile: mobile,
                resumelink: fileUrl
            }
        })
        // return NextResponse.json({msg: "success",application});
    }catch(err){
        console.log(err);
    }
}

export default ApplyAction;