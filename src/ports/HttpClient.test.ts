import axios, { AxiosResponse } from 'axios';
import { ActivityResponse } from '../domain/Activity';
import HttpClient from './HttpClient';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

describe('HttpClient', () => {
	beforeAll(() => {
		//@ts-ignore
		global.localStorage = mockLocalStorage;
	});
	beforeEach(() => {
		global.localStorage.clear();
	});

	test('post request without auth should be successful and return AxiosResponse object', async () => {
		const mockedCall = axios_postReturns(responseDataActivityResponseInfo);

		const response = await HttpClient.post('path', false, {});

		expect(mockedCall).toHaveBeenCalled();
		expect(response.status).toEqual(200);
		expect(response.data).toBeTruthy();
	});
	test('post request with auth should be successful and return AxiosResponse object', async () => {
		const mockedCall = axios_postReturns(responseDataActivityResponseInfo);
		localStorage.setItem('accessToken', 'accessTokenValue');

		const response = await HttpClient.post('path', true, {});

		expect(mockedCall).toHaveBeenCalled();
		expect(response.status).toEqual(200);
		expect(response.data).toBeTruthy();
	});
	test('post request with auth should not find auth token and reject', async () => {
		axios_postReturns(responseDataActivityResponseInfo);

		const postFunction = async () =>
			await HttpClient.post('path', true, {});

		expect(postFunction).rejects;
	});
});

function axios_postReturns(responseData: Object) {
	const mockAxiosResponse: AxiosResponse<any> = {
		data: responseData,
		status: 200,
		statusText: '',
		headers: {},
		config: {},
	};

	return jest
		.spyOn(axios, 'post')
		.mockImplementation(() => Promise.resolve(mockAxiosResponse));
}

//Test Data
const responseDataActivityResponseInfo: ActivityResponse = {
	id: '6bd23324-54a3-4dd9-92ed-02d28e06a7b4',
	activityType: 'DRINK_WATER',
	creationDate: new Date().toString(),
	userID: '8138ab00-1b29-41b8-a27f-b1354d47a94a',
};
