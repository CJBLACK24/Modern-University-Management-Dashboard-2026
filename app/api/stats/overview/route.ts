import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { classes, departments, subjects, user } from "@/db/schema";

export async function GET() {
  try {
    const [
      usersCount,
      teachersCount,
      adminsCount,
      subjectsCount,
      departmentsCount,
      classesCount,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(user),
      db
        .select({ count: sql<number>`count(*)` })
        .from(user)
        .where(eq(user.role, "teacher")),
      db
        .select({ count: sql<number>`count(*)` })
        .from(user)
        .where(eq(user.role, "admin")),
      db.select({ count: sql<number>`count(*)` }).from(subjects),
      db.select({ count: sql<number>`count(*)` }).from(departments),
      db.select({ count: sql<number>`count(*)` }).from(classes),
    ]);

    return NextResponse.json({
      data: {
        users: usersCount[0]?.count ?? 0,
        teachers: teachersCount[0]?.count ?? 0,
        admins: adminsCount[0]?.count ?? 0,
        subjects: subjectsCount[0]?.count ?? 0,
        departments: departmentsCount[0]?.count ?? 0,
        classes: classesCount[0]?.count ?? 0,
      },
    });
  } catch (error) {
    console.error("GET /stats/overview error:", error);
    return NextResponse.json(
      { error: "Failed to fetch overview stats" },
      { status: 500 }
    );
  }
}
