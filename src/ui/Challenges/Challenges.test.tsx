import { screen, cleanup, render, waitFor } from '@testing-library/react';
import { Challenge } from '../../domain/Challenge';
import { ActivityTypes } from '../../domain/ActivityType';
import { ChallengeStatuses } from '../../domain/ChallengeStatus';
import { addWeeks } from 'date-fns';
import ChallengeAPIService from '../../ports/ChallengeAPIService';
import Challenges from './Challenges';

describe('Challenges', () => {
	afterEach(() => cleanup());

	test('component should render separate sections for each calendar week in the month a challenge exists in', async () => {
		const mockedCall = challengeAPIService_getAllChallengesForUserBetweenDatesReturns(
			challengesSpanningThreeWeeks
		);

		render(<Challenges currentDate={new Date('2021-05-01')} />);

		expect(mockedCall).toHaveBeenCalled();
		const weekSegments = await screen.findAllByTestId(
			'challenges_list_week'
		);

		expect(weekSegments.length).toEqual(3);
	});

	test('componen should render no week sections when no challenges were received', async () => {
		const mockedCall = challengeAPIService_getAllChallengesForUserBetweenDatesReturns(
			[]
		);

		render(<Challenges currentDate={new Date('2021-05-01')} />);

		expect(mockedCall).toHaveBeenCalled();
		const weekSegments = await waitFor(() =>
			screen.queryAllByTestId('challenge_list_week')
		);
		expect(weekSegments.length).toEqual(0);
	});
});

const challengesSpanningThreeWeeks: Challenge[] = [
	{
		id: 'very cool id',
		activityType: ActivityTypes['RUNNING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-05-03'),
		expirationDate: addWeeks(new Date('2021-05-03'), 1),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['WALKING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-05-03'),
		expirationDate: addWeeks(new Date('2021-05-03'), 1),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['DRINK_WATER'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-05-03'),
		expirationDate: addWeeks(new Date('2021-05-03'), 1),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['RUNNING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-05-10'),
		expirationDate: addWeeks(new Date('2021-05-10'), 1),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['CALISTHENICS'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-05-10'),
		expirationDate: addWeeks(new Date('2021-05-10'), 1),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['RUNNING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-05-17'),
		expirationDate: addWeeks(new Date('2021-05-17'), 1),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['SWIMMING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-05-17'),
		expirationDate: addWeeks(new Date('2021-05-17'), 1),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
];

function challengeAPIService_getAllChallengesForUserBetweenDatesReturns(
	returnData: Challenge[]
) {
	return jest
		.spyOn(ChallengeAPIService, 'getAllChallengesForUserBetweenDates')
		.mockImplementation(() => Promise.resolve(returnData));
}
