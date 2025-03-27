"use server"
import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
const prisma = new PrismaClient();

const ApplyAction=async (formdata : FormData)=>{
    const Fname=formdata.get("Fname") as string;
    const Lname=formdata.get("Lname") as string;
    const email=formdata.get("email") as string;
    const mobile = formdata.get("mobile") as string;

    try{
        const application=await prisma.application.create({
            data: {
                Fname: Fname,
                Lname: Lname,
                email: email,
                mobile: mobile
            }
        })
        // return NextResponse.json({msg: "success",application});
    }catch(err){
        console.log(err);
    }
}

export default ApplyAction;