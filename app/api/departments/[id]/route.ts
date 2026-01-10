import { NextRequest, NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { classes, departments, enrollments, subjects, user } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const departmentId = Number(id);

    if (!Number.isFinite(departmentId)) {
      return NextResponse.json(
        { error: "Invalid department id" },
        { status: 400 }
      );
    }

    const [department] = await db
      .select()
      .from(departments)
      .where(eq(departments.id, departmentId));

    if (!department) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }

    const [subjectsCount, classesCount, enrolledStudentsCount] =
      await Promise.all([
        db
          .select({ count: sql<number>`count(*)` })
          .from(subjects)
          .where(eq(subjects.departmentId, departmentId)),
        db
          .select({ count: sql<number>`count(${classes.id})` })
          .from(classes)
          .leftJoin(subjects, eq(classes.subjectId, subjects.id))
          .where(eq(subjects.departmentId, departmentId)),
        db
          .select({ count: sql<number>`count(distinct ${user.id})` })
          .from(user)
          .leftJoin(enrollments, eq(user.id, enrollments.studentId))
          .leftJoin(classes, eq(enrollments.classId, classes.id))
          .leftJoin(subjects, eq(classes.subjectId, subjects.id))
          .where(
            and(
              eq(user.role, "student"),
              eq(subjects.departmentId, departmentId)
            )
          ),
      ]);

    return NextResponse.json({
      data: {
        department,
        totals: {
          subjects: subjectsCount[0]?.count ?? 0,
          classes: classesCount[0]?.count ?? 0,
          enrolledStudents: enrolledStudentsCount[0]?.count ?? 0,
        },
      },
    });
  } catch (error) {
    console.error("GET /departments/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch department details" },
      { status: 500 }
    );
  }
}
