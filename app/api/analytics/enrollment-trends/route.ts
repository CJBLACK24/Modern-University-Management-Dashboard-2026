import { db } from "@/db";
import { user } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Aggregate students by year level
    const studentsByYear = await db
      .select({
        yearLevel: user.yearLevel,
        count: count(),
      })
      .from(user)
      .where(eq(user.role, "student"))
      .groupBy(user.yearLevel);

    // Format for identifying trends (e.g., Freshman vs Seniors)
    const formatted = studentsByYear.map((item) => ({
      year: item.yearLevel ? `${item.yearLevel}th Year` : "Unknown",
      count: item.count,
    }));

    // Sort by year level
    formatted.sort((a, b) => a.year.localeCompare(b.year));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching enrollment trends:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollment trends" },
      { status: 500 }
    );
  }
}
