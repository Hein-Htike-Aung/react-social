import { User } from '../../dummyData';
import './closeFriend.css';

interface Props {
	user: User;
}

const CloseFriend = ({ user }: Props) => {
	return (
		<li className='sidebarFriend'>
			<img className='sidebarFriendImg' src={user.profilePicture} alt='' />
			<span className='sidebarFriendName'>{user.username}</span>
		</li>
	);
};

export default CloseFriend;
