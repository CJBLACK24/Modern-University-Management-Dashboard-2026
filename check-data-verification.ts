import { db } from "./db";
import { user, subjects } from "./db/schema";
import { sql } from "drizzle-orm";

async function check() {
  const users = await db.select().from(user).limit(5);
  console.log("Users:", JSON.stringify(users, null, 2));

  const subs = await db.select().from(subjects).limit(5);
  console.log("Subjects:", JSON.stringify(subs, null, 2));

  process.exit(0);
}

check();
