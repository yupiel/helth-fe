import HttpClient from './HttpClient';
import {
	Challenge,
	challengeFromChallengeResponseObject,
	ChallengeResponse,
} from '../domain/Challenge';
import { dateToYMD } from '../common/DateUtils';

class ChallengeAPIService {
	public async getAllChallengesForUserBetweenDates(
		startDate: Date,
		endDate: Date
	): Promise<Challenge[]> {
		try {
			const response = await HttpClient.get({
				path: `/challenges?startDate=${dateToYMD(
					startDate
				)}&endDate=${dateToYMD(endDate)}`,
			});

			const receivedChallenges = response.data.map(
				(challenge: ChallengeResponse) =>
					challengeFromChallengeResponseObject(challenge)
			);

			return Promise.resolve(receivedChallenges);
		} catch (err) {
			return Promise.reject(err);
		}
	}

	public async saveNewChallengeForUser(
		activityType: string,
		timesAWeekGoal: number,
		durationInWeeks: number
	): Promise<Challenge> {
		try {
			const response = await HttpClient.post({
				path: '/challenges',
				authorized: true,
				body: {
					activityTypeText: activityType,
					timesAWeekGoal: timesAWeekGoal,
					weeksDuration: durationInWeeks,
				},
			});

			const challenge = challengeFromChallengeResponseObject(
				response.data as ChallengeResponse
			);

			return Promise.resolve(challenge);
		} catch (err) {
			return Promise.reject(err);
		}
	}
}

export default new ChallengeAPIService();
