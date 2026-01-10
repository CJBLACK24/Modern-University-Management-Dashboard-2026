import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { classes, enrollments } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { inviteCode } = await request.json();

    if (!inviteCode) {
      return NextResponse.json(
        { error: "Invite code is required" },
        { status: 400 }
      );
    }

    // Find class by invite code
    const [classRecord] = await db
      .select()
      .from(classes)
      .where(eq(classes.inviteCode, inviteCode));

    if (!classRecord) {
      return NextResponse.json(
        { error: "Invalid invite code" },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const [existingEnrollment] = await db
      .select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.classId, classRecord.id),
          eq(enrollments.studentId, session.user.id)
        )
      );

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "Already enrolled in this class" },
        { status: 409 }
      );
    }

    // Create enrollment
    const [createdEnrollment] = await db
      .insert(enrollments)
      .values({
        classId: classRecord.id,
        studentId: session.user.id,
      })
      .returning({ id: enrollments.id });

    return NextResponse.json(
      {
        success: true,
        message: `Successfully enrolled in ${classRecord.name}`,
        data: createdEnrollment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/classes/join error:", error);
    return NextResponse.json(
      { error: "Failed to join class" },
      { status: 500 }
    );
  }
}
