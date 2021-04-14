import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

class HttpClient {
	private apiClient: AxiosInstance = axios.create({
		baseURL: 'http://localhost:8080/api',
		headers: {
			'Content-Type': 'application/json',
		},
		responseType: 'json',
	});

	public async get(
		path: string,
		authorized: boolean = true
	): Promise<AxiosResponse> {
		try {
			return await this.apiClient.get(
				path,
				authorized ? { headers: getAuthHeaderFromStorage() } : {}
			);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				let axiosError: AxiosError<any> = err as AxiosError<any>;
				console.error(axiosError.response);
			} else {
				console.error(err);
			}

			return Promise.reject(err);
		}
	}

	public async post(
		path: string,
		authorized: boolean = true,
		body: Object
	): Promise<AxiosResponse> {
		try {
			return await this.apiClient.post(
				path,
				body,
				authorized ? { headers: getAuthHeaderFromStorage() } : {}
			);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				let axiosError: AxiosError<any> = err as AxiosError<any>;
				console.error(axiosError.response);
			} else {
				console.error(err);
			}

			return Promise.reject(err);
		}
	}

	public async delete(path: string): Promise<AxiosResponse> {
		try {
			return await this.apiClient.delete(path, {
				headers: getAuthHeaderFromStorage(),
			});
		} catch (err) {
			if (axios.isAxiosError(err)) {
				let axiosError: AxiosError<any> = err as AxiosError<any>;
				console.error(axiosError.response);
			} else {
				console.error(err);
			}

			return Promise.reject(err);
		}
	}
}

function getAuthHeaderFromStorage(): { Authorization: string } {
	const authHeaderPrefix = 'Bearer ';
	const accessToken = localStorage.getItem('accessToken');

	if (accessToken === undefined || accessToken == null) {
		//TODO add no auth header toast
		throw Error('No Auth header found in localStorage');
	} else {
		return { Authorization: authHeaderPrefix + accessToken };
	}
}

export default new HttpClient();
