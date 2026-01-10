import { NextRequest, NextResponse } from "next/server";
import { desc, eq, getTableColumns } from "drizzle-orm";

import { db } from "@/db";
import { classes, subjects, user } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit") ?? "5";
    const limitPerPage = Math.max(1, +limit);

    const [latestClasses, latestTeachers] = await Promise.all([
      db
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
        .orderBy(desc(classes.createdAt))
        .limit(limitPerPage),
      db
        .select()
        .from(user)
        .where(eq(user.role, "teacher"))
        .orderBy(desc(user.createdAt))
        .limit(limitPerPage),
    ]);

    return NextResponse.json({
      data: {
        latestClasses,
        latestTeachers,
      },
    });
  } catch (error) {
    console.error("GET /stats/latest error:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest stats" },
      { status: 500 }
    );
  }
}
