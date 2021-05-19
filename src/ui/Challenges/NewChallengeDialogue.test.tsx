import {
	cleanup,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ActivityTypes } from '../../domain/ActivityType';
import NewChallengeDialogue from './NewChallengeDialogue';
import ChallengeAPIService from '../../ports/ChallengeAPIService';

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

	test('components weekly goal should update in UI when entering a new number', async () => {
		render(
			<NewChallengeDialogue
				updateListFunction={mockedParentUpdateFunction}
			/>
		);

		const weeklyGoalBefore = await waitFor(() =>
			screen.getByTestId('challenge_add_dialogue_weely_goal')
		);
		expect(weeklyGoalBefore.getAttribute('value')).toBeNull();

		weeklyGoalBefore.setAttribute('value', '3');

		const weeklyGoalAfter = await waitFor(() =>
			screen.getByTestId('challenge_add_dialogue_weely_goal')
		);

		expect(weeklyGoalAfter.getAttribute('value')).toEqual('3');
	}); //TODO Remove

	test.skip('component should call ChallengeAPIService when add-buttonm is pressed with valid parameters', async () => {
		render(
			<NewChallengeDialogue
				updateListFunction={mockedParentUpdateFunction}
			/>
		);
		
		const mockedCall = challengeAPIService_getAllChallengesForUserBetweenDatesMock();

		const dropdownOptions = await waitFor(() =>
			screen.getByTestId('challenge_add_dialogue_type_dropdown_option')
		);
		
	})
});

const mockedParentUpdateFunction = () => jest.fn();

function challengeAPIService_getAllChallengesForUserBetweenDatesMock() {
	return jest
	.spyOn(ChallengeAPIService, 'getAllChallengesForUserBetweenDates')
	.mockResolvedValue([]);
}