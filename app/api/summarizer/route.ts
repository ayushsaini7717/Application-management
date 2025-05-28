import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// @ts-ignore
import pdfParse from "pdf-parse/lib/pdf-parse";
import parseResumeResponse from "@/app/handlers/summaryParser";

const prisma=new PrismaClient();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id=body.id;

    const IsOnDb=await prisma.application.findFirst({
      where: {
        id: id
      },select: {
        id: true,
        Fname: true,
        Lname: true,
        email: true,
        mobile: true,
        resumelink: true,
        position: true,
        date: true,
        summary: true,
        scheduled: true,
        pending: true,
        Percentage: true,
        applications :{
          select: {
            full_desc: true
          }
        }
      }
    })

    if(IsOnDb?.summary != null){
      return NextResponse.json({summary: IsOnDb.summary});
    }    
    const response = await axios.get(IsOnDb?.resumelink!, {
      responseType: "arraybuffer",
    });
    // console.log(IsOnDb.)
    const buffer = Buffer.from(response.data, 'binary');
    
    const data = await pdfParse(buffer);
    const text = data.text;
    
    const prompt = `You are a skilled recruiter AI.

Please do two things based on the inputs below:

1. Summarize the candidate's resume into 3 to 4 clear bullet points that highlight the most important skills, experiences, and achievements.

2. Compare the candidate's resume to the job description and provide a single match percentage score from 0 to 100 indicating how well the resume fits the job.

Format your response exactly like this:

Resume Summary:
- Bullet point 1
- Bullet point 2
- Bullet point 3
- Bullet point 4 (if applicable)

Match Percentage: XX%

---

Resume:
${text}
Job Description:
${IsOnDb?.applications.full_desc}
`;
    const geminiResponse = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    const parsedResult=parseResumeResponse(geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text);

    await prisma.application.update({
      where: {
        id: id
      },
      data: {
        summary: parsedResult.summary,
        Percentage: parsedResult.matchPercentage.toString()
      }
    })

    return NextResponse.json({
      summary: geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text 
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}