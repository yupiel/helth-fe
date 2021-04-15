import { ChallengeStatus } from "./ChallengeStatus";

interface Challenge {
	readonly id: string;
	readonly activityType: string;
	readonly timesAWeekGoal: number;
	readonly timesAWeekCurrent: number;
	readonly startDate: Date;
	readonly expirationDate: Date;
	readonly challengeStatus: ChallengeStatus;
	readonly userID: string;
}

export default Challenge;
