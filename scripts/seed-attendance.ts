import { db } from "../db";
import { attendance, classes, enrollments } from "../db/schema";
import { eq } from "drizzle-orm";

async function seedAttendance() {
  console.log("🌱 Seeding Attendance Data...");

  // Get all active classes
  const allClasses = await db
    .select()
    .from(classes)
    .where(eq(classes.status, "active"));

  if (allClasses.length === 0) {
    console.log("No active classes found. Skipping attendance seed.");
    return;
  }

  // Pre-fetch all enrollments to minimize DB calls
  const allEnrollments = await db.select().from(enrollments);
  // Group enrollments by classId for faster lookup
  const enrollmentsByClass = allEnrollments.reduce((acc, enrollment) => {
    if (!acc[enrollment.classId]) {
      acc[enrollment.classId] = [];
    }
    acc[enrollment.classId].push(enrollment);
    return acc;
  }, {} as Record<number, typeof allEnrollments>);

  const attendanceRecords: (typeof attendance.$inferInsert)[] = [];
  const batchSize = 1000;

  for (const cls of allClasses) {
    const classEnrollments = enrollmentsByClass[cls.id] || [];
    if (classEnrollments.length === 0) continue;

    // Generate attendance for the last 5 days
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      for (const enrollment of classEnrollments) {
        const rand = Math.random();
        let status: "present" | "absent" | "late" | "excused" = "present";
        let remarks = "";

        if (rand > 0.95) {
          status = "excused";
          remarks = "Medical reason";
        } else if (rand > 0.9) {
          status = "late";
          remarks = "Traffic";
        } else if (rand > 0.8) {
          status = "absent";
        }

        attendanceRecords.push({
          studentId: enrollment.studentId,
          classId: cls.id,
          date: date,
          status: status,
          remarks: remarks,
        });
      }
    }
  }

  console.log(`Generated ${attendanceRecords.length} attendance records.`);

  // Insert in batches
  for (let i = 0; i < attendanceRecords.length; i += batchSize) {
    const batch = attendanceRecords.slice(i, i + batchSize);
    await db.insert(attendance).values(batch).onConflictDoNothing();
    console.log(
      `Inserted batch ${Math.floor(i / batchSize) + 1} / ${Math.ceil(
        attendanceRecords.length / batchSize
      )}`
    );
  }

  console.log("✅ Attendance Seeding Completed!");
  process.exit(0);
}

seedAttendance().catch((err) => {
  console.error("Error seeding attendance:", err);
  process.exit(1);
});
