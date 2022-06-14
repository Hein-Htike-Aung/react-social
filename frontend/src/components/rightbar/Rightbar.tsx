import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../api/apiurl';
import { AuthContext } from '../../context/AuthContext';
import { Users } from '../../dummyData';
import { RelationshipStatus, User } from '../../models/user.model';
import Online from '../online/Online';
import './rightbar.css';
import { Add, Remove } from '@material-ui/icons';

interface Props {
	home?: string;
	user?: User;
}

const Rightbar = ({ user, home }: Props) => {
	const { user: currentUser, dispatch } = useContext(AuthContext);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [friends, setFriends] = useState<User[]>();
	const [followed, setFollowed] = useState(
		currentUser.followings.includes(user?._id),
	);

	useEffect(() => {
		setFollowed(currentUser.followings.includes(user?._id));
	}, [user?._id, currentUser]);

	useEffect(() => {
		const fetchUserFriends = async () => {
			setFriends(await getFriends());
		};

		if (user) {
			fetchUserFriends();
		}
	}, [user]);

	const getFriends = async () => {
		const res = await axios.get(`${API_URL}/user/friends/${user._id}`);

		return res.data;
	};

	const handleFollow = async () => {
		try {
			if (followed) {
				await axios.patch(`${API_URL}/user/unfollow/${user._id}`, {
					userId: currentUser._id,
				});

				dispatch({ type: 'UNFOLLOW', payload: user._id });
			} else {
				await axios.patch(`${API_URL}/user/follow/${user._id}`, {
					userId: currentUser._id,
				});
				dispatch({ type: 'FOLLOW', payload: user._id });
			}
		} catch (error) {
			console.log(error);
		}
		setFollowed(!followed);
	};

	const HomeRightbar = () => {
		return (
			<>
				<div className='birthdayContainer'>
					<img className='birthdayImg' src={`${PF}gift.png`} alt='' />
					<span className='birthdayText'>
						<b>Pola Foster </b> and <b> other friends </b> have a birthday today
					</span>
				</div>
				<img
					crossOrigin='anonymous'
					className='rightbarAd'
					src={`${PF}ad.png`}
					alt=''
				/>

				<h4 className='rightbarTitle'>Online Friends</h4>
				<ul className='rightbarFriendList'>
					{Users.map((u) => (
						<Online key={u.id} user={u} />
					))}
				</ul>
			</>
		);
	};

	const ProfileRightbar = () => {
		return (
			<>
				{/* Follow and Unfollow buttons */}
				{user._id !== currentUser._id && (
					<button onClick={handleFollow} className='rightbarFollowButton'>
						{followed ? 'Unfollow' : 'Follow'}
						{followed ? <Remove /> : <Add />}
					</button>
				)}

				<h4 className='rightbarTitle'>User Information</h4>
				<div className='rightbarInfo'>
					<div className='rightbarInfoItem'>
						<span className='rightbarInfoKey'>City:</span>
						<span className='rightbarInfoValue'>{user?.city}</span>
					</div>
					<div className='rightbarInfoItem'>
						<span className='rightbarInfoKey'>From:</span>
						<span className='rightbarInfoValue'>{user?.from}</span>
					</div>
					<div className='rightbarInfoItem'>
						<span className='rightbarInfoKey'>Relationship:</span>
						<span className='rightbarInfoValue'>
							{user?.relationship === RelationshipStatus.Single
								? 'Single'
								: user?.relationship === RelationshipStatus.Relationship
								? 'In a relationship'
								: "It's complicated"}{' '}
						</span>
					</div>
				</div>

				<h4 className='rightbarTitle'>User friends</h4>

				<div className='rightbarFollowings'>
					{friends?.map((friend) => (
						<Link
							key={friend?._id}
							to={`/profile/${friend.username}`}
							style={{ textDecoration: 'none' }}
						>
							<div className='rightbarFollowing'>
								<img
									crossOrigin='anonymous'
									className='rightbarFollowingImg'
									src={
										friend?.profilePicture
											? PF + friend.profilePicture
											: PF + 'person/noAvatar.png'
									}
									alt=''
								/>
								<span className='rightbarFollowingName'>{friend.username}</span>
							</div>
						</Link>
					))}
				</div>
			</>
		);
	};

	return (
		<div className='rightbar'>
			<div className='rightbarWrapper'>
				{(home && <HomeRightbar />) || (user && <ProfileRightbar />)}
			</div>
		</div>
	);
};

export default Rightbar;
