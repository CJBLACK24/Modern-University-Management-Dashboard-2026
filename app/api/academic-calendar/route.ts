import { db } from "@/db";
import { academicCalendar } from "@/db/schema/app";
import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const calendarSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
  year: z.number().int().default(2026),
});

export async function GET() {
  try {
    const calendars = await db
      .select()
      .from(academicCalendar)
      .orderBy(desc(academicCalendar.createdAt));

    console.log(
      `GET /api/academic-calendar: found ${calendars.length} records`
    );

    return NextResponse.json({
      data: calendars,
      pagination: {
        page: 1,
        limit: calendars.length,
        total: calendars.length,
        totalPages: 1,
      },
    });
  } catch (error) {
    console.error("GET /api/academic-calendar error:", error);
    return NextResponse.json(
      { error: "Failed to fetch academic calendar" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("POST /api/academic-calendar body:", body);
    const data = calendarSchema.parse(body);

    const [newCalendar] = await db
      .insert(academicCalendar)
      .values({
        url: data.url,
        publicId: data.publicId,
        year: data.year,
      })
      .returning();

    console.log("POST /api/academic-calendar success:", newCalendar.id);
    return NextResponse.json({ data: newCalendar });
  } catch (error) {
    console.error("POST /api/academic-calendar error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update academic calendar" },
      { status: 500 }
    );
  }
}
