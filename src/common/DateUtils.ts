import { addDays, endOfWeek, startOfWeek } from 'date-fns';

export function dateToYMD(date: Date) {
	var d = date.getDate();
	var m = date.getMonth() + 1; //Month from 0 to 11
	var y = date.getFullYear();
	return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

export function calendarWeekForDate(date: Date) {
	date = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	);
	date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
	const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
	const weekNo = Math.ceil(
		((date.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7
	);
	return weekNo;
}

export function eachDayOfWeekForDate(date: Date): Date[] {
	let dayRange: Date[] = [];

	const firstDayOfWeek = startOfWeek(date, { weekStartsOn: 1 });
	const lastDayOfWeek = endOfWeek(date, { weekStartsOn: 1 });

	let currentDate = firstDayOfWeek;

	while (currentDate < lastDayOfWeek) {
		dayRange.push(currentDate);
		currentDate = addDays(currentDate, 1);
	}

	return dayRange;
}
