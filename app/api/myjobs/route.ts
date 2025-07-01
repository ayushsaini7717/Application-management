import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma=new PrismaClient();

export async function GET(req: Request){
    const {searchParams}=new URL(req.url);
    const email=searchParams.get("email");
    
    try{
        const applications = await prisma.application.findMany({
            where: {
              email: "sainiayush7717@gmail.com",
            },
        });
          

        return NextResponse.json({applications});
        
    }catch(e){
        console.log(e);
    }
}