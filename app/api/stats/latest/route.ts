import { NextRequest, NextResponse } from "next/server";
import { desc, eq, getTableColumns } from "drizzle-orm";

import { db } from "@/db";
import { classes, subjects, user } from "@/db/schema";
import { getOrSetCache } from "@/lib/redis";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit") ?? "5";
    const limitPerPage = Math.max(1, +limit);

    // Cache key includes limit to avoid showing wrong data
    const cacheKey = `stats:latest:${limitPerPage}`;

    const stats = await getOrSetCache(cacheKey, async () => {
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
      return { latestClasses, latestTeachers };
    });

    return NextResponse.json({
      data: stats,
    });
  } catch (error) {
    console.error("GET /stats/latest error:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest stats" },
      { status: 500 }
    );
  }
}
