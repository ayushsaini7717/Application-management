import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma=new PrismaClient();

export async function POST(req: Request){
    try{
        const body=await req.json();
        const response=await prisma.application.update({
            where: {
                id: body.id
            },data: {
                pending: false,
                scheduled: true
            }
        })
        return NextResponse.json({msg: "Successfully Scheduled!",response})
    }catch(err){
        console.log(err);
        throw new Error("Appointment not scheduled!");
    }
}