import './post.css';
import { MoreVert } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Post } from '../../models/post.model';
import axios from 'axios';
import { User } from '../../models/user.model';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

interface Props {
	post: Post;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const UserPost = ({ post }: Props) => {
	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const fetchUser = async () => {
			setUser(await getUserById(post.userId));
		};

		fetchUser();
	}, [post.userId]);

	const getUserById = async (id: String) => {
		const res = await axios.get(`/user/by-query?userId=${id}`);
		return res.data;
	};

	const PF = process.env.REACT_APP_PUBLIC_FOLDER!;

	const likeHandler = () => {
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	return (
		<div className='post'>
			<div className='postWrapper'>
				<div className='postTop'>
					<div className='postTopLeft'>
						<Link to={`profile/${user?.username}`}>
							<img
								className='postProfileImg'
								src={user?.profilePicture || PF + 'person/noAvatar.png'}
								alt=''
							/>
						</Link>

						<span className='postUsername'>{user?.username}</span>
						<span className='postDate'>{format(post?.createdAt)}</span>
					</div>
					<div className='postTopRight'>
						<MoreVert />
					</div>
				</div>
				<div className='postCenter'>
					<span className='postText'>{post.desc || ''}</span>
					<img className='postImg' src={post.img ? PF + post.img : ''} alt='' />
				</div>
				<div className='postBottom'>
					<div className='postBottomLeft'>
						<img
							className='likeIcon'
							src={`${PF}/like.png`}
							alt=''
							onClick={likeHandler}
						/>
						<img
							className='likeIcon'
							src={`${PF}/heart.png`}
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
