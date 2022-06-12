import {
	createPostHandler,
	deletePostHandler,
	findPostByIdHandler,
	likePostHandler,
	updatePostHandler,
	timelinePostsHandler,
	findPostByUserIdHandler
} from './controllers/post.controller';
import {
	createPostSchema,
	deletePostSchema,
	likePostSchema,
	timelinePostsSchema,
	updatePostSchema,
} from './schema/post.schema';
import { Express } from 'express';
import validateRequest from '../middleware/validateRequest';

const POST_URL = `/api/post`;

export const postRoute = (app: Express) => {
	/* Create a post */
	app.post(`${POST_URL}`, validateRequest(createPostSchema), createPostHandler);

	/* Update post */
	app.patch(
		`${POST_URL}/:postId`,
		validateRequest(updatePostSchema),
		updatePostHandler,
	);

	/* Delete Post */
	app.delete(
		`${POST_URL}/:postId`,
		validateRequest(deletePostSchema),
		deletePostHandler,
	);

	/* get a post */
	app.get(`${POST_URL}/:postId`, findPostByIdHandler);


	/* Find Post By User Id */
	app.get(`${POST_URL}/by-userId/:userId`, findPostByUserIdHandler);

	/* Like / dislike a post */
	app.patch(
		`${POST_URL}/like/:postId`,
		validateRequest(likePostSchema),
		likePostHandler,
	);

	/* Get timeline posts (Current User Posts + current user friends' post) */
	app.get(
		`${POST_URL}/timeline/all/:userId`,
		timelinePostsHandler,
	);


};
