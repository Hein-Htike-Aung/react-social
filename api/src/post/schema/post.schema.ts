import { object, string, array, ref, boolean, mixed, number } from 'yup';

const payload = {
	body: object({
		userId: string().required('User Id is required'),
		likes: array(),
		desc: string(),
		img: string(),
	}),
};

const userIdPayload = {
	body: object({
		userId: string().required('User Id is required'),
	}),
};

const params = {
	params: object({
		postId: string().required('PostId is required'),
	}),
};

export const createPostSchema = object({ ...payload });

export const updatePostSchema = object({ ...params, ...payload });

export const deletePostSchema = object({ ...params });

export const likePostSchema = object({ ...params, ...userIdPayload });

export const timelinePostsSchema = object({ ...userIdPayload });
