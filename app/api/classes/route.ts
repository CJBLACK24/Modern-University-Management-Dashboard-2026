import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { and, desc, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";

import { db } from "@/db";
import { classes, subjects, user } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const subject = searchParams.get("subject");
    const teacher = searchParams.get("teacher");
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";

    const currentPage = Math.max(1, +page);
    const limitPerPage = Math.max(1, +limit);
    const offset = (currentPage - 1) * limitPerPage;

    const filterConditions = [];

    if (search) {
      filterConditions.push(
        or(
          ilike(classes.name, `%${search}%`),
          ilike(classes.inviteCode, `%${search}%`)
        )
      );
    }

    if (subject) {
      filterConditions.push(ilike(subjects.name, `%${subject}%`));
    }

    if (teacher) {
      filterConditions.push(ilike(user.name, `%${teacher}%`));
    }

    const whereClause =
      filterConditions.length > 0 ? and(...filterConditions) : undefined;

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(classes)
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .leftJoin(user, eq(classes.teacherId, user.id))
      .where(whereClause);

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
      .where(whereClause)
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
    console.error("GET /classes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}

const createClassSchema = z.object({
  name: z.string().min(1),
  teacherId: z.string().min(1),
  subjectId: z.number().int().positive(),
  capacity: z.coerce.number().int().positive(),
  description: z.string(),
  status: z.enum(["active", "inactive", "archived"]),
  bannerUrl: z.string().optional(),
  bannerCldPubId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createClassSchema.parse(body);

    const [createdClass] = await db
      .insert(classes)
      .values({
        subjectId: data.subjectId,
        inviteCode: Math.random().toString(36).substring(2, 9),
        name: data.name,
        teacherId: data.teacherId,
        bannerCldPubId: data.bannerCldPubId,
        bannerUrl: data.bannerUrl,
        capacity: data.capacity,
        description: data.description,
        schedules: [],
        status: data.status,
      })
      .returning({ id: classes.id });

    if (!createdClass) throw Error;

    return NextResponse.json({ data: createdClass }, { status: 201 });
  } catch (error) {
    console.error("POST /classes error:", error);
    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 500 }
    );
  }
}
