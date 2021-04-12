import UserAPIService from './UserAPIService';
import { LocalDate } from '@js-joda/core';
import mockAxios from 'axios';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import User from '../domain/User';

jest.mock("axios")

describe('UserAPIService', () => {

	beforeAll(() => {
		//@ts-ignore
		global.localStorage = mockLocalStorage
	});

	test('registerUser gets user data and maps to User interface Object in response to post request with username and password', async () => {
		const responseData : User = {
            id : '954d1f23-17a8-4331-82d6-c200fcc7f800',
            username : 'yupiel',
            score : '9999999999999999999999999999999999999999999999',
            creationDate : LocalDate.now()
        }

		//@ts-ignore
		mockAxios.post.mockResolvedValue({ data: responseData })

		let requestResponse = await UserAPIService.registerUser(
			'yupiel',
			'yeetyote'
		);

		expect(requestResponse.username).toEqual('yupiel');
		expect(requestResponse.creationDate.toString()).toEqual(
			LocalDate.now().toString()
		);
	});

	test('loginUser authenticates user and returns token', async () => {
		const responseData: Object = {
			token: 'd4wa54d3a4da34dw3a4d3a4d3aw3.w4dwa4d35a4d53453a4dw33.4d53wa4da34d53a4d3a4da45d3a4dw35a'
		}

		let mockLocalStorage = {}

		//@ts-ignore
		mockAxios.post.mockResolvedValue({data: responseData})

		let response = await UserAPIService.loginUser(
			'yupiel', 
			'yeetyote'
		);
		console.dir(localStorage)
		expect(localStorage.getItem('accessToken')).toEqual('d4wa54d3a4da34dw3a4d3a4d3aw3.w4dwa4d35a4d53453a4dw33.4d53wa4da34d53a4d3a4da45d3a4dw35a')
	});
});
