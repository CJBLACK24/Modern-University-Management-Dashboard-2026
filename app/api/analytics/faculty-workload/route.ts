import { db } from "@/db";
import { classes, user } from "@/db/schema";
import { count, eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get("departmentId");

    let conditions = eq(classes.status, "active");

    if (departmentId && departmentId !== "all") {
      conditions = and(
        conditions,
        eq(user.departmentId, parseInt(departmentId))
      )!;
    }

    // Count active classes per teacher
    const workload = await db
      .select({
        teacherName: user.name,
        classCount: count(classes.id),
      })
      .from(classes)
      .leftJoin(user, eq(classes.teacherId, user.id))
      .where(conditions)
      .groupBy(user.id, user.name);

    // Sort by heaviest workload and take top 10
    workload.sort((a, b) => b.classCount - a.classCount);

    return NextResponse.json(workload.slice(0, 10));
  } catch (error) {
    console.error("Error fetching faculty workload:", error);
    return NextResponse.json(
      { error: "Failed to fetch faculty workload" },
      { status: 500 }
    );
  }
}
