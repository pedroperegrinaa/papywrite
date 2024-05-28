export interface Post {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	description: string | null;
	title: string;
	content: string | null;
	image: string | null;
	authorUsername: string;
	slug: string;
}

export interface User {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string | null;
	avatar: string | null;
	username: string;
	bio: string | null;
	email: string;
}
