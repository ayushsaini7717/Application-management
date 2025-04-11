import { google } from "googleapis";
import { createInterface } from "readline";


const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
);


console.log(process.env.GMAIL_CLIENT_ID," ",process.env.GMAIL_CLIENT_SECRET," ",process.env.GMAIL_REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.readonly'],
});

console.log('Authorize this app by visiting this URL:', authUrl);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Your Refresh Token is:', tokens.refresh_token);
    rl.close();
  } catch (err) {
    console.error('Error retrieving access token', err);
  }
});



