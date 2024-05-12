import type { Article } from "@/models/types";

export default async function page({ params }: { params: { id: string } }) {
	const article: Article = await fetch(
		`https://6636628e415f4e1a5e273743.mockapi.io/articles${params.id}`,
	).then((res) => res.json());

	return (
		<>
			<h1>{article.title}</h1>
			<p>{article.content}</p>
		</>
	);
}
