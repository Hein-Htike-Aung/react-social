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
	const { user: currentUser } = useContext(AuthContext);

	useEffect(() => {
		const fetchPosts = async () => {
			const posts: Post[] = userId
				? await getUserPost(userId)
				: await geTimelinePosts();
			setPosts(
				posts.sort(
					(p1, p2) =>
						new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime(),
				),
			);
		};

		fetchPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, currentUser._id]);

	const geTimelinePosts = async () => {
		const res = await axios.get(`/post/timeline/all/${currentUser._id}`);
		return res.data;
	};

	const getUserPost = async (id: string) => {
		const res = await axios.get(`/post/by-userId/${id}`);

		return res.data;
	};

	return (
		<div className='feed'>
			<div className='feedWrapper'>
				{(!userId || currentUser._id === userId) && <Share />}
				{posts.map((p) => (
					<UserPost key={p._id} post={p} />
				))}
			</div>
		</div>
	);
};

export default Feed;
