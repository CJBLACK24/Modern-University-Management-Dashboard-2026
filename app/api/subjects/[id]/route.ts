import { NextRequest, NextResponse } from "next/server";
import { eq, sql, getTableColumns } from "drizzle-orm";

import { db } from "@/db";
import { classes, departments, subjects } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const subjectId = Number(id);

    if (!Number.isFinite(subjectId)) {
      return NextResponse.json(
        { error: "Invalid subject id" },
        { status: 400 }
      );
    }

    const [subject] = await db
      .select({
        ...getTableColumns(subjects),
        department: {
          ...getTableColumns(departments),
        },
      })
      .from(subjects)
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .where(eq(subjects.id, subjectId));

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    const classesCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(classes)
      .where(eq(classes.subjectId, subjectId));

    return NextResponse.json({
      data: {
        subject,
        totals: {
          classes: classesCount[0]?.count ?? 0,
        },
      },
    });
  } catch (error) {
    console.error("GET /subjects/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subject details" },
      { status: 500 }
    );
  }
}
