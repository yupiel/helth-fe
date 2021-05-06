import { ChallengeResponse } from '../domain/Challenge';
import mockHttpClientFunction from '../__mocks__/MockHttpClient';
import { addWeeks } from 'date-fns';
import ChallengeAPIService from './ChallengeAPIService';

describe('ChallengeAPIService', () => {
	test('getAllChallengesForUserBetweenDates resolves array of challenges on successful retrieval', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'get',
			resolvedData: responseDataChallenges,
			resolved: true,
		});

		const response = await ChallengeAPIService.getAllChallengesForUserBetweenDates(
			new Date(),
			addWeeks(new Date(), 1)
		);

		expect(mockedCall).toHaveBeenCalled();
		expect(response.length).toEqual(4);
		response.forEach((challenge) => {
			expect(challenge.id).toBeTruthy();
		});
	});
	test('getAllChallengesForUserBetweenDates rejects with error on failure to retrieve', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'get',
			resolvedData: {},
			resolved: false,
		});

		const response = async () =>
			await ChallengeAPIService.getAllChallengesForUserBetweenDates(
				new Date(),
				addWeeks(new Date(), 1)
			);

		expect(mockedCall).toHaveBeenCalled();
		expect(response).rejects;
	});

	test('saveNewChallengeForUser resolves with saved Challenge information on successful save', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'post',
			resolvedData: responseDataChallengeSingle,
			resolved: true,
		});

		const response = await ChallengeAPIService.saveNewChallengeForUser(
			'DRINK_WATER',
			2,
			4
		);

		expect(mockedCall).toHaveBeenCalled();
		expect(response.activityType.typeText).toEqual('DRINK_WATER');
		expect(response.id).toBeTruthy();
	});

	test('saveNewChallengeForUser rejects on failure to save', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'post',
			resolvedData: {},
			resolved: false,
		});

		const response = async () =>
			await ChallengeAPIService.saveNewChallengeForUser(
				'DRINK_WATER',
				2,
				4
			);

		expect(mockedCall).toHaveBeenCalled();
		expect(response).rejects;
	});
});

//Test Data
const responseDataChallengeSingle: ChallengeResponse = {
	id: 'very cool id',
	activityType: 'DRINK_WATER',
	timesAWeekGoal: '4',
	timesAWeekCurrent: '2',
	startDate: new Date().toString(),
	expirationDate: addWeeks(new Date(), 1).toString(),
	challengeStatus: 'IN_PROGRESS',
	userID: 'very cool user id',
};

const responseDataChallenges: ChallengeResponse[] = [
	{
		id: 'very cool id',
		activityType: 'DRINK_WATER',
		timesAWeekGoal: '4',
		timesAWeekCurrent: '2',
		startDate: new Date().toString(),
		expirationDate: addWeeks(new Date(), 1).toString(),
		challengeStatus: 'IN_PROGRESS',
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: 'RUNNING',
		timesAWeekGoal: '4',
		timesAWeekCurrent: '2',
		startDate: new Date().toString(),
		expirationDate: addWeeks(new Date(), 1).toString(),
		challengeStatus: 'IN_PROGRESS',
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: 'WALKING',
		timesAWeekGoal: '4',
		timesAWeekCurrent: '2',
		startDate: new Date().toString(),
		expirationDate: addWeeks(new Date(), 1).toString(),
		challengeStatus: 'SUCCEEDED',
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: 'SWIMMING',
		timesAWeekGoal: '4',
		timesAWeekCurrent: '2',
		startDate: new Date().toString(),
		expirationDate: addWeeks(new Date(), 1).toString(),
		challengeStatus: 'FAILED',
		userID: 'very cool user id',
	},
];
