"use server";

import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

const AddjobAction=async (formdata : FormData)=>{
    const JobTitle=formdata.get("JobTitle") as string;
    const dept=formdata.get("Dept") as string;
    const location=formdata.get("location") as string;
    const Type=formdata.get("Type") as string;
    const desc=formdata.get("desc") as string;

    try{
        await prisma.jobopenings.create({
            data: {
                title: JobTitle,
                department: dept,
                location: location,
                type: Type,
                desc: desc
            }
        })
    }catch(err){
        console.log(err);
        throw new Error("Job not Added!");
    }
}

export default AddjobAction;