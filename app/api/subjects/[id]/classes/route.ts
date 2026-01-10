import { NextRequest, NextResponse } from "next/server";
import { eq, desc, sql, getTableColumns } from "drizzle-orm";

import { db } from "@/db";
import { classes, user } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const subjectId = Number(id);
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";

    if (!Number.isFinite(subjectId)) {
      return NextResponse.json(
        { error: "Invalid subject id" },
        { status: 400 }
      );
    }

    const currentPage = Math.max(1, +page);
    const limitPerPage = Math.max(1, +limit);
    const offset = (currentPage - 1) * limitPerPage;

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(classes)
      .where(eq(classes.subjectId, subjectId));

    const totalCount = countResult[0]?.count ?? 0;

    const classesList = await db
      .select({
        ...getTableColumns(classes),
        teacher: {
          ...getTableColumns(user),
        },
      })
      .from(classes)
      .leftJoin(user, eq(classes.teacherId, user.id))
      .where(eq(classes.subjectId, subjectId))
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
    console.error("GET /subjects/:id/classes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subject classes" },
      { status: 500 }
    );
  }
}
