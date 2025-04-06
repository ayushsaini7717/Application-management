import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: Request){
    try{
        const { searchParams } = new URL(req.url);
        const id=searchParams.get("id");
        const basicdetails=await prisma.jobopenings.findFirst({
            where: {
                id: id || "",
                
            }
        })

        const responsibilities=await prisma.responsibilities.findMany({
            where: {
                jobid: id || "",
            }
        })

        const requirements=await prisma.requirements.findMany({
            where: {
                jobid: id || "",
            }
        })

        const benifits=await prisma.benifits.findMany({
            where: {
                jobid: id || "",
            }
        })

        const skills=await prisma.skills.findMany({
            where: {
                jobid: id || "",
            }
        })

        return NextResponse.json({basicdetails,responsibilities,requirements,benifits,skills})
    }catch(err){
        console.log("err");
        throw new Error("something went wrong!");
    }
}