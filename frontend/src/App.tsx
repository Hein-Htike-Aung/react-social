import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';

const App = () => {
	const { user } = useContext(AuthContext);

	return (
		<Routes>
			<Route path='/' element={user ? <Home /> : <Register />} />
			<Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
			<Route
				path='/register'
				element={user ? <Navigate to='/' replace={true} /> : <Register />}
			/>
			<Route path='/profile/:username' element={<Profile />} />
		</Routes>
	);
};

export default App;
