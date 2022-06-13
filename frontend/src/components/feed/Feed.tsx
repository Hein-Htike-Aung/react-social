import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Post } from '../../models/post.model';
import UserPost from '../post/Post';
import Share from '../share/Share';
import './feed.css';

interface Props {
	userId?: string;
}

const Feed = ({ userId }: Props) => {
	const [posts, setPosts] = useState<Post[]>([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchPosts = async () => {
			const posts = userId
				? await getUserPost(userId)
				: await geTimelinePosts();
			setPosts(posts);
		};

		fetchPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, user._id]);

	const geTimelinePosts = async () => {
		const res = await axios.get(`/post/timeline/all/${user._id}`);
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
