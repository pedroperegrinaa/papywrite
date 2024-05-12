"use server";

import {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyInlineCode,
	TypographySmall,
} from "@/components/Typography";
import { Separator } from "@/components/ui/separator";
import type { Article, User } from "@/models/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({
	params,
}: { params: { slug: string; id: string } }) {
	const userData: User | "Not found" = await fetch(
		`${process.env.MOCKAPI_URL_BASE}/users/${params.id}`,
	).then((res) => res.json());

	console.log("userData", userData);

	if (userData === "Not found") {
		console.log("redirect");
		return redirect("/404");
	}

	const articles: Article[] = await fetch(
		"https://6636628e415f4e1a5e273743.mockapi.io/articles",
	).then((res) => res.json());

	// const mockPosts = [
	//   {
	//     id: 1,
	//     title: 'Post 1',
	//     content: 'Content 1'
	//   },
	//   {
	//     id: 2,
	//     title: 'Post 2',
	//     content: 'Content 2'
	//   },
	//   {
	//     id: 3,
	//     title: 'Post 3',
	//     content: 'Content 3'
	//   }
	// ]

	return (
		<>
			<div className="flex w-2/4 mx-auto justify-between mb-8 px-4">
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
						src={userData.avatar}
						alt={userData.name}
						width={150}
						height={150}
						className="rounded-full"
					/>
				</div>
			</div>

			<div className="mx-auto w-2/4 mb-28">
				<TypographyH2 className="mb-8 px-4">Articles</TypographyH2>
				{articles.map((post) => (
					<Link
						href={`/article/${post.id}`}
						key={post.id}
						className="mx-auto flex flex-col hover:bg-slate-800 py-6 px-4 border-t-2"
					>
						<TypographyH3>{post.title}</TypographyH3>

						<TypographySmall className="pt-2 text-slate-400">
							{post.content.trim().substring(0, 100)}...
						</TypographySmall>
					</Link>
				))}
			</div>
		</>
	);
}
