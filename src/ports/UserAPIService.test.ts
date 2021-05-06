import UserAPIService from './UserAPIService';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import { User } from '../domain/User';
import mockHttpClientFunction from '../__mocks__/MockHttpClient';

describe('UserAPIService', () => {
	beforeAll(() => {
		//@ts-ignore
		global.localStorage = mockLocalStorage;
	});
	
	test('registerUser resolves user data and maps to User interface Object in response to post request with username and password', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'post',
			resolvedData: responseUserDataInfo,
			resolved: true,
		});

		let requestResponse = await UserAPIService.registerUser(
			'yupiel',
			'yeetyote'
		);

		expect(mockedCall).toHaveBeenCalled();
		expect(requestResponse.username).toEqual('yupiel');
		expect(requestResponse.creationDate.toString()).toEqual(
			new Date().toString()
		);
	});
	test('registerUser rejects user data and handles rejection without throwing error', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'post',
			resolvedData: {},
			resolved: false,
		});

		let requestResponse = async () => await UserAPIService.registerUser(
			'yupiel',
			'yeetyote'
		);

		expect(mockedCall).toHaveBeenCalled();
		expect(requestResponse).rejects;
	});

	test('loginUser authenticates user and resolves token', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'post',
			resolvedData: responseTokenDataInfo,
			resolved: true,
		});

		let response = await UserAPIService.loginUser('yupiel', 'yeetyote');

		expect(mockedCall).toHaveBeenCalled();
		expect(response.token).toEqual(
			'd4wa54d3a4da34dw3a4d3a4d3aw3.w4dwa4d35a4d53453a4dw33.4d53wa4da34d53a4d3a4da45d3a4dw35a'
		);
	});
	test('loginUser authenticates user and saves token to localstorage', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'post',
			resolvedData: responseTokenDataInfo,
			resolved: true,
		});

		await UserAPIService.loginUser('yupiel', 'yeetyote');

		expect(mockedCall).toHaveBeenCalled();
		expect(localStorage.getItem('accessToken')).toEqual(
			'd4wa54d3a4da34dw3a4d3a4d3aw3.w4dwa4d35a4d53453a4dw33.4d53wa4da34d53a4d3a4da45d3a4dw35a'
		);
	});
	test('loginUser does not authenticate user and handles data rejection', async () => {
		const mockedCall = mockHttpClientFunction({
			functionName: 'post',
			resolvedData: {},
			resolved: false,
		});

		let requestResponse = async () => await UserAPIService.loginUser(
			'yupiel',
			'yeetyote'
		);

		expect(mockedCall).toHaveBeenCalled();
		expect(requestResponse).rejects;
	});
});

//Test Data
const responseUserDataInfo: User = {
	id: '954d1f23-17a8-4331-82d6-c200fcc7f800',
	username: 'yupiel',
	score: '9999999999999999999999999999999999999999999999',
	creationDate: new Date(),
};

const responseTokenDataInfo: Object = {
	token:
		'd4wa54d3a4da34dw3a4d3a4d3aw3.w4dwa4d35a4d53453a4dw33.4d53wa4da34d53a4d3a4da45d3a4dw35a',
};
