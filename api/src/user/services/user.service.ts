import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';
import User, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';

export const registerUser = async (input: DocumentDefinition<UserDocument>) => {
	try {
		return await User.create(input);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const validateUser = async ({
	email,
	password,
}: {
	email: UserDocument['email'];
	password: string;
}) => {
	const user = await User.findOne({ email });

	if (!user) return false;

	const isValid = await user.comparePassword(password);

	if (!isValid) return false;

	return omit(user.toJSON(), 'password');
};

export const findUserbyId = async (id: string) => {
	return await User.findById(id);
};

export const findUserByUsername = async (username: string) => {
	return await User.findOne({ username });
};

export const updateUser = async (
	id: string,
	update: UpdateQuery<UserDocument>,
	options: QueryOptions,
) => {
	try {
		return User.findByIdAndUpdate(id, { $set: update }, options);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const deleteUser = async (id: string) => {
	return User.findByIdAndDelete(id);
};

export const followUser = async (
	targetUser: UserDocument,
	currentUser: UserDocument,
) => {
	await targetUser.updateOne({ $push: { followers: currentUser._id } });
	await currentUser.updateOne({ $push: { followings: targetUser._id } });
};

export const unfollowUser = async (
	targetUser: UserDocument,
	currentUser: UserDocument,
) => {
	await targetUser.updateOne({ $pull: { followers: currentUser._id } });
	await currentUser.updateOne({ $pull: { followings: targetUser._id } });
};
