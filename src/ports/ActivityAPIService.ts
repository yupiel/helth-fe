import HttpClient from './HttpClient';
import {Activity, fromActivityResponseObject} from '../domain/Activity';
import { dateToYMD } from '../common/DateUtils';

class ActivityAPIService {
	public async getAllActivitiesForUserBetweenDates(
		startDate: Date,
		endDate: Date
	): Promise<Activity[]> {
		try {
			let receivedActivities: Activity[] = [];

			await HttpClient.get(
				`/activities?startDate=${dateToYMD(
					startDate
				)}&endDate=${dateToYMD(endDate)}`
			).then((res) => {
				res.data.forEach((activity: Activity) => {
					receivedActivities.push(fromActivityResponseObject(activity));
				});
			});

			return Promise.resolve(receivedActivities);
		} catch (err) {
			return Promise.reject(err);
		}
	}

	public async saveNewActivityForUser(
		activityType: string,
		date: Date
	): Promise<Activity> {
		try {
			const receivedArticle = await HttpClient.post('/activities', true, {
				textType: activityType,
				creationDate: dateToYMD(date),
			}).then((res) => {
				return fromActivityResponseObject(res.data as Activity)
			});

			return Promise.resolve(receivedArticle);
		} catch (err) {
			return Promise.reject(err);
		}
	}
}

export default new ActivityAPIService();
