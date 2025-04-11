import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma=new PrismaClient();

export async function GET(){
    try{
        const res=await prisma.application.findMany({
            where: {
                pending: false,
                scheduled: true
            }
        })
        return NextResponse.json({res});
    }catch(err){
        console.log(err);
        throw new Error("Error in fetch details!");
    }
}