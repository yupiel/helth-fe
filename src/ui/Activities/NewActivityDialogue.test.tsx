import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import NewActivityDialogue from './NewActivityDialogue';
import ActivityTypes from '../../domain/ActivityType';
import ActivityAPIService from '../../ports/ActivityAPIService';
import { Activity } from '../../domain/Activity';

describe('NewActivityDialogue', () => {
	afterEach(() => cleanup());

	test('component should toggle visibility of new activity form on button click', async () => {
		render(
			<NewActivityDialogue
				currentDate={testCurrentDate}
				updateListFunction={mockedParentUpdateFunction}
			/>
		);

		const showNewActivityDialogueButton = await waitFor(() =>
			screen.getByTestId('activity_add_button')
		);
		const newActivityDialogue = await waitFor(() =>
			screen.getByTestId('activity_add_dialogue')
		);

		expect(newActivityDialogue.parentNode).toHaveClass('is-invisible');

		showNewActivityDialogueButton.click();

		expect(newActivityDialogue.parentNode).not.toHaveClass('is-invisible');

		showNewActivityDialogueButton.click();

		expect(newActivityDialogue.parentNode).toHaveClass('is-invisible');
	});

	test('components drop down menu should render out all possible activity types as options', async () => {
		render(
			<NewActivityDialogue
				currentDate={testCurrentDate}
				updateListFunction={mockedParentUpdateFunction}
			/>
		);

		const dropdownOptions = await waitFor(() =>
			screen.getAllByTestId('activity_add_dialogue_type_dropdown_option')
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

	test('component should call ActivityAPIService when add-button is pressed with valid option selected', async () => {
		render(
			<NewActivityDialogue
				currentDate={testCurrentDate}
				updateListFunction={mockedParentUpdateFunction}
			/>
		);

		const mockedCall = activityAPIService_saveNewActivityForUserResolves(
			testActivity
		);

		const dropdownObject = await waitFor(() =>
			screen.getByTestId('activity_add_dialogue_type_dropdown')
		);
		const dialogueSubmitButton = await waitFor(() =>
			screen.getByTestId('activity_add_dialogue_submit_button')
		);

		fireEvent.change(dropdownObject, { target: { value: 'DRINK_WATER' } });
		await act(async () => {
			fireEvent.click(dialogueSubmitButton);
		});

		expect(mockedCall).toHaveBeenCalled();
		expect(mockedParentUpdateFunction).toHaveBeenCalled();
	});

	test.skip('component should not call ActivityAPIService when add-button is pressed with invalid option selected', async () => {
		render(
			<NewActivityDialogue
				currentDate={testCurrentDate}
				updateListFunction={mockedParentUpdateFunction}
			/>
		);

		const mockedCall = activityAPIService_saveNewActivityForUserResolves(
			testActivity
		);

		const dropdownOptions = await waitFor(() =>
			screen.getAllByTestId('activity_add_dialogue_type_dropdown_option')
		);
		const dialogueSubmitButton = await waitFor(() =>
			screen.getByTestId('activity_add_dialogue_submit_button')
		);

		dropdownOptions[0].click();
		dialogueSubmitButton.click();

		expect(mockedCall).not.toHaveBeenCalled();
	});
});

const testCurrentDate = new Date();
const testActivity: Activity = {
	id: 'bda78ae7-161f-485b-bb41-e604fd7af718',
	activityType: ActivityTypes['DRINK_WATER'],
	creationDate: new Date(),
	userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
};

const mockedParentUpdateFunction = jest.fn();

function activityAPIService_saveNewActivityForUserResolves(
	returnData: Activity
) {
	return jest
		.spyOn(ActivityAPIService, 'saveNewActivityForUser')
		.mockImplementation(() => Promise.resolve(returnData));
}
