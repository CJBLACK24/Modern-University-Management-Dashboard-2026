import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function checkUserTable() {
  try {
    console.log("Checking user table columns...");

    const result = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'user'
      ORDER BY ordinal_position;
    `;

    console.log("User table columns:");
    console.table(result);

    // Also check if there are any users
    const users = await sql`SELECT * FROM "user" LIMIT 1;`;
    console.log("\nSample user data:");
    console.log(users[0]);
  } catch (error) {
    console.error("Error:", error);
  }

  process.exit(0);
}

checkUserTable();
