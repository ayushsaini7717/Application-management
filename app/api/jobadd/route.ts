import { PrismaClient } from "@prisma/client";
import {  NextResponse } from "next/server";
const prisma=new PrismaClient();

export async function POST(req: Request){
    try{
        const body=await req.json();
        

        const result=await prisma.$transaction(async (tx)=>{

            const response1=await tx.jobopenings.create({
                data: {
                    title: body.title,
                    department: body.department,
                    location: body.location,
                    type: body.type,
                    short_desc: body.short_desc,
                    experience: body.experience,
                    full_desc: body.full_desc
                }
            })

            const response2=await tx.responsibilities.createMany({
                data: body.responsibility.map((item: { responsibility: string }) => ({
                    responsibility: item.responsibility,
                    jobid: response1.id, 
                  })),
            })

            const response3=await tx.requirements.createMany({
                data: body.requirement.map((item: {requirement: string})=>({
                    requirement: item.requirement,
                    jobid: response1.id
                }))
            })

            const response4=await tx.benifits.createMany({
                data: body.benifit.map((item: {benifit: string})=>({
                    benifit: item.benifit,
                    jobid: response1.id
                }))
            })

            const response5=await tx.skills.createMany({
                data: body.Skill.map((item: {Skill: string})=>({
                    Skill: item.Skill,
                    jobid: response1.id
                }))
            })
            return {response1,response2,response3,response4,response5};

        })

        return NextResponse.json({msg: "Job added successfully!",result});
    }catch(err){
        console.log(err);
        throw new Error("Failed to add job!");
    }
}