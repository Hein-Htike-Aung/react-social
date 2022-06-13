import { useContext, useRef } from 'react';
import { AuthApi } from '../../api/apiCalls';
import { AuthContext } from '../../context/AuthContext';
import './login.css';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Login = () => {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const { isFetching, dispatch } = useContext(AuthContext);

	const handleLogin = (e: any) => {
		e.preventDefault();

		if (email?.current?.value && password?.current?.value) {
			AuthApi.loginCall(
				{ email: email.current.value, password: password.current.value },
				dispatch,
			);
		}
	};

	return (
		<div className='login'>
			<div className='loginWrapper'>
				<div className='loginLeft'>
					<h3 className='loginLogo'>Lamasocial</h3>
					<span className='loginDesc'>
						Connect with friends and the world you on Lamasocial
					</span>
				</div>
				<div className='loginRight'>
					<form className='loginBox' onSubmit={handleLogin}>
						<input
							type='email'
							placeholder='Email'
							required
							className='loginInput'
							ref={email}
						/>
						<input
							type='password'
							required
							placeholder='Password'
							minLength={6}
							className='loginInput'
							ref={password}
						/>
						<button type='submit' disabled={isFetching} className='loginButton'>
							{isFetching ? <CircularProgress color='inherit' /> : 'Log In'}
						</button>
						<span className='loginForgot'>Forgot password?</span>
						<button type='submit' className='loginRegisterButton'>
							<Link className='registerLink' to={'/register'}>Create a New Account</Link>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
