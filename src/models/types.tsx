export interface Article {
	id: number;
	createdAt: string;
	title: string;
	content: string;
	image: string;
	description: string;
}

export interface User {
	id: string;
	createdAt: string;
	updaedAt: string;
	name: string;
	avatar: string;
	username: string;
	bio: string;
	email: string;
}
