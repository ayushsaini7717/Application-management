import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: Request){
    try{
        const details=await prisma.application.findMany();
        return NextResponse.json({msg: "Successfully fetched",details});
    }catch(err){
        console.log(err);
        throw new Error("Error in fetching applications.");
    }
}

