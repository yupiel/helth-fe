import { isAfter } from 'date-fns';

interface JWTAccessTokenPayload {
	user_id: string;
	username: string;
	iat: string;
	exp: JWTDateTime;
}

interface JWTDateTime {
	date: JWTDate;
	time: JWTTime;
}
interface JWTDate {
	year: number;
	month: number;
	day: number;
}
interface JWTTime {
	hour: number;
	minute: number;
	second: number;
	nano: number;
}

export function isAuthTokenValid(): boolean {
	const authToken = localStorage.getItem('accessToken');

	if (authToken === undefined || authToken == null) return false; //no token found

	const splitToken = authToken.split('.');
	const decodedPayload = JSON.parse(
		atob(splitToken[1])
	) as JWTAccessTokenPayload;

	if (
		isAfter(
			new Date(),
			new Date(
				decodedPayload.exp.date.year,
				decodedPayload.exp.date.month,
				decodedPayload.exp.date.day,
				decodedPayload.exp.time.hour,
				decodedPayload.exp.time.minute
			)
		)
	) {
		localStorage.removeItem('accessToken');
		return false; //token has expired
	}

	return true; //token is valid
}
