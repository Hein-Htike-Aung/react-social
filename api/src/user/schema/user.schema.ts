import { RelationshipStatus } from './../models/user.model';
import { object, string, array, ref, boolean, mixed } from 'yup';

export const registerUserSchema = object({
	body: object({
		username: string().required('Name is required'),
		password: string()
			.required('Password is required')
			.min(6, 'Password is too short - should be 6 chars minimum.')
			.matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
		passwordConfirmation: string().oneOf(
			[ref('password'), null],
			'Passwords must match',
		),
		email: string()
			.email('Must be a valid email')
			.required('Email is required'),
	}),
});

export const loginSchema = object({
	body: object({
		email: string()
			.email('Must be a valid email')
			.required('Email is required'),
		password: string()
			.required('Password is required')
			.min(6, 'Password is too short - should be 6 chars minimum.')
			.matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
	}),
});

const payload = {
	body: object({
		username: string(),
		email: string().email(),
		password: string()
			.min(6, 'Password is too short - should be 6 chars minimum.')
			.matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
		profilePicture: string(),
		coverPicture: string(),
		followers: array(),
		followings: array(),
		isAdmin: boolean(),
		desc: string(),
		city: string(),
		from: string(),
		relationship: mixed().oneOf([
			'Single',
			'Relationship',
			'PreferNotToSay',
		]),
	}),
};

const params = {
	params: object({
		userId: string().required('userId is required'),
	}),
};

export const updateUserSchema = object({
	...params,
	...payload,
});

export const deleteUserSchema = object({
	...params,
	body: object({
		userId: string().required(),
	}),
});

export const follow_and_unfollow_UserSchema = object({
	...params,
	body: object({
		userId: string().required(),
	}),
});
