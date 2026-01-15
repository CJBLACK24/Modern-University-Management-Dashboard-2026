import { db } from "@/db";
import { attendance } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const attendanceSchema = z.object({
  studentId: z.string(),
  status: z.enum(["present", "absent", "late", "excused"]),
  date: z.string().optional(),
  remarks: z.string().optional(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only allow teachers or admins to record attendance
    if (session.user.role !== "teacher" && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const validated = attendanceSchema.parse(body);
    const classId = parseInt(id);

    const record = await db
      .insert(attendance)
      .values({
        classId,
        studentId: validated.studentId,
        status: validated.status,
        date: validated.date ? new Date(validated.date) : new Date(),
        remarks: validated.remarks || null,
      })
      .returning();

    return NextResponse.json(record[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error recording attendance:", error);
    return NextResponse.json(
      { error: "Failed to record attendance" },
      { status: 500 }
    );
  }
}
