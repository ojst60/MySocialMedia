import nodemailer from "nodemailer";
import { google } from "googleapis";
import { env } from "./validation/env";
import Mail from "nodemailer/lib/mailer";

const CLIENT_ID = env.EMAIL_CLIENT_ID;
const CLIENT_SECRET = env.EMAIL_CLIENT_SECRET;
const REDIRECT_URI =
  env.NODE_ENV === "production" ? env.BACKEND_URI : "http://127.0.0.1/";
const REFRESH_TOKEN = env.EMAIL_REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(mailOptions: Mail.Options) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    if (!accessToken.token) {
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oauth2",
        user: "julius.dev1991@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
}
