import { isSameDay, startOfWeek, addDays, endOfWeek } from 'date-fns';
import Activity from '../../domain/Activity';
import ActivitySub from './ActivitySub';
import ActivityAPIService from '../../ports/ActivityAPIService';
import { Component } from 'react';
import {
	calendarWeekForDate,
	eachDayOfWeekForDate,
} from '../../common/dateFormat';

interface ActivitiesComponentStates {
	currentDate: Date;
	activities: Activity[];
}

class Activities extends Component<{}, ActivitiesComponentStates> {
	constructor(props: {}) {
		super(props);

		this.state = {
			currentDate: new Date(),
			activities: [],
		};
	}

	componentDidMount() {
		const eachDayOfWeekCurrent = eachDayOfWeekForDate(
			this.state.currentDate
		);
		ActivityAPIService.getAllActivitiesForUserBetweenDates(
			eachDayOfWeekCurrent[0],
			eachDayOfWeekCurrent[eachDayOfWeekCurrent.length - 1]
		).then((activities) => {
			this.setState({ activities: activities });
			console.log(this.state.activities);
		});
	}

	private buttonHandler() {
		const eachDayOfWeekCurrent = eachDayOfWeekForDate(
			this.state.currentDate
		);
		ActivityAPIService.getAllActivitiesForUserBetweenDates(
			eachDayOfWeekCurrent[0],
			eachDayOfWeekCurrent[eachDayOfWeekCurrent.length - 1]
		).then((activities) => {
			this.setState({ activities: activities });
			console.log(this.state.activities);
		});
	}

	private createDayClustersForActivitiesInWeekForStateCurrentDate() {
		return eachDayOfWeekForDate(this.state.currentDate).map(
			(weekDay, index) => {
				//map each day of the current week
				const filtered = this.state.activities.filter(
					//filter if one of the weekDays overlaps with a creationDate in the activity
					(act) => isSameDay(act.creationDate, weekDay)
				);

				if (filtered.length > 0) {
					//map each matching one to an ActivitSub component
					return (
						<div
							data-testid='activities_list_day'
							key={`week_day_${index.toString()}`}>
							{filtered.map((activity, index) => (
								<ActivitySub
									{...activity}
									key={`batch_no_${index.toString()}`}
								/>
							))}
						</div>
					);
				}
				return null;
			}
		);
	}

	render() {
		return (
			<div data-testid='activities_list'>
				<button onClick={this.buttonHandler.bind(this)}></button>
				<p>CW {calendarWeekForDate(this.state.currentDate)}</p>
				{this.createDayClustersForActivitiesInWeekForStateCurrentDate()}
			</div>
		);
	}
}

export default Activities;
