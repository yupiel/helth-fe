export interface User {
	readonly id: string;
	readonly username: string;
	readonly score: string;
	readonly creationDate: Date;
}

export interface UserResponse {
	readonly id: string;
	readonly username: string;
	readonly score: string;
	readonly creationDate: Date;
}

export function userFromUserResponseObject(user: UserResponse): User {
	return {
		id: user.id,
		username: user.username,
		score: user.score,
		creationDate: new Date(user.creationDate)
	} as User
}
