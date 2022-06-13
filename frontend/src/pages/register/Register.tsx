import axios from 'axios';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../../api/apiurl';
import './register.css';

const Register = () => {
	const navigate = useNavigate();

	const usernameInput = useRef<HTMLInputElement>(null);
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);
	const passwordAgainInput = useRef<HTMLInputElement>(null);

	const handleRegister = async (e: any) => {
		e.preventDefault();

		const password = passwordInput.current?.value;
		const passwordConfirmation = passwordAgainInput.current?.value;
		const username = usernameInput.current?.value;
		const email = emailInput.current?.value;

		if (password && passwordConfirmation && username && email) {
			if (password !== passwordConfirmation) {
				passwordAgainInput?.current?.setCustomValidity("Passwords don't match");
			} else {
				const user = {
					username,
					email,
					password,
					passwordConfirmation,
				};

				try {
					await axios.post(`${API_URL}/auth/register`, user);

					navigate('/login', { replace: true });
				} catch (error) {
					console.log(error);
				}
			}
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
					<form className='loginBox' onSubmit={handleRegister}>
						<input
							type='text'
							placeholder='Username'
							className='loginInput'
							ref={usernameInput}
							required
						/>
						<input
							type='email'
							placeholder='Email'
							className='loginInput'
							ref={emailInput}
							required
						/>
						<input
							type='password'
							placeholder='Password'
							className='loginInput'
							ref={passwordInput}
							required
							minLength={6}
						/>
						<input
							type='password'
							placeholder='Password Again'
							className='loginInput'
							ref={passwordAgainInput}
							required
							minLength={6}
						/>
						<button type='submit' className='loginButton'>
							Sign Up
						</button>
						<button className='loginRegisterButton'>
							<Link className='loginLink' to={'/login'}>Log into Account</Link>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
