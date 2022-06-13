import axios from 'axios';
import { UserCredentials } from '../models/user.model';
import API_URL from './apiurl';

export class AuthApi {
	public static async loginCall(
		userCredentials: UserCredentials,
		dispatch: any,
	) {
		dispatch({ type: 'LOGIN_START' });

		try {
			const res = await axios.post(`${API_URL}/auth/login`, userCredentials);

			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
		} catch (error) {
			dispatch({ type: 'LOGIN_FAILURE', payload: error });
		}
	}
}
