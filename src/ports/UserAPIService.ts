import HttpClient from './HttpClient';
import User from '../domain/User';

class UserAPIService {
	public async registerUser(
		username: String,
		password: String
	): Promise<User> {
		try {
			const retrievedUser = await HttpClient.post('/users', false, {
				username: username,
				password: password,
			}).then((res) => {
				const user = res.data as User;

				return {
					id: user.id,
					username: user.username,
					score: user.score,
					creationDate: new Date(user.creationDate.toString()),
				} as User;
			});

			return Promise.resolve(retrievedUser);
		} catch (err) {
			return Promise.reject(err);
		}
	}

	public async loginUser(
		username: String,
		password: String
	): Promise<String> {
		try {
			const response = await HttpClient.post('/tokens', false, {
				username: username,
				password: password,
			});

			const token = response.data['token'];
			localStorage.setItem('accessToken', token);
			
			return Promise.resolve('Login Successful');
		} catch (err) {
			return Promise.reject(err);
		}
	}
}

export default new UserAPIService();
