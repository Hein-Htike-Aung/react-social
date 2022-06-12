import { useRef } from 'react';
import './login.css';

const Login = () => {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const handleLogin = (e: any) => {
		e.preventDefault();

		if(email.current) {
			console.log(email.current.value)
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
						<button className='loginButton'>Log In</button>
						<span className='loginForgot'>Forgot password?</span>
						<button type='submit' className='loginRegisterButton'>
							Create a New Account
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
