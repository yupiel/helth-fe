interface Challenge {
	readonly id: string;
	readonly activityType: string;
	readonly timesAWeekGoal: number;
	readonly timesAWeekCurrent: number;
	readonly startDate: Date;
	readonly expirationDate: Date;
	readonly challengeStatus: string;
	readonly userID: string;
}

export default Challenge;
