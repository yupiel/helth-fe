import HttpClient from './HttpClient';
import { User, UserResponse, userFromUserResponseObject } from '../domain/User';

class UserAPIService {
	public async registerUser(
		username: string,
		password: string
	): Promise<User> {
		try {
			const retrievedUser = await HttpClient.post({
				path: '/users',
				authorized: false,
				body: {
					username: username,
					password: password,
				},
			}).then((res) => {
				return userFromUserResponseObject(res.data as UserResponse);
			});

			return Promise.resolve(retrievedUser);
		} catch (err) {
			return Promise.reject(err);
		}
	}

	public async loginUser(
		username: string,
		password: string
	): Promise<{ token: string }> {
		try {
			const response = await HttpClient.post({
				path: '/tokens',
				authorized: false,
				body: {
					username: username,
					password: password,
				},
			});

			const token = response.data['token'];
			localStorage.setItem('accessToken', token);

			return Promise.resolve(response.data);
		} catch (err) {
			return Promise.reject(err);
		}
	}
}

export default new UserAPIService();
