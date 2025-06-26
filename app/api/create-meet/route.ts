import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    const meetLink = process.env.MEET_LINK;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GCAL_CLIENT_EMAIL!,
        private_key: process.env.GCAL_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const event = await calendar.events.insert({
      calendarId: email,
      requestBody: {
        summary: 'Scheduled Meeting',
        description: `Join the meeting using this link: ${meetLink}`,
        start: {
          dateTime: new Date(Date.now() + 10 * 60000).toISOString(), 
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: new Date(Date.now() + 40 * 60000).toISOString(), 
          timeZone: 'Asia/Kolkata',
        },
      },
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.APP_NAME!,
        pass: process.env.APP_PASSWORD!,
      },
    });

    await transporter.sendMail({
      from: `"ColoredCow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Google Meet is Scheduled',
      html: `
        <p>Hello,</p>
        <p>Your Google Meet has been scheduled.</p>
        <p><strong>Meeting Time:</strong> ${new Date(Date.now() + 10 * 60000).toLocaleString('en-IN')}</p>
        <p><strong>Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
        <p>Regards,<br/>Meeting Bot</p>
      `,
    });

    return NextResponse.json({ message: 'Event created and email sent!', meetLink });
  } catch (error: any) {
    console.error('Meet Creation Error:', error);
    return NextResponse.json({ message: error.message || 'Internal server error' }, { status: 500 });
  }
}
