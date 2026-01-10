import { NextRequest, NextResponse } from "next/server";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

import { db } from "@/db";
import { classes, departments, enrollments, subjects, user } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = id;
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";

    const [userRecord] = await db
      .select({ id: user.id, role: user.role })
      .from(user)
      .where(eq(user.id, userId));

    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (userRecord.role !== "teacher" && userRecord.role !== "student") {
      return NextResponse.json({
        data: [],
        pagination: {
          page: 1,
          limit: 0,
          total: 0,
          totalPages: 0,
        },
      });
    }

    const currentPage = Math.max(1, +page);
    const limitPerPage = Math.max(1, +limit);
    const offset = (currentPage - 1) * limitPerPage;

    const countResult =
      userRecord.role === "teacher"
        ? await db
            .select({ count: sql<number>`count(distinct ${subjects.id})` })
            .from(subjects)
            .leftJoin(classes, eq(classes.subjectId, subjects.id))
            .where(eq(classes.teacherId, userId))
        : await db
            .select({ count: sql<number>`count(distinct ${subjects.id})` })
            .from(subjects)
            .leftJoin(classes, eq(classes.subjectId, subjects.id))
            .leftJoin(enrollments, eq(enrollments.classId, classes.id))
            .where(eq(enrollments.studentId, userId));

    const totalCount = countResult[0]?.count ?? 0;

    const subjectsList =
      userRecord.role === "teacher"
        ? await db
            .select({
              ...getTableColumns(subjects),
              department: {
                ...getTableColumns(departments),
              },
            })
            .from(subjects)
            .leftJoin(departments, eq(subjects.departmentId, departments.id))
            .leftJoin(classes, eq(classes.subjectId, subjects.id))
            .where(eq(classes.teacherId, userId))
            .groupBy(
              subjects.id,
              subjects.departmentId,
              subjects.name,
              subjects.code,
              subjects.description,
              subjects.createdAt,
              subjects.updatedAt,
              departments.id,
              departments.code,
              departments.name,
              departments.description,
              departments.createdAt,
              departments.updatedAt
            )
            .orderBy(desc(subjects.createdAt))
            .limit(limitPerPage)
            .offset(offset)
        : await db
            .select({
              ...getTableColumns(subjects),
              department: {
                ...getTableColumns(departments),
              },
            })
            .from(subjects)
            .leftJoin(departments, eq(subjects.departmentId, departments.id))
            .leftJoin(classes, eq(classes.subjectId, subjects.id))
            .leftJoin(enrollments, eq(enrollments.classId, classes.id))
            .where(eq(enrollments.studentId, userId))
            .groupBy(
              subjects.id,
              subjects.departmentId,
              subjects.name,
              subjects.code,
              subjects.description,
              subjects.createdAt,
              subjects.updatedAt,
              departments.id,
              departments.code,
              departments.name,
              departments.description,
              departments.createdAt,
              departments.updatedAt
            )
            .orderBy(desc(subjects.createdAt))
            .limit(limitPerPage)
            .offset(offset);

    return NextResponse.json({
      data: subjectsList,
      pagination: {
        page: currentPage,
        limit: limitPerPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitPerPage),
      },
    });
  } catch (error) {
    console.error("GET /users/:id/subjects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user subjects" },
      { status: 500 }
    );
  }
}
