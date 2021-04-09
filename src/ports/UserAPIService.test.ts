import UserAPIService from './UserAPIService';
import { LocalDate } from '@js-joda/core';
import mockAxios from 'axios';
import User from '../domain/User';

jest.mock("axios")

describe('UserAPIService', () => {
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
});
