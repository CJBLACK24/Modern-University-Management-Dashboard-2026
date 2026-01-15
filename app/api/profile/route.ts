import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { z } from "zod";

const profileSchema = z.object({
  username: z
    .string()
    .min(4)
    .max(20)
    .regex(
      /^[a-z0-9-]+$/,
      "Username must be lowercase, numbers, and hyphens only"
    )
    .optional(),
  bio: z.string().max(500).optional(),
  skills: z.string().optional(),
  name: z.string().min(1).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  birthday: z.string().optional(),
  universityId: z.string().optional(),
  semester: z.string().optional(),
  signatureUrl: z.string().optional(),
  departmentId: z.number().optional(),
  yearLevel: z.number().optional(),
  section: z.string().optional(),
});

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
    with: {
      department: true,
      enrollments: {
        with: {
          class: {
            with: {
              subject: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(profile);
}

export async function PATCH(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = profileSchema.parse(body);

    if (validated.username) {
      const existing = await db.query.user.findFirst({
        where: eq(user.username, validated.username),
      });
      if (existing && existing.id !== session.user.id) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 }
        );
      }
    }

    const updated = await db
      .update(user)
      .set({
        ...validated,
        birthday: validated.birthday ? new Date(validated.birthday) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
