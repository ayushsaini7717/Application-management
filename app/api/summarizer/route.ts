import axios from "axios";
import { NextResponse } from "next/server";
// @ts-ignore
import pdfParse from "pdf-parse/lib/pdf-parse";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pdfUrl = body.pdfUrl;
    
    const response = await axios.get(pdfUrl, {
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