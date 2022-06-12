import bcrypt from 'bcrypt';
import config from 'config';
import mongoose from 'mongoose';
import log from '../../log';

export enum RelationshipStatus {
	'Single' = 'Single',
	'Relationship' = 'Relationship',
	'PreferNotToSay' = 'PreferNotToSay',
}

/* Use For Ts Type (not necessary in js)  */
export interface UserDocument extends mongoose.Document {
	username: string;
	email: string;
	password: string;
	profilePicture: string;
	coverPicture: string;
	followers: string[];
	followings: string[];
	isAdmin: boolean;
	desc: string;
	city: string;
	from: string;
	relationship: RelationshipStatus;
	comparePassword: (candidatePassword: string) => Promise<boolean>;
}

/* Mongoose Schema */
const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
		},
		profilePicture: {
			type: String,
			default: '',
		},
		coverPicture: {
			type: String,
			default: '',
		},
		followers: {
			type: Array,
			default: [],
		},
		followings: {
			type: Array,
			default: [],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		desc: {
			type: String,
			max: 50,
		},
		city: {
			type: String,
			max: 50,
		},
		from: {
			type: String,
			max: 50,
		},
		relationship: {
			type: String,
			enum: RelationshipStatus,
		},
	},
	{ timestamps: true },
);

/* Schema Pre (must not be arrwow function) */
UserSchema.pre(
	'save',
	async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
		let user = this as UserDocument;

		// only hash the password if it has been modified (or is new)
		if (!user.isModified('password')) return next();

		// Random additional data
		const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

		const hash = await bcrypt.hashSync(user.password, salt);

		// Replace the password with hash
		user.password = hash;

		return next();
	},
);

/* Schema methods (must not be arrwow function) */
UserSchema.methods.comparePassword = async function (
	candidatePassword: string,
) {
	const user = this as UserDocument;

	return bcrypt.compare(candidatePassword, user.password).catch((_) => false);
};

const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;
