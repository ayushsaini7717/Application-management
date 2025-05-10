import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

const prisma=new PrismaClient();


export async function POST(req: Request){
    try{
        const body=await req.json();
        const email=body.email;
        const password=body.password;
        const hash=await bcrypt.hash(password,10);
        await prisma.user.create({
        data:{
            email: email,
            password: hash
            }  
        })
        return NextResponse.json({success : true});
    }catch(e){
        console.log(e);
        return NextResponse.json({ success: false, message: 'Something went wrong' });
    }
}
