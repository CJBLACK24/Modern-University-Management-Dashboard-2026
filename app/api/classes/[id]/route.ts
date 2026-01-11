import { NextRequest, NextResponse } from "next/server";
import { eq, sql, getTableColumns } from "drizzle-orm";

import { db } from "@/db";
import { classes, departments, subjects, user } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const classId = Number(id);

    if (!Number.isFinite(classId)) {
      return NextResponse.json({ error: "Invalid class id" }, { status: 400 });
    }

    const [classDetails] = await db
      .select({
        ...getTableColumns(classes),
        subject: {
          ...getTableColumns(subjects),
        },
        department: {
          ...getTableColumns(departments),
        },
        teacher: {
          ...getTableColumns(user),
        },
      })
      .from(classes)
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .leftJoin(user, eq(classes.teacherId, user.id))
      .where(eq(classes.id, classId));

    if (!classDetails) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    return NextResponse.json({ data: classDetails });
  } catch (error) {
    console.error("GET /classes/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch class details" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const classId = Number(id);
    const body = await request.json();

    if (!Number.isFinite(classId)) {
      return NextResponse.json({ error: "Invalid class id" }, { status: 400 });
    }

    const [updatedClass] = await db
      .update(classes)
      .set({
        name: body.name,
        description: body.description,
        capacity: body.capacity,
        status: body.status,
        subjectId: body.subjectId,
        teacherId: body.teacherId,
        bannerUrl: body.bannerUrl,
        bannerCldPubId: body.bannerCldPubId,
        updatedAt: sql`now()`,
      })
      .where(eq(classes.id, classId))
      .returning();

    if (!updatedClass) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    return NextResponse.json({ data: updatedClass });
  } catch (error) {
    console.error("PATCH /classes/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update class" },
      { status: 500 }
    );
  }
}
