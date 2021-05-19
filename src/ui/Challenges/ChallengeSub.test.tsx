import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { addWeeks } from 'date-fns';
import { ActivityTypes } from '../../domain/ActivityType';
import { Challenge } from '../../domain/Challenge';
import {
	ChallengeStatus,
	ChallengeStatuses,
} from '../../domain/ChallengeStatus';
import ChallengeSub from './ChallengeSub';

describe('ChallengeSub', () => {
	afterEach(() => cleanup());

	test('component should render icon for props Challenge Activity Type object', async () => {
		render(<ChallengeSub {...testChallenge} />);

		const activityIcon = await waitFor(() =>
			screen.getByTestId('activity_entry_icon')
		);

		expect(activityIcon).toBeTruthy();
		activityIcon.childNodes.forEach((node) => {
			expect(node.nodeName).toEqual('svg');
		});
	});

	test('component should render type text of challenge-associated activity in present form', async () => {
		render(<ChallengeSub {...testChallenge} />);

		const activityTypeText = await waitFor(() =>
			screen.getByTestId('challenge_entry_activity_type')
		);

		expect(activityTypeText).toBeTruthy();
		expect(activityTypeText.innerHTML).toEqual(
			ActivityTypes['RUNNING'].typeDescription
		);
	});

	test('component should add no css class for IN_PROGRESS challenge status', async () => {
		const inProgressChallenge = challengeWithStatus(
			ChallengeStatuses['IN_PROGRESS']
		);

		render(<ChallengeSub {...inProgressChallenge} />);

		const challengeComponentColorClass = await waitFor(() =>
			screen.getByTestId('challenge_entry')
		);

		expect(challengeComponentColorClass).not.toHaveClass(
			'has-background-success-light'
		);
		expect(challengeComponentColorClass).not.toHaveClass(
			'has-background-danger-light'
		);
		expect(challengeComponentColorClass).not.toHaveClass(
			'has-background-danger-dark'
		);
	});

	test('component should add success css class for SUCCEEDED challenge status', async () => {
		const inProgressChallenge = challengeWithStatus(
			ChallengeStatuses['SUCCEEDED']
		);

		render(<ChallengeSub {...inProgressChallenge} />);

		const challengeComponentColorClass = await waitFor(() =>
			screen.getByTestId('challenge_entry')
		);

		expect(challengeComponentColorClass).toHaveClass(
			'has-background-success-light'
		);
	});

	test('component should add failed css class for FAILED challenge status', async () => {
		const inProgressChallenge = challengeWithStatus(
			ChallengeStatuses['FAILED']
		);

		render(<ChallengeSub {...inProgressChallenge} />);

		const challengeComponentColorClass = await waitFor(() =>
			screen.getByTestId('challenge_entry')
		);

		expect(challengeComponentColorClass).toHaveClass(
			'has-background-danger-light'
		);
	});

	test('component should add danger css class for any value that is not a supported challenge status', async () => {
		const inProgressChallenge = challengeWithStatus(
			ChallengeStatuses['FDSHIUODHNWOJFD']
		);

		render(<ChallengeSub {...inProgressChallenge} />);

		const challengeComponentColorClass = await waitFor(() =>
			screen.getByTestId('challenge_entry')
		);

		expect(challengeComponentColorClass).toHaveClass(
			'has-background-danger-dark'
		);
	});
});

const testChallenge: Challenge = {
	id: 'very cool id',
	activityType: ActivityTypes['RUNNING'],
	timesAWeekGoal: 4,
	timesAWeekCurrent: 2,
	startDate: new Date(),
	expirationDate: addWeeks(new Date(), 2),
	challengeStatus: ChallengeStatuses['IN_PROGRESS'],
	userID: 'very cool user id',
};

function challengeWithStatus(status: ChallengeStatus): Challenge {
	return {
		id: 'very cool id',
		activityType: ActivityTypes['RUNNING'],
		timesAWeekGoal: 4,
		timesAWeekCurrent: 2,
		startDate: new Date(),
		expirationDate: addWeeks(new Date(), 2),
		challengeStatus: status,
		userID: 'very cool user id',
	};
}
