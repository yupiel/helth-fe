import HttpClient from '../ports/HttpClient';
import { AxiosResponse } from 'axios';

type MockHttpClientFunctionParameters = {
	functionName: 'get' | 'post' | 'delete';
	resolvedData: Object;
	resolved: boolean;
};

export default function mockHttpClientFunction(params: MockHttpClientFunctionParameters) {
	return jest
		.spyOn(HttpClient, params.functionName)
		.mockImplementation(() =>
			mockResponse(params.resolvedData, params.resolved)
		);
}

function mockResponse(resolvedData: Object, resolved: boolean = true) {
	if (resolved)
		return Promise.resolve(createMockAxiosResponse(resolvedData, 200));
	else return Promise.reject(createMockAxiosResponse(resolvedData, 500));
}

function createMockAxiosResponse(resolvedData: Object, statusCode: number) {
	return {
		data: resolvedData,
		status: statusCode,
		statusText: '',
		headers: {},
		config: {},
	} as AxiosResponse<any>;
}
