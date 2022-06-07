import './post.css';
import { MoreVert } from '@mui/icons-material';

const Post = () => {
	return (
		<div className='post'>
			<div className='postWrapper'>
				<div className='postTop'>
					<div className='postTopLeft'>
						<img
							className='postProfileImg'
							src='/assets/person/2.jpeg'
							alt=''
						/>
						<span className='postUsername'>Aung Aung</span>
						<span className='postDate'>5 mins ago</span>
					</div>
					<div className='postTopRight'>
						<MoreVert />
					</div>
				</div>
				<div className='postCenter'>
					<span className='postText'>Its my first post :)</span>
					<img className='postImg' src='/assets/post/1.jpeg' alt='' />
				</div>
				<div className='postBottom'>
					<div className='postBottomLeft'>
						<img className='likeIcon' src='/assets/like.png' alt='' />
						<img className='likeIcon' src='/assets/heart.png' alt='' />
						<span className='postLikeCounter'>32 people like it</span>
					</div>
					<div className='postBottomRight'>
						<span className='postCommentText'>9 Comments</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
