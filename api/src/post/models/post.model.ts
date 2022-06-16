import { UserDocument } from './../../user/models/user.model';
import mongoose from 'mongoose';

export interface PostDocument extends mongoose.Document {
    userId: UserDocument['_id'];
	likes: string[];
    desc: string;
    img: string;
	createAt: Date;
	updatedAt: Date;
}   

export const PostSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		likes: { // userId
			type: Array,
			default: [],
		},
		desc: { type: String, max: 500 },
		img: { type: String },
	},
	{ timestamps: true },
);

const Post = mongoose.model<PostDocument>('Post', PostSchema);

export default Post;
