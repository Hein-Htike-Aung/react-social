export interface Post {
	_id: string;
	userId: string;
	likes: string[];
	desc?: string;
    img?: string;
	createdAt: Date;
	updatedAt: Date;
}
