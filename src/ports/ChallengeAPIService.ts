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
			let receivedChallenges: Challenge[] = [];

			await HttpClient.get(
				`/challenges?startDate${dateToYMD(
					startDate
				)}&endDate=${dateToYMD(endDate)}`
			).then((res) => {
				res.data.forEach((challenge: ChallengeResponse) => {
					receivedChallenges.push(
						challengeFromChallengeResponseObject(challenge)
					);
				});
			});

			return Promise.resolve(receivedChallenges);
		} catch (err) {
			return Promise.reject(err);
		}
	}
}

export default new ChallengeAPIService();
