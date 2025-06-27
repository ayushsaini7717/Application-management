import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, date, startTime, duration } = await req.json();

  if (!email || !date || !startTime || !duration) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
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

    const timeZone = 'Asia/Kolkata';
    const startDateTime = new Date(`${date}T${startTime}+05:30`); // Assuming date: '2025-06-27', startTime: '14:00'
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000); // duration in minutes

    const event = await calendar.events.insert({
      calendarId: email,
      requestBody: {
        summary: 'Scheduled Meeting',
        description: `Join the meeting using this link: ${meetLink}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone,
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone,
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
        
      <p>Dear candidate,</p>

      <p>We are pleased to inform you that your appointment has been scheduled.</p>

      <p>Appointment Details:</p>
      <p>📅 Date: ${date}</p>
      <p>⏰ Time: ${startTime}</p>
      <p>📍 Meeting link: ${meetLink}</p>

      <p>If you have any questions or need to reschedule, feel free to contact us.</p>

      <p>We look forward to meeting you!</p>

      <p>Best regards,</p>
      <p>ColoredCow</p>
      `,
    });

    return NextResponse.json({ message: 'Event created and email sent!', meetLink });
  } catch (error: any) {
    console.error('Meet Creation Error:', error);
    return NextResponse.json({ message: error.message || 'Internal server error' }, { status: 500 });
  }
}
