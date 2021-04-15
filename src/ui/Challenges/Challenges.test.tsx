import { screen, cleanup, render, waitFor } from '@testing-library/react';
import { Challenge } from '../../domain/Challenge';
import { ActivityTypes } from '../../domain/ActivityType';
import { ChallengeStatuses } from '../../domain/ChallengeStatus';
import { addWeeks } from 'date-fns';
import ChallengeAPIService from '../../ports/ChallengeAPIService';
import Challenges from './Challenges';

describe('Challenges', () => {
	afterEach(() => cleanup());

	test('component should render separate sections for each calendar week in the month', async () => {
		const mockCall = givenChallengeAPIService_getBetweenDatesReturns();

		render(<Challenges />);

		expect(mockCall).toHaveBeenCalled();
		const weekSegments = await waitFor(() =>
			screen.getAllByTestId('challenges_list_week')
		);
		expect(weekSegments.length).toEqual(3);
	});
});

const challengesSpanningThreeWeeks: Challenge[] = [
	{
		id: 'very cool id',
		activityType: ActivityTypes['RUNNING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-04-08'),
		expirationDate: addWeeks(new Date('2021-04-08'), 1),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['WALKING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-04-08'),
		expirationDate: addWeeks(new Date('2021-04-08'), 1),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['DRINK_WATER'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-04-08'),
		expirationDate: addWeeks(new Date('2021-04-08'), 1),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['RUNNING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-04-15'),
		expirationDate: addWeeks(new Date('2021-04-15'), 2),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['WALKING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-04-15'),
		expirationDate: addWeeks(new Date('2021-04-15'), 2),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['RUNNING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-04-21'),
		expirationDate: addWeeks(new Date('2021-04-21'), 3),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
	{
		id: 'very cool id',
		activityType: ActivityTypes['RUNNING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date('2021-04-21'),
		expirationDate: addWeeks(new Date('2021-04-21'), 3),
		challengeStatus: ChallengeStatuses['IN_PROGRESS'],
		userID: 'very cool user id',
	},
];

function givenChallengeAPIService_getBetweenDatesReturns() {
	return jest
		.spyOn(ChallengeAPIService, 'getAllChallengesForUserBetweenDates')
		.mockImplementation(() =>
			Promise.resolve(challengesSpanningThreeWeeks)
		);
}
