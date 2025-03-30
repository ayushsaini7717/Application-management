import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma=new PrismaClient();

export async function GET(req: Request){
    try{
        const response=await prisma.jobopenings.findMany();
        return NextResponse.json({response});
    }catch(err){
        console.log(err);
    }
}