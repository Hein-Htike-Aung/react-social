import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post } from '../../models/post.model';
import UserPost from '../post/Post';
import Share from '../share/Share';
import './feed.css';

interface Props {
	userId?: string;
}

const Feed = ({ userId }: Props) => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const posts = userId
				? await getUserPost(userId)
				: await geTimelinePosts();
			setPosts(posts);
		};

		fetchPosts();
	}, [userId]);
	// Rendering at onece by putting empty array
	// But Feed is being used in two place

	const geTimelinePosts = async () => {
		const res = await axios.get(`/post/timeline/all/62a449522071a304f6f5e395`);
		return res.data;
	};

	const getUserPost = async (id: string) => {
		const res = await axios.get(`/post/by-userId/${id}`);

		return res.data;
	};

	return (
		<div className='feed'>
			<div className='feedWrapper'>
				<Share />

				{posts.map((p) => (
					<UserPost key={p._id} post={p} />
				))}
			</div>
		</div>
	);
};

export default Feed;
