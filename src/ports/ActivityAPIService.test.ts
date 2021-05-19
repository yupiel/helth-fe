import { ActivityResponse } from '../domain/Activity';
import ActivityAPIService from './ActivityAPIService';
import mockHttpClientFunction from '../__mocks__/MockHttpClientFunction';
import { addWeeks } from 'date-fns';

describe('ActivityAPIService', () => {
	test('saveNewActivityForUser resolves Activity Data and maps to Activity interface Object when new Activity is Created', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'post',
			resolvedData: responseDataActivityInfo,
			resolved: true,
		});

		const requestResponse = await ActivityAPIService.saveNewActivityForUser(
			'DRINK_WATER',
			new Date()
		);

		expect(mockedCall).toHaveBeenCalled();
		expect(requestResponse.activityType.typeText).toEqual('DRINK_WATER');
		expect(requestResponse.id).toBeTruthy();
	});
	test('saveNewActivityForUser rejects Activity Data and handles rejection without throwing error', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'post',
			resolvedData: {},
			resolved: false,
		});

		const requestResponse = async () =>
			await ActivityAPIService.saveNewActivityForUser(
				'DRINK_WATER',
				new Date()
			);

		expect(mockedCall).toHaveBeenCalled();
		expect(requestResponse).rejects;
	});

	test('getAllActivitiesForUserBetweenDates resolves Data from existing Activities and returns them', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'get',
			resolvedData: responseDataActivitiesInfo,
			resolved: true,
		});

		const requestResponse = await ActivityAPIService.getAllActivitiesForUserBetweenDates(
			new Date(),
			addWeeks(new Date(), 1)
		);

		expect(mockedCall).toHaveBeenCalled();
		expect(requestResponse.length).toEqual(4);
		expect(requestResponse[0].id).toBeTruthy();
	});
	test('getAllActivitiesForUserBetweenDates rejects Activity Data and handles rejection without throwing error', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'get',
			resolvedData: {},
			resolved: false,
		});

		const requestResponse = async () =>
			await ActivityAPIService.getAllActivitiesForUserBetweenDates(
				new Date(),
				addWeeks(new Date(), 1)
			);

		expect(mockedCall).toHaveBeenCalled();
		expect(requestResponse).rejects;
	});
});

//Test Data
const responseDataActivityInfo: ActivityResponse = {
	id: '6bd23324-53a4-4dd9-92ed-02d28e06a7b4',
	activityType: 'DRINK_WATER',
	creationDate: new Date().toString(),
	userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
};

const responseDataActivitiesInfo: ActivityResponse[] = [
	{
		id: '6bd23324-53a4-4dd9-92ed-02d28e06a7b4',
		activityType: 'DRINK_WATER',
		creationDate: new Date().toString(),
		userID: '8138ab00-1b29-41b1-a27f-b1354d47a94a',
	},
	{
		id: '6bd23324-53a4-4dd9-92ed-02d28e06a7b4',
		activityType: 'RUNNING',
		creationDate: new Date().toString(),
		userID: '8138ab00-1b29-41b2-a27f-b1354d47a94a',
	},
	{
		id: '6bd23324-53a4-4dd9-92ed-02d28e06a7b4',
		activityType: 'WALKING',
		creationDate: new Date().toString(),
		userID: '8138ab00-1b29-41b3-a27f-b1354d47a94a',
	},
	{
		id: '6bd23324-53a4-4dd9-92ed-02d28e06a7b4',
		activityType: 'SWIMMING',
		creationDate: new Date().toString(),
		userID: '8138ab00-1b29-41b9-a27f-b1354d47a94a',
	},
];
