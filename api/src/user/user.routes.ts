import { Express } from 'express';
import validateRequest from '../middleware/validateRequest';
import {
	deleteUserHandler,
	followUserHandler,
	getUserFriendsHandler,
	getUserHandler,
	loginHandler,
	registerUserHandler,
	unfollowUserHandler,
	updateUserHandler,
} from './controllers/user.controller';
import {
	deleteUserSchema,
	follow_and_unfollow_UserSchema,
	loginSchema,
	registerUserSchema,
	updateUserSchema,
} from './schema/user.schema';

const AUTH_URL = `/api/auth`;
const USER_URL = `/api/user`;

export const authRoute = (app: Express) => {
	/* Register User */
	app.post(
		`${AUTH_URL}/register`,
		validateRequest(registerUserSchema),
		registerUserHandler,
	);

	/* Login User */
	app.post(`${AUTH_URL}/login`, validateRequest(loginSchema), loginHandler);
};

export const userRoute = (app: Express) => {
	/* Updae User */
	app.patch(
		`${USER_URL}/:userId`,
		validateRequest(updateUserSchema),
		updateUserHandler,
	);

	/* Delete User */
	app.delete(
		`${USER_URL}/:userId`,
		validateRequest(deleteUserSchema),
		deleteUserHandler,
	);

	/* Find User by query */
	app.get(`${USER_URL}/by-query`, getUserHandler);

	/* Follow a user */
	app.patch(
		`${USER_URL}/follow/:userId`,
		validateRequest(follow_and_unfollow_UserSchema),
		followUserHandler,
	);

	/* Unfollow a user */
	app.patch(
		`${USER_URL}/unfollow/:userId`,
		validateRequest(follow_and_unfollow_UserSchema),
		unfollowUserHandler,
	);

	/* Get User's Friends */
	app.get(
		`${USER_URL}/friends/:userId`, getUserFriendsHandler
	)
};
