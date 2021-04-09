import axios, { AxiosInstance } from 'axios';
import User from '../domain/User';

class UserAPIService {
	private baseAPIUrl: string = 'http://localhost:8080/api';

	private apiClient: AxiosInstance = axios.create({
		baseURL: this.baseAPIUrl,
		responseType: 'json',
	});

	public async registerUser(
		username: String,
		password: String
	): Promise<User> {
		try {
			console.log(this.apiClient);
			const response = await this.apiClient.post<User>('/users', {
				username: username,
				password: password,
			});

			const user = response.data;
			return Promise.resolve(user);
		} catch (err) {
			console.error(err);
			return Promise.reject(err);
		}
	}
}

export default new UserAPIService();
