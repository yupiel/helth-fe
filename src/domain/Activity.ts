import { ActivityType, ActivityTypes } from './ActivityType';

export interface Activity {
	readonly id: string;
	readonly activityType: ActivityType;
	readonly creationDate: Date;
	readonly userID: string;
}

export interface ActivityResponse {
	readonly id: string;
	readonly activityType: string;
	readonly creationDate: string;
	readonly userID: string;
}

export function activityFromActivityResponseObject(activityResponse: ActivityResponse): Activity {
	return {
		id: activityResponse.id,
		activityType: ActivityTypes[activityResponse.activityType.toString()],
		creationDate: new Date(activityResponse.creationDate.toString()),
		userID: activityResponse.userID,
	} as Activity;
}
