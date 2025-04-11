import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(){
    try{
        const res=await prisma.application.findMany({
            where: {
                scheduled: false,
                pending: false
            }
        })

        return NextResponse.json({res});
    }catch(err){
        console.log(err);
        throw new Error("Error in fetching!");
    }
}