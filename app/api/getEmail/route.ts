import { google } from 'googleapis';

export async function POST(req: Request) {
  try {
    const { emailAddress } = await req.json(); 

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const response = await gmail.users.messages.list({
      userId: 'me',
      q: `from:${emailAddress} OR to:${emailAddress}`,
      maxResults: 10,
    });

    const messages = response.data.messages || [];

    const emails = await Promise.all(
      messages.map((message) =>
        gmail.users.messages.get({ userId: 'me', id: message.id! })
      )
    );

    const emailData = emails.map((email) => ({
      id: email.data.id,
      snippet: email.data.snippet,
      subject: email.data.payload?.headers?.find((h) => h.name === 'Subject')?.value,
      from: email.data.payload?.headers?.find((h) => h.name === 'From')?.value,
      to: email.data.payload?.headers?.find((h) => h.name === 'To')?.value,
      date: email.data.payload?.headers?.find((h) => h.name === 'Date')?.value,
    }));

    return new Response(JSON.stringify(emailData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch emails' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
