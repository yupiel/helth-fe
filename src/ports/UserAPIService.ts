import axios, { AxiosError, AxiosInstance } from 'axios';
import User from '../domain/User';

class UserAPIService {
	private baseAPIUrl: string = 'http://localhost:8080/api';

	private apiClient: AxiosInstance = axios.create({
		baseURL: this.baseAPIUrl,
		headers: {
			'Content-Type': 'application/json',
		},
		responseType: 'json',
	});

	public async registerUser(
		username: String,
		password: String
	): Promise<User> {
		try {
			const response = await this.apiClient.post<User>('/users', {
				username: username,
				password: password,
			});

			const user = response.data;
			return Promise.resolve(user);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				let axiosError: AxiosError<any> = err as AxiosError<any>
				console.error(axiosError.response)
			}
			else{
				console.error(err)
			}
			
			return Promise.reject(err);
		}
	}
}

export default new UserAPIService();
