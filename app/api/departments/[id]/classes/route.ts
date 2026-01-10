import { NextRequest, NextResponse } from "next/server";
import { eq, desc, sql, getTableColumns } from "drizzle-orm";

import { db } from "@/db";
import { classes, subjects, user } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const departmentId = Number(id);
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";

    if (!Number.isFinite(departmentId)) {
      return NextResponse.json(
        { error: "Invalid department id" },
        { status: 400 }
      );
    }

    const currentPage = Math.max(1, +page);
    const limitPerPage = Math.max(1, +limit);
    const offset = (currentPage - 1) * limitPerPage;

    const countResult = await db
      .select({ count: sql<number>`count(${classes.id})` })
      .from(classes)
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .where(eq(subjects.departmentId, departmentId));

    const totalCount = countResult[0]?.count ?? 0;

    const classesList = await db
      .select({
        ...getTableColumns(classes),
        subject: {
          ...getTableColumns(subjects),
        },
        teacher: {
          ...getTableColumns(user),
        },
      })
      .from(classes)
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .leftJoin(user, eq(classes.teacherId, user.id))
      .where(eq(subjects.departmentId, departmentId))
      .orderBy(desc(classes.createdAt))
      .limit(limitPerPage)
      .offset(offset);

    return NextResponse.json({
      data: classesList,
      pagination: {
        page: currentPage,
        limit: limitPerPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitPerPage),
      },
    });
  } catch (error) {
    console.error("GET /departments/:id/classes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch department classes" },
      { status: 500 }
    );
  }
}
