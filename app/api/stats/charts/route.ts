import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { classes, departments, subjects, user } from "@/db/schema";

export async function GET() {
  try {
    const [usersByRole, subjectsByDepartment, classesBySubject] =
      await Promise.all([
        db
          .select({
            role: user.role,
            total: sql<number>`count(*)`,
          })
          .from(user)
          .groupBy(user.role),
        db
          .select({
            departmentId: departments.id,
            departmentName: departments.name,
            totalSubjects: sql<number>`count(${subjects.id})`,
          })
          .from(departments)
          .leftJoin(subjects, eq(subjects.departmentId, departments.id))
          .groupBy(departments.id),
        db
          .select({
            subjectId: subjects.id,
            subjectName: subjects.name,
            totalClasses: sql<number>`count(${classes.id})`,
          })
          .from(subjects)
          .leftJoin(classes, eq(classes.subjectId, subjects.id))
          .groupBy(subjects.id),
      ]);

    return NextResponse.json({
      data: {
        usersByRole,
        subjectsByDepartment,
        classesBySubject,
      },
    });
  } catch (error) {
    console.error("GET /stats/charts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch chart stats" },
      { status: 500 }
    );
  }
}
