import { ActivityType, ActivityTypes } from './ActivityType';

export interface Activity {
	readonly id: string;
	readonly activityType: ActivityType;
	readonly creationDate: Date;
	readonly userID: string;
}

export function fromActivityResponseObject(activityResponse: Activity): Activity {
	return {
		id: activityResponse.id,
		activityType: ActivityTypes[activityResponse.activityType.toString()],
		creationDate: new Date(activityResponse.creationDate.toString()),
		userID: activityResponse.userID,
	} as Activity;
}
