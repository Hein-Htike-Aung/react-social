import { Users } from '../../dummyData';
import { RelationshipStatus, User } from '../../models/user.model';
import Online from '../online/Online';
import './rightbar.css';

interface Props {
	home?: string;
	user?: User;
}

const Rightbar = ({ user, home }: Props) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const HomeRightbar = () => {
		return (
			<>
				<div className='birthdayContainer'>
					<img className='birthdayImg' src={`${PF}gift.png`} alt='' />
					<span className='birthdayText'>
						<b>Pola Foster </b> and <b> other friends </b> have a birthday today
					</span>
				</div>
				<img className='rightbarAd' src={`${PF}ad.png`} alt='' />

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
					<div className='rightbarFollowing'>
						<img
							className='rightbarFollowingImg'
							src={`${PF}person/1.jpeg`}
							alt=''
						/>
						<span className='rightbarFollowingName'>John Carter</span>
					</div>
					<div className='rightbarFollowing'>
						<img
							className='rightbarFollowingImg'
							src={`${PF}person/1.jpeg`}
							alt=''
						/>
						<span className='rightbarFollowingName'>John Carter</span>
					</div>
					<div className='rightbarFollowing'>
						<img
							className='rightbarFollowingImg'
							src={`${PF}person/2.jpeg`}
							alt=''
						/>
						<span className='rightbarFollowingName'>John Carter</span>
					</div>
					<div className='rightbarFollowing'>
						<img
							className='rightbarFollowingImg'
							src={`${PF}person/3.jpeg`}
							alt=''
						/>
						<span className='rightbarFollowingName'>John Carter</span>
					</div>
					<div className='rightbarFollowing'>
						<img
							className='rightbarFollowingImg'
							src={`${PF}person/4.jpeg`}
							alt=''
						/>
						<span className='rightbarFollowingName'>John Carter</span>
					</div>
					<div className='rightbarFollowing'>
						<img
							className='rightbarFollowingImg'
							src={`${PF}person/6.jpeg`}
							alt=''
						/>
						<span className='rightbarFollowingName'>John Carter</span>
					</div>
					<div className='rightbarFollowing'>
						<img
							className='rightbarFollowingImg'
							src={`${PF}person/6.jpeg`}
							alt=''
						/>
						<span className='rightbarFollowingName'>John Carter</span>
					</div>
					<div className='rightbarFollowing'>
						<img
							className='rightbarFollowingImg'
							src={`${PF}person/6.jpeg`}
							alt=''
						/>
						<span className='rightbarFollowingName'>John Carter</span>
					</div>
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
