import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useContext } from 'react';
import './topbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Topbar = () => {
	const { user } = useContext(AuthContext);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER!;

	return (
		<div className='topbarContainer'>
			<div className='topbarLeft'>
				<Link to={'/'} style={{ textDecoration: 'none' }}>
					<span className='logo'>Lamasocial</span>
				</Link>
			</div>
			<div className='topbarCenter'>
				<div className='searchbar'>
					<SearchIcon className='searchIcon' />
					<input
						type='text'
						placeholder='Search for friend, post or video'
						className='searchInput'
					/>
				</div>
			</div>
			<div className='topbarRight'>
				<div className='topbarLinks'>
					<span className='topbarLink'>Homepage</span>
					<span className='topbarLink'>Timeline</span>
				</div>
				<div className='topbarIcons'>
					<div className='topbarIconItem'>
						<PersonIcon />
						<span className='topbarIconBadge'>1</span>
					</div>
					<div className='topbarIconItem'>
						<ChatIcon />
						<span className='topbarIconBadge'>2</span>
					</div>
					<div className='topbarIconItem'>
						<NotificationsIcon />
						<span className='topbarIconBadge'>1</span>
					</div>
				</div>
				<Link to={`/profile/${user.username}`}>
					<img crossOrigin="anonymous"
						src={user['profilePicture'] || PF + 'person/noAvatar.png'}
						alt=''
						className='topbarImg'
					/>
				</Link>
			</div>
		</div>
	);
};

export default Topbar;
