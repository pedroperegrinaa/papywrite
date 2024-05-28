import db from "@/db/drizzle-db";
import { users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

import { NextResponse } from "next/server";

export async function GET() {
	const result = await db.select().from(users).where(eq(users.id, 1));

	return new NextResponse(JSON.stringify(result), { status: 200 });
}

export async function POST(request: Request) {
	const body = await request.json();

	console.log(body);

	const result = await db
		.insert(users)
		.values({
			createdAt: new Date(),
			updatedAt: new Date(),
			name: body.name,
			username: body.username,
			avatar: body.avatar,
			bio: body.bio,
			email: body.email,
		})
		.returning();

	return new NextResponse(JSON.stringify(result), { status: 200 });
}
