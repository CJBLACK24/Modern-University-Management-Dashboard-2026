import { NextRequest, NextResponse } from "next/server";
import { eq, ilike, or, and, desc, sql, getTableColumns } from "drizzle-orm";
import { unstable_cache } from "next/cache";

import { db } from "@/db";
import { departments, subjects } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const department = searchParams.get("department");
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";

    const currentPage = Math.max(1, +page);
    const limitPerPage = Math.max(1, +limit);
    const offset = (currentPage - 1) * limitPerPage;

    const filterConditions = [];

    if (search) {
      filterConditions.push(
        or(
          ilike(subjects.name, `%${search}%`),
          ilike(subjects.code, `%${search}%`)
        )
      );
    }

    if (department) {
      filterConditions.push(ilike(departments.name, `%${department}%`));
    }

    const whereClause =
      filterConditions.length > 0 ? and(...filterConditions) : undefined;

    // Cache the subjects fetch based on query params
    const getCachedSubjects = unstable_cache(
      async (offset: number, limit: number, where: any) => {
        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(subjects)
          .leftJoin(departments, eq(subjects.departmentId, departments.id))
          .where(where);

        const totalCount = countResult[0]?.count ?? 0;

        const subjectsList = await db
          .select({
            ...getTableColumns(subjects),
            department: {
              ...getTableColumns(departments),
            },
          })
          .from(subjects)
          .leftJoin(departments, eq(subjects.departmentId, departments.id))
          .where(where)
          .orderBy(desc(subjects.createdAt))
          .limit(limit)
          .offset(offset);

        return { subjectsList, totalCount };
      },
      [`subjects-${page}-${limit}-${search}-${department}`],
      { tags: ["subjects"], revalidate: 3600 }
    );

    const { subjectsList, totalCount } = await getCachedSubjects(
      offset,
      limitPerPage,
      whereClause
    );

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
    console.error("GET /subjects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { departmentId, name, code, description } = await request.json();

    const [createdSubject] = await db
      .insert(subjects)
      .values({ departmentId, name, code, description })
      .returning({ id: subjects.id });

    if (!createdSubject) throw Error;

    // Invalidate subjects cache
    const { revalidateTag } = await import("next/cache");
    revalidateTag("subjects");

    return NextResponse.json({ data: createdSubject }, { status: 201 });
  } catch (error) {
    console.error("POST /subjects error:", error);
    return NextResponse.json(
      { error: "Failed to create subject" },
      { status: 500 }
    );
  }
}
