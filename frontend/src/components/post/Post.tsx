import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../api/apiurl';
import { AuthContext } from '../../context/AuthContext';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import TimeAgo from 'react-timeago';
import './post.css';

interface Props {
	post: Post;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const UserPost = ({ post }: Props) => {
	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [postUser, setPostUser] = useState<User>();
	const PF = process.env.REACT_APP_PUBLIC_FOLDER!;

	const { user: currentUser } = useContext(AuthContext);

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id) ? true : false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser._id]);

	useEffect(() => {
		const fetchUser = async () => {
			setPostUser(await getUserById(post.userId));
		};

		fetchUser();
	}, [post.userId]);

	const getUserById = async (id: String) => {
		const res = await axios.get(`${API_URL}/user/by-query?userId=${id}`);
		return res.data;
	};

	const likeHandler = async () => {
		try {
			await axios.patch(`${API_URL}/post/like/${post._id}`, {
				userId: currentUser._id,
			});
		} catch (error) {}

		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	return (
		<div className='post'>
			<div className='postWrapper'>
				<div className='postTop'>
					<div className='postTopLeft'>
						<Link to={`profile/${postUser?.username}`}>
							<img
								crossOrigin='anonymous'
								className='postProfileImg'
								src={
									postUser?.profilePicture
										? PF + postUser.profilePicture
										: PF + 'person/noAvatar.png'
								}
								alt=''
							/>
						</Link>

						<span className='postUsername'>{postUser?.username}</span>
						<span className='postDate'>
							<TimeAgo date={post?.createdAt} />
						</span>
					</div>
					<div className='postTopRight'>
						<MoreVert />
					</div>
				</div>
				<div className='postCenter'>
					<span className='postText'>{post.desc || ''}</span>
					<img
						crossOrigin='anonymous'
						className='postImg'
						src={post.img ? PF + post.img : ''}
						alt=''
					/>
				</div>
				<div className='postBottom'>
					<div className='postBottomLeft'>
						<img
							crossOrigin='anonymous'
							className='likeIcon'
							src={`${PF}like.png`}
							alt=''
							onClick={likeHandler}
						/>
						<img
							crossOrigin='anonymous'
							className='likeIcon'
							src={`${PF}heart.png`}
							alt=''
							onClick={likeHandler}
						/>
						<span className='postLikeCounter'>{like} people like it</span>
					</div>
					<div className='postBottomRight'>
						<span className='postCommentText'>comments</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserPost;
