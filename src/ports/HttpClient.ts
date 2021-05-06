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
				authorized ? { headers: this.getAuthHeaderFromStorage() } : {}
			);
		} catch (err) {return this.handleError(err)}
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
				authorized ? { headers: this.getAuthHeaderFromStorage() } : {}
			);
		} catch (err) {return this.handleError(err)}
	}

	public async delete(path: string): Promise<AxiosResponse> {
		try {
			return await this.apiClient.delete(path, {
				headers: this.getAuthHeaderFromStorage(),
			});
		} catch (err) {return this.handleError(err)}
	}

	private handleError(error: any): Promise<any> {
		if (axios.isAxiosError(error)) {
			let axiosError: AxiosError<any> = error as AxiosError<any>;
			console.error(axiosError.response);
		} else {
			console.error(error);
		}
	
		return Promise.reject(error);
	}
	
	private getAuthHeaderFromStorage(): { Authorization: string } {
		const authHeaderPrefix = 'Bearer ';
		const accessToken = localStorage.getItem('accessToken');
	
		if (accessToken === undefined || accessToken == null) {
			throw new Error('No Auth header found in localStorage');
		} else {
			return { Authorization: authHeaderPrefix + accessToken };
		}
	}
}

export default new HttpClient();
