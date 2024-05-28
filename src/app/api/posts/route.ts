import db from "@/db/drizzle-db";
import { posts } from "@/db/schema";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import slug from "slug";

import { NextResponse } from "next/server";

export async function GET() {
	const result = await db.select().from(posts);

	return new NextResponse(JSON.stringify(result), { status: 200 });
}

export async function POST(request: Request) {
	const body = await request.json();

	console.log(body);

	const result = await db
		.insert(posts)
		.values({
			createdAt: new Date(),
			updatedAt: new Date(),
			title: body.title,
			content: body.content,
			image: body.image,
			description: body.description,
			slug: slug(body.title),
			authorUsername: body.authorUsername,
		})
		.returning();

	return new NextResponse(JSON.stringify(result), { status: 200 });
}
