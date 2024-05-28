"use server";

import {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyInlineCode,
	TypographySmall,
} from "@/components/Typography";
import type { Article, User } from "@/models/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { slug: string[] } }) {
	const userData: User | "Not found" = await fetch(
		`${process.env.MOCKAPI_URL_BASE}/users/${params.slug[0]}`,
	).then((res) => res.json());

	console.log("userData", userData);

	if (userData === "Not found") {
		console.log("redirect");
		return redirect("/404");
	}

	const articles: Article[] = await fetch(
		"https://6636628e415f4e1a5e273743.mockapi.io/articles",
	).then((res) => res.json());

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
							src={userData.avatar}
							alt={userData.name}
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
						{articles.map((post) => (
							<Link
								href={`/profile/${params.slug}/${post.id}`}
								key={post.id}
								className="mx-auto flex flex-col hover:bg-slate-800 py-6 px-4 border-t-2"
							>
								<TypographyH3>{post.title}</TypographyH3>

								<TypographySmall className="pt-2 text-slate-400">
									{post.content.trim().substring(0, 100)}...
								</TypographySmall>
							</Link>
						))}
					</>
				) : (
					<>
						{params.slug[1] && (
							<>
								<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
									{articles[Number(params.slug[1]) - 1].title}
								</h1>
								<p className="leading-7 [&:not(:first-child)]:mt-6">
									{articles[Number(params.slug[1]) - 1].content}
								</p>
							</>
						)}
					</>
				)}
			</div>
		</>
	);
}
