import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma=new PrismaClient();

export async function POST(req: Request){
    const body=await req.json();

    try{
        const response=await prisma.jobopenings.delete({
            where: {
                id: body.id
            }
        })

        return NextResponse.json({response});
    }catch(err){
        console.log(err);
        throw new Error("unable to delete job!");
    }
}