import { ChallengeStatus, ChallengeStatuses } from "./ChallengeStatus";
import { ActivityType, ActivityTypes } from "./ActivityType";

export interface Challenge {
	readonly id: string;
	readonly activityType: ActivityType;
	readonly timesAWeekGoal: number;
	readonly timesAWeekCurrent: number;
	readonly startDate: Date;
	readonly expirationDate: Date;
	readonly challengeStatus: ChallengeStatus;
	readonly userID: string;
}

export interface ChallengeResponse {
	readonly id: string;
	readonly activityType: string;
	readonly timesAWeekGoal: string;
	readonly timesAWeekCurrent: string;
	readonly startDate: string;
	readonly expirationDate: string;
	readonly challengeStatus: string;
	readonly userID: string;
}

export function challengeFromChallengeResponseObject(challengeResponse: ChallengeResponse): Challenge {
	return {
		id: challengeResponse.id,
		activityType: ActivityTypes[challengeResponse.activityType.toString()],
		timesAWeekGoal: Number(challengeResponse.timesAWeekGoal),
		timesAWeekCurrent: Number(challengeResponse.timesAWeekCurrent),
		startDate: new Date(challengeResponse.startDate.toString()),
		expirationDate: new Date(challengeResponse.startDate.toString()),
		challengeStatus: ChallengeStatuses[challengeResponse.challengeStatus.toString()],
		userID: challengeResponse.userID
	} as Challenge
}
