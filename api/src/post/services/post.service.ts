import User, { UserDocument } from './../../user/models/user.model';
import { omit } from 'lodash';
import { DocumentDefinition, QueryOptions, UpdateQuery } from 'mongoose';
import Post, { PostDocument } from '../models/post.model';

export const createPost = async (input: DocumentDefinition<PostDocument>) => {
	return Post.create(input);
};

export const findPostById = async (id: string) => {
	return Post.findById(id);
};

export const findPostByUserId = async (userId: string) => {
	return Post.find({ userId });
};

export const updatePost = async (
	id: string,
	update: UpdateQuery<PostDocument>,
	options: QueryOptions,
) => {
	try {
		return Post.findByIdAndUpdate(id, { $set: update }, options);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const deletePost = async (id: string) => {
	return Post.findByIdAndDelete(id);
};

export const likePost = async (post: PostDocument, user: UserDocument) => {
	await post.updateOne({ $push: { likes: user.id } });
};

export const unLikePost = async (post: PostDocument, user: UserDocument) => {
	await post.updateOne({ $pull: { likes: user.id } });
};

export const currentUserPosts = async (currentUser: UserDocument) => {
	return await Post.find({ userId: currentUser.id });
};
