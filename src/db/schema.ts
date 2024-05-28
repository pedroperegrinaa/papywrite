import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
	name: text("name"),
	username: varchar("username", { length: 256 }),
	avatar: varchar("avatar", { length: 256 }),
	bio: text("bio"),
	email: varchar("email", { length: 256 }),
});

export const posts = pgTable("posts", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
	title: text("title"),
	content: text("content"),
	image: varchar("image", { length: 256 }),
	description: text("description"),
	authorId: integer("author_id").references(() => users.id),
});
