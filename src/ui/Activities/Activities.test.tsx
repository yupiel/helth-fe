import ActivityAPIService from '../../ports/ActivityAPIService';
import Activity from '../../domain/Activity';
import Activities from './Activities';
import { cleanup, render, screen, waitFor } from '@testing-library/react';

describe('Activities', () => {
	afterEach(() => cleanup());

	test('component should render separate sections for each day in the week', async () => {
		const mockedCall = givenActivityAPIServiceReturns(
			activitiesSpanningThreeDays
		);

		render(<Activities />);

		expect(mockedCall).toHaveBeenCalled();
		const daySegments = await waitFor(() =>
			screen.getAllByTestId('activities_list_day')
		);
		expect(daySegments.length).toEqual(3);
	});
});

const activitiesSpanningThreeDays: Activity[] = [
	{
		id: 'bda78ae7-161f-485b-bb41-e604fd7af718',
		activityType: 'DRINK_WATER',
		creationDate: new Date('2021-04-14'),
		userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
	},
	{
		id: '275acb83-e688-4ae4-a18f-b9c5b0e9387e',
		activityType: 'DRINK_WATER',
		creationDate: new Date('2021-04-14'),
		userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
	},
	{
		id: '6bd23324-53a4-4dd9-92ed-02d28e06a7b4',
		activityType: 'DRINK_WATER',
		creationDate: new Date('2021-04-14'),
		userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
	},
	{
		id: 'e1322202-eccd-401a-9f03-eeb639ab8ba5',
		activityType: 'DRINK_WATER',
		creationDate: new Date('2021-04-13'),
		userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
	},
	{
		id: 'b941cd5b-de5e-4733-91e6-c4881cc2305b',
		activityType: 'DRINK_WATER',
		creationDate: new Date('2021-04-13'),
		userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
	},
	{
		id: 'cf429fa5-fdd5-4f0a-b498-99165534200c',
		activityType: 'DRINK_WATER',
		creationDate: new Date('2021-04-13'),
		userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
	},
	{
		id: 'ad709cb6-2dc7-4d15-8e62-246bd54c5b75',
		activityType: 'RUNNING',
		creationDate: new Date('2021-04-13'),
		userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
	},
	{
		id: '346d17fb-c90e-473c-b275-2fd4de34b9c6',
		activityType: 'RUNNING',
		creationDate: new Date('2021-04-15'),
		userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
	},
];

function givenActivityAPIServiceReturns(
	activitiesSpanningThreeDays: Activity[]
) {
	return jest
		.spyOn(ActivityAPIService, 'getAllActivitiesForUserBetweenDates')
		.mockImplementation(() => Promise.resolve(activitiesSpanningThreeDays));
}
