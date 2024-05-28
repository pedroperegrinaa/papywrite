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
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	name: text("name"),
	username: varchar("username", { length: 256 }).unique().notNull(),
	avatar: varchar("avatar", { length: 256 }),
	bio: text("bio"),
	email: varchar("email", { length: 256 }).unique().notNull(),
});

export const posts = pgTable("posts", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	title: text("title").notNull(),
	content: text("content"),
	image: varchar("image", { length: 256 }),
	description: text("description"),
	slug: varchar("slug", { length: 256 }).notNull().unique(),
	authorUsername: varchar("author_username")
		.references(() => users.username)
		.notNull(),
});
