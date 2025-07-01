import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: NextRequest){
    const {searchParams}=new URL(req.url);
    const email=searchParams.get("email");
    try{
        const res=await prisma.application.findMany({
            where: {
                email: email!
            }
        })
        let scheduled=0;
        let rejected=0;
        let active=0;
        for(let i=0;i<res.length;i++){
            if(res[i].pending === false && res[i].scheduled === true){
                scheduled++;
            }else if(res[i].pending === false && res[i].scheduled === false){
                rejected++;
            }
            if(res[i].UserId !== null){
                active++;
            }
        }
        return NextResponse.json({active,scheduled,rejected});
    }catch(err){
        throw new Error("Failed to fetch candidate-stats "+err);
    }
}