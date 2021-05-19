import HttpClient from './HttpClient';
import {
	Activity,
	ActivityResponse,
	activityFromActivityResponseObject,
} from '../domain/Activity';
import { dateToYMD } from '../common/DateUtils';

class ActivityAPIService {
	public async getAllActivitiesForUserBetweenDates(
		startDate: Date,
		endDate: Date
	): Promise<Activity[]> {
		try {
			const response = await HttpClient.get({
				path: `/activities?startDate=${dateToYMD(
					startDate
				)}&endDate=${dateToYMD(endDate)}`,
			});

			const activities = response.data.map(
				(activity: ActivityResponse) => {
					return activityFromActivityResponseObject(activity);
				}
			);

			return Promise.resolve(activities);
		} catch (err) {
			return Promise.reject(err);
		}
	}

	public async saveNewActivityForUser(
		activityType: string,
		date: Date
	): Promise<Activity> {
		try {
			const response = await HttpClient.post({
				path: '/activities',
				authorized: true,
				body: {
					textType: activityType,
					creationDate: dateToYMD(date),
				},
			});

			const activity = activityFromActivityResponseObject(response.data);

			return Promise.resolve(activity);
		} catch (err) {
			return Promise.reject(err);
		}
	}
}

export default new ActivityAPIService();
