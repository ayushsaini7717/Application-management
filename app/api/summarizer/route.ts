import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// @ts-ignore
import pdfParse from "pdf-parse/lib/pdf-parse";

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
      }
    })

    if(IsOnDb?.summary != null){
      return NextResponse.json({summary: IsOnDb.summary});
    }    
    const response = await axios.get(IsOnDb?.resumelink!, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data, 'binary');
    
    const data = await pdfParse(buffer);
    const text = data.text;
    
    const prompt = `Summarize this resume in 3-4 bullet points:\n${text}`;
    const geminiResponse = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    await prisma.application.update({
      where: {
        id: id
      },
      data: {
        summary: geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text
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