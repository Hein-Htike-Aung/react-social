import { User } from '../../dummyData';
import './closeFriend.css';

interface Props {
	user: User;
}

const CloseFriend = ({ user }: Props) => {

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<li className='sidebarFriend'>
			<img className='sidebarFriendImg' src={PF + user.profilePicture} alt='' />
			<span className='sidebarFriendName'>{user.username}</span>
		</li>
	);
};

export default CloseFriend;
