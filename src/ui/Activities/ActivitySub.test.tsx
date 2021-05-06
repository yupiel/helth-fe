import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { Activity } from '../../domain/Activity';
import ActivityTypes from '../../domain/ActivityType';
import ActivitySub from './ActivitySub';

describe('ActivitySub', () => {
	afterEach(() => cleanup());

	test('component should render icon for props Activity object', async () => {
		render(<ActivitySub {...fullTestActivity} />);

		const activityIcon = await waitFor(() =>
			screen.getAllByTestId('activity_entry_icon')
		);

		expect(activityIcon).toBeTruthy();
		expect(activityIcon.length).toEqual(1);
		activityIcon[0].childNodes.forEach((node) => {
			expect(node.nodeName).toEqual('svg');
		});
	});

	test('component should render type text of activity in past form', async () => {
		render(<ActivitySub {...fullTestActivity} />);

		const activityTypeText = await waitFor(() =>
			screen.getAllByTestId('activity_entry_type')
		);

		expect(activityTypeText).toBeTruthy();
		expect(activityTypeText.length).toEqual(1);
		expect(activityTypeText[0].innerHTML).toEqual(
			ActivityTypes['DRINK_WATER'].typeDescriptionPast
		);
	});
});

//Test Data

const fullTestActivity: Activity = {
	id: 'bda78ae7-161f-485b-bb41-e604fd7af718',
	activityType: ActivityTypes['DRINK_WATER'],
	creationDate: new Date(),
	userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
};
