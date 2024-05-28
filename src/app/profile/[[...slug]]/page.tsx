"use server";

import {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyInlineCode,
	TypographySmall,
} from "@/components/Typography";
import type { Post, User } from "@/models/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import db from "@/db/drizzle-db";
import { posts, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function page({ params }: { params: { slug: string[] } }) {
	// console.log(params.slug[0])
	const getUserData = await db
		.select()
		.from(users)
		.where(eq(users.username, params.slug[0]));
	const allPosts = await db
		.select()
		.from(posts)
		.where(eq(posts.authorUsername, params.slug[0]));

	console.log(allPosts);
	if (!getUserData) {
		console.log("redirect");
		return redirect("/404");
	}

	const userData: User = getUserData[0];

	// const posts: Post[] = await fetch(
	// 	"https://6636628e415f4e1a5e273743.mockapi.io/articles",
	// ).then((res) => res.json());

	return (
		<>
			{params.slug.length === 1 && (
				<div className="flex w-4/5 md:w-3/5 mx-auto justify-between mb-8 px-4">
					<div>
						<TypographyH1>{userData.name}</TypographyH1>
						<p className="mb-4">
							@{userData.username}
							<TypographyInlineCode className="ml-2 cursor-pointer">
								links
							</TypographyInlineCode>
						</p>
						<TypographySmall className="">{userData.bio}</TypographySmall>
					</div>
					<div>
						<Image
							src={userData.avatar as string}
							alt={userData.name as string}
							width={150}
							height={150}
							className="rounded-full"
						/>
					</div>
				</div>
			)}

			<div className="mx-auto w-4/5 md:w-3/5 mb-28">
				{params.slug.length === 1 ? (
					<>
						<TypographyH2 className="mb-8 px-4">Artigos</TypographyH2>
						{allPosts.map((post: Post) => (
							<Link
								href={`/profile/${params.slug}/${post.slug}`}
								key={post.id}
								className="mx-auto flex flex-col hover:bg-slate-800 py-6 px-4 border-t-2"
							>
								<TypographyH3>{post.title}</TypographyH3>

								<TypographySmall className="pt-2 text-slate-400">
									{post.content?.trim().substring(0, 100)}...
								</TypographySmall>
							</Link>
						))}
					</>
				) : (
					<>
						{params.slug[1] && (
							<>
								<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
									{
										allPosts.find((post: Post) => post.slug === params.slug[1])
											?.title
									}
								</h1>
								<p className="leading-7 [&:not(:first-child)]:mt-6">
									{
										allPosts.find((post: Post) => post.slug === params.slug[1])
											?.content
									}
								</p>
							</>
						)}
					</>
				)}
			</div>
		</>
	);
}
