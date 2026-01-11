import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { user } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = id;

    const [userRecord] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: userRecord });
  } catch (error) {
    console.error("GET /users/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [updatedUser] = await db
      .update(user)
      .set({
        name: body.name,
        role: body.role,
        email: body.email,
        image: body.image,
        imageCldPubId: body.imageCldPubId,
        updatedAt: sql`now()`,
      })
      .where(eq(user.id, id))
      .returning();

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: updatedUser });
  } catch (error) {
    console.error("PATCH /users/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
