import HttpClient from './HttpClient';
import Activity from '../domain/Activity';
import {dateToYMD} from '../common/dateFormat'

class ActivityAPIService {
	public async getAllActivitiesForUserBetweenDates(startDate: Date, endDate: Date): Promise<Activity[]> {
		try {
			let receivedActivities: Activity[] = [];

			await HttpClient.get(
				`/activities?startDate=${dateToYMD(startDate)}&endDate=${dateToYMD(endDate)}`
			).then((res) => {
				res.data.forEach((activity: Activity) => {
					receivedActivities.push({
						id: activity.id,
						activityType: activity.activityType,
						creationDate: new Date(
							activity.creationDate.toString()
						),
						userID: activity.userID,
					});
				});
			});

			return Promise.resolve(receivedActivities);
		} catch (err) {
			return Promise.reject(err);
		}
	}
}

export default new ActivityAPIService();
