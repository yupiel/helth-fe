import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ActivityTypes } from '../../domain/ActivityType';
import NewChallengeDialogue from './NewChallengeDialogue';
import ChallengeAPIService from '../../ports/ChallengeAPIService';
import { Challenge } from '../../domain/Challenge';
import { ChallengeStatuses } from '../../domain/ChallengeStatus';
import { addWeeks } from 'date-fns';

describe('NewChallengeDialogue', () => {
	afterEach(() => cleanup());

	test('component should toggle visibility of new challenge form on button click', async () => {
		render(
			<NewChallengeDialogue
				updateListFunction={mockedParentUpdateFunction}
			/>
		);

		const showNewActivityDialogueButton = await waitFor(() =>
			screen.getByTestId('challenge_add_button')
		);
		const newActivityDialogue = await waitFor(() =>
			screen.getByTestId('challenge_add_dialogue')
		);

		expect(newActivityDialogue.parentNode).toHaveClass('is-invisible');

		showNewActivityDialogueButton.click();

		expect(newActivityDialogue.parentNode).not.toHaveClass('is-invisible');

		showNewActivityDialogueButton.click();

		expect(newActivityDialogue.parentNode).toHaveClass('is-invisible');
	});

	test('components drop down menu should render out all possible activity types as options', async () => {
		render(
			<NewChallengeDialogue
				updateListFunction={mockedParentUpdateFunction}
			/>
		);

		const dropdownOptions = await waitFor(() =>
			screen.getAllByTestId('challenge_add_dialogue_type_dropdown_option')
		);

		//+1 for default pick... option
		const expectedLength = Object.keys(ActivityTypes).length + 1;
		expect(dropdownOptions).toHaveLength(expectedLength);

		for (const option of dropdownOptions) {
			const value = option.getAttribute('value') as string;
			if (value === 'DEFAULT') continue;

			expect(ActivityTypes[value]).toBeTruthy();
			expect(ActivityTypes[value].typeText).toEqual(value);
		}
	});

	test('component should call ChallengeAPIService when add-button is pressed with valid parameters', async () => {
		render(
			<NewChallengeDialogue
				updateListFunction={mockedParentUpdateFunction}
			/>
		);
		
		const mockedCall = challengeAPIService_saveNewChallengeForUserResolves(testChallenge);

		const dropdownObject = await waitFor(() =>
			screen.getByTestId('challenge_add_dialogue_type_dropdown')
		);		
		const weeklyGoalAmount = await waitFor(() => 
			screen.getByTestId('challenge_add_dialogue_weekly_goal')
		);
		const weekAmount = await waitFor(() => 
			screen.getByTestId('challenge_add_dialogue_week_amount')
		);
		const dialogueSubmitButton = await waitFor(() =>
			screen.getByTestId('challenge_add_dialogue_submit_button')
		);

		fireEvent.change(dropdownObject, { target: { value: 'DRINK_WATER' } });
		fireEvent.change(weeklyGoalAmount, { target: { value: '2' } });
		fireEvent.change(weekAmount, { target: { value: '2' } });
		await act(async () => {
			fireEvent.click(dialogueSubmitButton);
		});

		expect(mockedCall).toHaveBeenCalled();
		expect(mockedParentUpdateFunction).toHaveBeenCalled();
	});
});

const testChallenge = {
	id: 'very cool id',
	activityType: ActivityTypes['RUNNING'],
	timesAWeekGoal: 4,
	timesAWeekCurrent: 2,
	startDate: new Date('2021-05-10'),
	expirationDate: addWeeks(new Date('2021-05-10'), 1),
	challengeStatus: ChallengeStatuses['IN_PROGRESS'],
	userID: 'very cool user id',
} as Challenge

const mockedParentUpdateFunction = jest.fn();

function challengeAPIService_saveNewChallengeForUserResolves(
	returnData: Challenge
) {
	return jest
		.spyOn(ChallengeAPIService, 'saveNewChallengeForUser')
		.mockResolvedValue(returnData);
}