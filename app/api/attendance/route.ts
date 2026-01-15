import { db } from "@/db";
import { attendance, classes, user } from "@/db/schema";
import { and, eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const classId = searchParams.get("classId");

    let conditions = undefined;
    const filters = [];

    if (studentId) filters.push(eq(attendance.studentId, studentId));
    if (classId) filters.push(eq(attendance.classId, parseInt(classId)));

    if (filters.length > 0) {
      conditions = and(...filters);
    }

    const data = await db
      .select({
        id: attendance.id,
        date: attendance.date,
        status: attendance.status,
        remarks: attendance.remarks,
        studentName: user.name,
        className: classes.name,
      })
      .from(attendance)
      .leftJoin(user, eq(attendance.studentId, user.id))
      .leftJoin(classes, eq(attendance.classId, classes.id))
      .where(conditions)
      .orderBy(desc(attendance.date))
      .limit(100);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}
