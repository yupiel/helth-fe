import axios, { AxiosError, AxiosInstance } from 'axios';
import Activity from '../domain/Activity';

class ActivityAPIService {
	private baseAPIUrl: string = 'http://localhost:8080/api';

	private authorizedAPIClient: AxiosInstance = axios.create({
		baseURL: this.baseAPIUrl,
		headers: {
			'Content-Type': 'application/json',
		},
		responseType: 'json',
	});

	public async getAllActivitiesForUser(): Promise<Activity[]> {
		try {
			const response = await this.authorizedAPIClient.get<Activity[]>(
				'/activities?startDate=2021-03-24&endDate=2021-04-18',
				{
					headers:
						this.getAuthHeaderFromStorage(),
				}
			);

			const activities = response.data;
			return Promise.resolve(activities);
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

	private getAuthHeaderFromStorage(): { Authorization: string } {
		const authHeaderPrefix = 'Bearer ';
		const accessToken = localStorage.getItem('accessToken');

		if (accessToken === undefined || accessToken == null) {
			//TODO add no auth header toast
			throw Error('No Auth header found');
		} else {
			return { Authorization: authHeaderPrefix + accessToken };
		}
	}
}

export default new ActivityAPIService();
