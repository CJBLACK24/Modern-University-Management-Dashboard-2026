import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import nodemailer from "nodemailer";

import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema/auth";

// Create Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASSWORD!,
  },
});

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  trustedOrigins: [
    process.env.FRONTEND_URL!,
    "http://localhost:3000",
    "https://modern-university-magement-dashboar.vercel.app",
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }: { email: string; url: string }) => {
        try {
          const info = await transporter.sendMail({
            from:
              process.env.EMAIL_FROM ||
              '"Academic Suite" <duquechristianjohncalderon@gmail.com>',
            to: email,
            subject: "Login to Academic Infrastructure Suite",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #0f172a; margin-bottom: 24px;">Login to Your Account</h2>
                <p style="color: #475569; font-size: 16px; line-height: 24px;">
                  Click the button below to sign in to your Academic Infrastructure Suite account. This link will expire shortly.
                </p>
                <div style="margin: 32px 0;">
                  <a href="${url}" style="background-color: #0f172a; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; display: inline-block;">
                    Verify Email & Login
                  </a>
                </div>
                <p style="color: #64748b; font-size: 14px;">
                  If you didn't request this email, you can safely ignore it.
                </p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
                <p style="color: #94a3b8; font-size: 12px;">
                  If the button doesn't work, copy and paste this URL into your browser: <br />
                  <a href="${url}" style="color: #3b82f6;">${url}</a>
                </p>
              </div>
            `,
          });

          console.log(
            `Magic link sent successfully to ${email}. Message ID: ${info.messageId}`
          );
        } catch (error) {
          console.error("Gmail SMTP Error:", error);
        }
      },
    }),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
        input: true, // Allow role to be set during registration
      },
      imageCldPubId: {
        type: "string",
        required: false,
        input: true, // Allow imageCldPubId to be set during registration
      },
    },
  },
});
