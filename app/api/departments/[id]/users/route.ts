import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { classes, enrollments, subjects, user } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const departmentId = Number(id);
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role");
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";

    if (!Number.isFinite(departmentId)) {
      return NextResponse.json(
        { error: "Invalid department id" },
        { status: 400 }
      );
    }

    if (role !== "teacher" && role !== "student") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const currentPage = Math.max(1, +page);
    const limitPerPage = Math.max(1, +limit);
    const offset = (currentPage - 1) * limitPerPage;

    const baseSelect = {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      role: user.role,
      imageCldPubId: user.imageCldPubId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const groupByFields = [
      user.id,
      user.name,
      user.email,
      user.emailVerified,
      user.image,
      user.role,
      user.imageCldPubId,
      user.createdAt,
      user.updatedAt,
    ];

    const countResult =
      role === "teacher"
        ? await db
            .select({ count: sql<number>`count(distinct ${user.id})` })
            .from(user)
            .leftJoin(classes, eq(user.id, classes.teacherId))
            .leftJoin(subjects, eq(classes.subjectId, subjects.id))
            .where(
              and(eq(user.role, role), eq(subjects.departmentId, departmentId))
            )
        : await db
            .select({ count: sql<number>`count(distinct ${user.id})` })
            .from(user)
            .leftJoin(enrollments, eq(user.id, enrollments.studentId))
            .leftJoin(classes, eq(enrollments.classId, classes.id))
            .leftJoin(subjects, eq(classes.subjectId, subjects.id))
            .where(
              and(eq(user.role, role), eq(subjects.departmentId, departmentId))
            );

    const totalCount = countResult[0]?.count ?? 0;

    const usersList =
      role === "teacher"
        ? await db
            .select(baseSelect)
            .from(user)
            .leftJoin(classes, eq(user.id, classes.teacherId))
            .leftJoin(subjects, eq(classes.subjectId, subjects.id))
            .where(
              and(eq(user.role, role), eq(subjects.departmentId, departmentId))
            )
            .groupBy(...groupByFields)
            .orderBy(desc(user.createdAt))
            .limit(limitPerPage)
            .offset(offset)
        : await db
            .select(baseSelect)
            .from(user)
            .leftJoin(enrollments, eq(user.id, enrollments.studentId))
            .leftJoin(classes, eq(enrollments.classId, classes.id))
            .leftJoin(subjects, eq(classes.subjectId, subjects.id))
            .where(
              and(eq(user.role, role), eq(subjects.departmentId, departmentId))
            )
            .groupBy(...groupByFields)
            .orderBy(desc(user.createdAt))
            .limit(limitPerPage)
            .offset(offset);

    return NextResponse.json({
      data: usersList,
      pagination: {
        page: currentPage,
        limit: limitPerPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitPerPage),
      },
    });
  } catch (error) {
    console.error("GET /departments/:id/users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch department users" },
      { status: 500 }
    );
  }
}
