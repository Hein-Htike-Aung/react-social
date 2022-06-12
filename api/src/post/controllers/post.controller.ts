import {
	currentUserPosts,
	deletePost,
	findPostById,
	findPostByUserId,
	likePost,
	unLikePost,
	updatePost,
} from './../services/post.service';
import { Request, Response } from 'express';
import { get, omit } from 'lodash';
import config from 'config';
import log from '../../log';
import { createPost } from '../services/post.service';
import { send } from 'process';
import { findUserbyId } from '../../user/services/user.service';

export const createPostHandler = async (req: Request, res: Response) => {
	try {
		const post = await createPost(req.body);

		return res.send(post);
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ message: e.message });
	}
};

export const updatePostHandler = async (req: Request, res: Response) => {
	const postId = get(req, 'params.postId');
	const update = req.body;

	const post = await findPostById(postId);

	if (!post) return res.status(404).send();

	if (post.userId._id.toString() === update.userId) {
		await updatePost(postId, update, { new: true });

		return res.status(200).json('Successfully updated');
	} else {
		return res.status(403).json(`Your can only update your own post`);
	}
};

export const deletePostHandler = async (req: Request, res: Response) => {
	const postId = get(req, 'params.postId');

	const post = await findPostById(postId);

	if (!post) return res.status(404).send();

	await deletePost(postId);

	return res.status(200).json('Successfully deleted');
};

export const findPostByIdHandler = async (req: Request, res: Response) => {
	const postId = get(req, 'params.postId');

	const post = await findPostById(postId);

	if (!post) return res.status(404).send();

	return res.status(200).json(post);
};

export const findPostByUserIdHandler = async (
	req: Request,
	res: Response,
) => {
	const userId = get(req, 'params.userId');

	const user = await findUserbyId(userId);

	if (!user) return res.status(404).send();

	const post = await findPostByUserId(user.id);

	return res.status(200).json(post);
};

export const likePostHandler = async (req: Request, res: Response) => {
	const postId = get(req, 'params.postId');
	const { userId } = req.body;

	const post = await findPostById(postId);
	const user = await findUserbyId(userId);

	if (!post || !user) return res.status(404).send();

	if (post.likes.includes(userId)) {
		await unLikePost(post, user);

		return res.status(200).json('Unliked Post');
	} else {
		await likePost(post, user);
		return res.status(200).json('Liked Post');
	}
};

export const timelinePostsHandler = async (req: Request, res: Response) => {
	const currentUserId = get(req, 'params.userId');

	const currentUser = await findUserbyId(currentUserId);

	if (!currentUser) return res.status(404).send();

	const userPosts = await currentUserPosts(currentUser);

	const currentUserFriendPost = await Promise.all(
		currentUser.followings.map((friendId) => {
			return findPostByUserId(friendId);
		}),
	);

	return res.status(200).json(userPosts.concat(...currentUserFriendPost));
};
