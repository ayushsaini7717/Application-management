import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request){
    try{
        const body=await req.json();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            port: 587, 
            secure: false, 
            auth: {
                user: process.env.APP_NAME,
                pass: process.env.APP_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: `"CareerPoint" <${process.env.APP_NAME}>`,
            to: body.to,
            subject: body.subject,
            text: body.text
        });

        return NextResponse.json({msg: "Email successfully sent!",msgId: info.messageId});
    }catch(err){
        console.log(err);
        throw new Error("Email not sent!");
    }
}