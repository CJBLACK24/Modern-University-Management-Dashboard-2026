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
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  trustedOrigins: [
    process.env.FRONTEND_URL!,
    "http://localhost:3000",
    "https://modern-university-management-dashbo.vercel.app",
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
            subject: "Login to Academic Suite",
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">
                <!-- Email Header -->
                <div style="padding: 32px 24px 24px; border-bottom: 1px solid #e5e7eb;">
                  <div style="font-size: 24px; font-weight: bold; color: #0d9488; margin-bottom: 4px;">
                    Academic Suite
                  </div>
                </div>

                <!-- Main Content -->
                <div style="padding: 40px 24px;">
                  <!-- Greeting -->
                  <div style="margin-bottom: 24px;">
                    <h1 style="font-size: 18px; font-weight: 600; color: #134e4a; margin: 0 0 8px;">
                      Hi there,
                    </h1>
                    <p style="font-size: 16px; line-height: 24px; color: #4b5563; margin: 0;">
                      Welcome back to Academic Suite! We're excited to have you continue your journey with us.
                    </p>
                  </div>

                  <!-- Login Button -->
                  <div style="margin: 32px 0;">
                    <a href="${url}" 
                       style="background-color: #0d9488; 
                              color: white; 
                              padding: 14px 32px; 
                              border-radius: 8px; 
                              text-decoration: none; 
                              font-weight: 600; 
                              font-size: 16px;
                              display: inline-block;
                              border: none;
                              cursor: pointer;
                              text-align: center;
                              line-height: 1.5;">
                      Log In →
                    </a>
                  </div>

                  <!-- Instructions -->
                  <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                    <p style="font-size: 14px; line-height: 20px; color: #6b7280; margin: 0 0 16px;">
                      For security purposes, this link will expire in 24 hours and can only be used once.
                    </p>
                    <p style="font-size: 14px; line-height: 20px; color: #6b7280; margin: 0;">
                      If you didn't request this link, please ignore this email or let us know immediately.
                    </p>
                  </div>
                </div>

                <!-- Footer -->
                <div style="padding: 32px 24px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                  <div style="margin-bottom: 16px;">
                    <p style="font-size: 16px; font-weight: 600; color: #134e4a; margin: 0 0 8px;">
                      Happy learning!
                    </p>
                    <p style="font-size: 14px; line-height: 20px; color: #6b7280; margin: 0;">
                      Best regards,<br/>
                      <strong>The Academic Suite Team</strong>
                    </p>
                  </div>
                  
                  <!-- Alternative Link -->
                  <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                    <p style="font-size: 12px; line-height: 16px; color: #9ca3af; margin: 0 0 8px;">
                      If the button doesn't work, copy and paste this URL into your browser:
                    </p>
                    <a href="${url}" 
                       style="font-size: 12px; line-height: 16px; color: #0d9488; word-break: break-all; text-decoration: none;">
                      ${url}
                    </a>
                  </div>
                </div>
              </div>
            `,
            text: `Hi there,\n\nWelcome back to Academic Suite! We're excited to have you continue your journey with us.\n\nSimply click the link below, and you'll be logged in automatically:\n\n${url}\n\nFor security purposes, this link will expire in 24 hours and can only be used once. If you didn't request this link, please ignore this email or let us know immediately.\n\nHappy learning!\n\nBest regards,\nThe Academic Suite Team`,
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
        input: true,
      },
      imageCldPubId: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
});