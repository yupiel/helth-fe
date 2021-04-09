import { LocalDate } from '@js-joda/core';

interface User {
	readonly id: string;
	readonly username: string;
	readonly score: string;
	readonly creationDate: LocalDate;
}

export default User;
