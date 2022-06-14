import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import { User } from '../../models/user.model';
import './profile.css';

const Profile = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const { username } = useParams();

	const [user, seteUser] = useState<User>();

	useEffect(() => {
		const fetchUser = async () => {
			if (username) {
				seteUser(await getUserByUsername(username));
			}
		};

		fetchUser();
	}, [username]);

	const getUserByUsername = async (username: string) => {
		const res = await axios(`/user/by-query?username=${username}`);

		return res.data;
	};

	return (
		<>
			<Topbar />
			<div className='profile'>
				<Sidebar />
				<div className='profileRight'>
					<div className='profileRightTop'>
						<div className='profileCover'>
							<img crossOrigin="anonymous"
								className='profileCoverImg'
								src={user?.coverPicture || PF + 'person/noCover.png'}
								alt=''
							/>
							<img crossOrigin="anonymous"
								className='profileUserImg'
								src={user?.profilePicture ? PF + user?.profilePicture : PF + 'person/noAvatar.png'}
								alt=''
							/>
						</div>
						<div className='profileInfo'>
							<h4 className='profileInfoName'>{user?.username}</h4>
							<span className='profileInfoDesc'>{user?.desc}</span>
						</div>
					</div>
					<div className='profileRightBottom'>
						<Feed userId={user?._id} />
						<Rightbar user={user} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
