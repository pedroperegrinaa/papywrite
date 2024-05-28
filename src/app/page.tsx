import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Article, User } from "@/models/types";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { users } from "@/db/schema";

export default async function Home() {
	const connectionString = process.env
		.NEXT_PUBLIC_SUPABASE_DATABASE_URL as string;

	const client = postgres(connectionString);
	const db = drizzle(client);
	const allUsers = await db.select().from(users);

	const getUsers: User[] = await fetch(
		`${process.env.MOCKAPI_URL_BASE}/users`,
	).then((res) => res.json());

	const articles: Article[] = await fetch(
		"https://6636628e415f4e1a5e273743.mockapi.io/articles",
		{
			next: { revalidate: 10 },
		},
	).then((res) => res.json());

	console.log("userData", articles);

	return (
		<>
			<section className="bg-gray-100 dark:bg-gray-900 py-12 md:py-20 px-6 md:px-8">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
						Explore nossos criadores de conteúdo
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mb-8">
						Descubra os conteúdos mais recentes e aprimore o seu conhecimento
					</p>
					<Button>Read More</Button>
				</div>
			</section>
			<section className="bg-white dark:bg-gray-950 py-12 md:py-20 px-6 md:px-8">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
						Featured Authors
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{getUsers.slice(0, 4).map((user) => (
							<Link key={user.id} href={`/profile/${user.id}`}>
								<div
									key={user.id}
									className="flex flex-col items-center cursor-pointer"
								>
									<img
										alt="Author"
										className="rounded-full mb-4"
										height={80}
										src={user.avatar}
										style={{
											aspectRatio: "80/80",
											objectFit: "cover",
										}}
										width={80}
									/>
									<h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
										{user.name}
									</h3>
									<p className="text-gray-600 dark:text-gray-400 text-sm">
										Software Engineer
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
			<section className="bg-gray-100 dark:bg-gray-900 py-12 md:py-20 px-6 md:px-8">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
						Latest Articles
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{articles.slice(0, 3).map((article) => (
							<div
								key={article.id}
								className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden"
							>
								<img
									alt="Article"
									className="w-full h-48 object-cover"
									height={225}
									src={article.image}
									style={{
										objectFit: "cover",
									}}
									width={400}
								/>
								<div className="p-6">
									<h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
										{article.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-400 mb-4">
										{article.description.trim().substring(0, 50)}...
									</p>
									<Button variant="link">Read Article</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<footer className="bg-gray-800 dark:bg-gray-950 text-gray-400 py-8 px-6 md:px-8">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center mb-4 md:mb-0">
						{/* <BookIcon className="h-6 w-6 mr-2" /> */}
						<span className="text-lg font-bold">Papywrite</span>
					</div>
					<nav className="flex space-x-4">Escreva sobre o que quiser</nav>
				</div>
			</footer>
		</>
	);
}
