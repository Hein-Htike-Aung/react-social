import { Request, Response } from 'express';
import { get, omit } from 'lodash';
import log from '../../log';
import {
	deleteUser,
	findUserbyId,
	findUserByUsername,
	followUser,
	registerUser,
	unfollowUser,
} from '../services/user.service';
import { updateUser, validateUser } from './../services/user.service';
import bcrypt from 'bcrypt';
import config from 'config';

export const registerUserHandler = async (req: Request, res: Response) => {
	try {
		const user = await registerUser(req.body);

		return res.send(omit(user.toJSON(), 'password'));
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ message: e.message });
	}
};

export const loginHandler = async (req: Request, res: Response) => {
	const user = await validateUser(req.body);

	if (!user) return res.status(401).send('Invalid username or password');

	return res.status(200).send(user);
};

export const updateUserHandler = async (req: Request, res: Response) => {
	const userId = get(req, 'params.userId');
	const userIdFromBody = get(req, 'body.userId'); // Replace after interating jwt token
	const isAdmin = get(req, 'isAdmin');
	const update = req.body;

	const user = await findUserbyId(userId);

	if (!user) return res.status(404).send();

	if (update.password) {
		const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

		const hash = await bcrypt.hashSync(update.password, salt);

		update.password = hash;
	}

	if (userId === userIdFromBody || isAdmin) {
		await updateUser(userId, update, { new: true });

		return res.status(200).json('Account has been updated');
	} else {
		return res.status(403).json('You can only update your account');
	}
};

export const deleteUserHandler = async (req: Request, res: Response) => {
	const userId = get(req, 'params.userId');
	const userIdFromBody = get(req, 'body.userId'); // Replace after interating jwt token
	const isAdmin = get(req, 'isAdmin');

	const user = await findUserbyId(userId);

	if (!user) return res.status(404).send();

	if (userId === userIdFromBody || isAdmin) {
		await deleteUser(userId);

		return res.status(200).json('Account has been deleted');
	} else {
		return res.status(403).json('You can only delete your account');
	}
};

export const getUserHandler = async (req: Request, res: Response) => {
	const userId = get(req, 'query.userId');
	const username = get(req, 'query.username');

	const user = userId
		? await findUserbyId(userId)
		: await findUserByUsername(username);

	if (!user || user == null) return res.status(404).send();

	return res.send(omit(user, 'password', 'isAdmin', 'updatedAt'));
};

export const followUserHandler = async (req: Request, res: Response) => {
	const targetUserId = get(req, 'params.userId');
	const currentUserId = get(req, 'body.userId');

	if (targetUserId !== currentUserId) {
		const targetUser = await findUserbyId(targetUserId);
		const currentUser = await findUserbyId(currentUserId);

		if (!targetUser || !currentUser) return res.status(404).send();

		if (!targetUser?.followers.includes(currentUserId)) {
			await followUser(targetUser, currentUser);

			return res.send(`User has been followed`);
		} else {
			return res.send(`Already follow this user;`);
		}
	} else {
		return res.send(`You can't follow yourself`);
	}
};

export const unfollowUserHandler = async (req: Request, res: Response) => {
	const targetUserId = get(req, 'params.userId');
	const currentUserId = get(req, 'body.userId');

	if (targetUserId !== currentUserId) {
		const targetUser = await findUserbyId(targetUserId);
		const currentUser = await findUserbyId(currentUserId);

		if (!targetUser || !currentUser) return res.status(404).send();

		if (targetUser?.followers.includes(currentUserId)) {
			await unfollowUser(targetUser, currentUser);

			return res.send(`User has been unfollowed`);
		} else {
			return res.send(`You havn't follow this user;`);
		}
	} else {
		return res.send(`You can't unfollow yourself`);
	}
};
