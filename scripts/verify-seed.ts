import { db } from "../db";
import {
  user,
  subjects,
  classes,
  enrollments,
  departments,
} from "../db/schema";
import { count } from "drizzle-orm";

async function verify() {
  try {
    const [uCount] = await db.select({ value: count() }).from(user);
    const [sCount] = await db.select({ value: count() }).from(subjects);
    const [cCount] = await db.select({ value: count() }).from(classes);
    const [eCount] = await db.select({ value: count() }).from(enrollments);
    const [dCount] = await db.select({ value: count() }).from(departments);

    console.log("📊 Database Seed Verification:");
    console.log(`- Users: ${uCount.value}`);
    console.log(`- Subjects: ${sCount.value}`);
    console.log(`- Classes: ${cCount.value}`);
    console.log(`- Enrollments: ${eCount.value}`);
    console.log(`- Departments: ${dCount.value}`);

    if (uCount.value > 0 && dCount.value > 0) {
      console.log("✅ Database is populated!");
    } else {
      console.log("⚠️ Database appears to be empty.");
    }
  } catch (error) {
    console.error("❌ Verification failed:", error);
  }
}

verify();
