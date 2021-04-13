import { isSameDay, startOfWeek } from 'date-fns';
import { addDays, endOfWeek } from 'date-fns/esm';
import Activity from '../../domain/Activity';
import ActivitySub from './ActivitySub';
import ActivityAPIService from '../../ports/ActivityAPIService';
import { Component } from 'react';
import * as joda from '@js-joda/core'

interface ActivitiesComponentStates {
	currentDate: Date,
	activities: Activity[]
}

class Activities extends Component<{}, ActivitiesComponentStates> {
	constructor(props: {}){
		super(props);

		this.state = {
			currentDate: new Date(),
			activities: [],
		}
	}

	getCalendarWeekForDate(date: Date) {
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

	getEachDayOfWeekForDate(date: Date): Date[] {
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

	componentDidMount(){
		ActivityAPIService.getAllActivitiesForUser().then((activities) => {
			this.setState({ activities: activities });
			console.log(this.state.activities);
		});
	}

	private buttonHandler() {
		ActivityAPIService.getAllActivitiesForUser().then((activities) => {
			this.setState({ activities: activities });
			console.log(this.state.activities);
		});
	} //TODO add state handling for activities

	render() {
		return (
			<div>
				<button onClick={this.buttonHandler.bind(this)}></button>
				{this.getEachDayOfWeekForDate(this.state.currentDate).map(
					(weekDay) => {
						const filtered = this.state.activities.filter((act) =>
							isSameDay(act.creationDate, weekDay)
						);
						console.log("rending")
						console.log(filtered.length)
						console.log(weekDay.toString())
						this.state.activities.filter((act) => {
							console.log(act.creationDate.toString())
						})

						if (filtered.length > 0) {
							return (
								<div>
									{filtered.map((activity) => (
										<ActivitySub {...activity} />
									))}
								</div>
							);
						}
					}
				)}
			</div>
		);
	}
}

export default Activities;
