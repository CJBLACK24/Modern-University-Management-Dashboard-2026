import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import path from "node:path";

// Explicitly load .env.local if we are not in production
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL is missing in environment variables.");
  console.log("Current working directory:", process.cwd());
  console.log(
    "Environment variables loaded:",
    Object.keys(process.env).filter(
      (k) => k.includes("DATABASE") || k.includes("URL")
    )
  );
  throw new Error("DATABASE_URL is not defined");
}

// Clean the database URL if it has problematic parameters for neon-http
// Some environments might have issues with channel_binding
const cleanUrl = databaseUrl.replace(/&channel_binding=require/g, "");

const sql = neon(cleanUrl);
export const db = drizzle(sql);
