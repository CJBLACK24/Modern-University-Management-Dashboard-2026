import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { classes, enrollments, user } from "@/db/schema";
import { getEnrollmentDetails } from "./utils";

export async function POST(request: NextRequest) {
  try {
    const { classId, studentId } = await request.json();

    if (!classId || !studentId) {
      return NextResponse.json(
        { error: "classId and studentId are required" },
        { status: 400 }
      );
    }

    const [classRecord] = await db
      .select()
      .from(classes)
      .where(eq(classes.id, classId));

    if (!classRecord) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    const [student] = await db
      .select()
      .from(user)
      .where(eq(user.id, studentId));

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const [existingEnrollment] = await db
      .select({ id: enrollments.id })
      .from(enrollments)
      .where(
        and(
          eq(enrollments.classId, classId),
          eq(enrollments.studentId, studentId)
        )
      );

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "Student already enrolled in class" },
        { status: 409 }
      );
    }

    const [createdEnrollment] = await db
      .insert(enrollments)
      .values({ classId, studentId })
      .returning({ id: enrollments.id });

    if (!createdEnrollment) {
      return NextResponse.json(
        { error: "Failed to create enrollment" },
        { status: 500 }
      );
    }

    const enrollment = await getEnrollmentDetails(createdEnrollment.id);

    return NextResponse.json({ data: enrollment }, { status: 201 });
  } catch (error) {
    console.error("POST /enrollments error:", error);
    return NextResponse.json(
      { error: "Failed to create enrollment" },
      { status: 500 }
    );
  }
}
