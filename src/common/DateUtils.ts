import {
	addDays,
	addWeeks,
	endOfMonth,
	endOfWeek,
	getWeek,
	isBefore,
	startOfMonth,
	startOfWeek,
} from 'date-fns';

export function dateToYMD(date: Date) {
	var d = date.getDate();
	var m = date.getMonth() + 1; //Month from 0 to 11
	var y = date.getFullYear();
	return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
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

interface CalendarWeekStartEnd {
	readonly calendarWeek: number;
	readonly startingOfWeek: Date;
	readonly endingOfWeek: Date;
}

export function eachCalendarWeekRangeInMonthForDate(
	date: Date
): CalendarWeekStartEnd[] {
	let currentDate = startOfMonth(date);
	const endDate = endOfMonth(date);

	let returnValue: CalendarWeekStartEnd[] = [];

	while (isBefore(currentDate, endDate)) {
		returnValue.push({
			calendarWeek: getWeek(currentDate, { weekStartsOn: 1 }),
			startingOfWeek: startOfWeek(currentDate, { weekStartsOn: 1 }),
			endingOfWeek: endOfWeek(currentDate, { weekStartsOn: 1 }),
		});

		currentDate = addWeeks(currentDate, 1);
	}

	return returnValue;
}
