import { db } from "@/db";
import { enrollments } from "@/db/schema";
import { isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all grades
    const grades = await db
      .select({
        grade: enrollments.grade,
      })
      .from(enrollments)
      .where(isNotNull(enrollments.grade));

    // Bucketize in TS based on requested college grading scale
    const distribution = [
      { range: "1.0", count: 0, val: 1.0 },
      { range: "1.2", count: 0, val: 1.2 },
      { range: "1.3", count: 0, val: 1.3 },
      { range: "1.4", count: 0, val: 1.4 },
      { range: "1.5", count: 0, val: 1.5 },
      { range: "1.6", count: 0, val: 1.6 },
      { range: "1.7", count: 0, val: 1.7 },
      { range: "1.8", count: 0, val: 1.8 },
      { range: "1.9", count: 0, val: 1.9 },
      { range: "2.0", count: 0, val: 2.0 },
      { range: "2.25", count: 0, val: 2.25 },
      { range: "2.50", count: 0, val: 2.5 },
      { range: "2.75", count: 0, val: 2.75 },
      { range: "3.0", count: 0, val: 3.0 },
      { range: "4.0", count: 0, val: 4.0 },
      { range: "5.0", count: 0, val: 5.0 },
    ];

    grades.forEach(({ grade }) => {
      if (grade === null) return;
      // Find exact match or closest for decimals
      const bucket = distribution.find(
        (d) => Math.abs((grade as number) - d.val) < 0.01
      );
      if (bucket) {
        bucket.count++;
      }
    });

    return NextResponse.json(distribution);
  } catch (error) {
    console.error("Error fetching grade distribution:", error);
    return NextResponse.json(
      { error: "Failed to fetch grade distribution" },
      { status: 500 }
    );
  }
}
