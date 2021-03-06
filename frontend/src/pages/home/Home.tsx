import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import './home.css';

const Home = () => {
	return (
		<>
			<Topbar />
			<div className='homeContainer'>
				<Sidebar />
				<Feed />
				<Rightbar home="home" />
			</div>
		</>
	);
};

export default Home;
