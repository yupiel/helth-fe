import { format, getWeek, getYear, isSameDay } from 'date-fns';
import { Activity } from '../../domain/Activity';
import ActivitySub from './ActivitySub';
import ActivityAPIService from '../../ports/ActivityAPIService';
import { Component } from 'react';
import { eachDayOfWeekForDate } from '../../common/DateUtils';
import NewActivityDialogue from './NewActivityDialogue';
import Calendar from 'react-calendar';

interface ActivitiesComponentStates {
	currentDate: Date;
	activities: Activity[];
	calendarVisible: boolean;
}

class Activities extends Component<{}, ActivitiesComponentStates> {
	constructor(props: {}) {
		super(props);

		this.state = {
			currentDate: new Date(),
			activities: [],
			calendarVisible: false,
		};
	}

	componentDidMount() {
		this.updateActivitiesInState();
	}

	private updateActivitiesInState() {
		const eachDayOfWeekCurrent = eachDayOfWeekForDate(
			this.state.currentDate
		);

		ActivityAPIService.getAllActivitiesForUserBetweenDates(
			eachDayOfWeekCurrent[0],
			eachDayOfWeekCurrent[eachDayOfWeekCurrent.length - 1]
		).then((activities) => {
			this.setState({ activities: activities });
		});
	}

	private createDayClustersForActivitiesInWeekForStateCurrentDate() {
		return eachDayOfWeekForDate(this.state.currentDate).map(
			(weekDay, weekIndex) => {
				//map each day of the current week
				const filtered = this.state.activities.filter(
					//filter if one of the weekDays overlaps with a creationDate in the activity
					(act) => isSameDay(act.creationDate, weekDay)
				);

				if (filtered.length > 0) {
					//map each matching one to an ActivitSub component
					return (
						<div
							className='row'
							data-testid='activities_list_day'
							key={`week_day_${weekIndex.toString()}`}>
							<p className='subtitle is-6 mt-6'>{`${format(
								filtered[0].creationDate,
								'MMMM do',
								{ weekStartsOn: 1 }
							)}`}</p>
							{filtered.map((activity, filterIndex) => (
								<ActivitySub
									{...activity}
									key={`batch_no_${filterIndex.toString()}`}
								/>
							))}
						</div>
					);
				}
				return null;
			}
		);
	}

	private changeCurrentDate(newDateSelection: Date | Date[]) {
		if (Array.isArray(newDateSelection)) {
			this.setState({ currentDate: newDateSelection[0] });
			this.setState({ calendarVisible: false });
		} else {
			this.setState({ currentDate: newDateSelection });
			this.setState({ calendarVisible: false });
		}
	}

	private toggleCalendarVisibility(event: React.SyntheticEvent) {
		event.preventDefault();

		this.setState({ calendarVisible: !this.state.calendarVisible });
	}

	render() {
		return (
			<div className='is-fullpage'>
				<div className='columns is-centered'>
					<div
						className='column is-two-fifths'
						data-testid='activities_list'>
						<p className='title is-1'>
							{`${getYear(this.state.currentDate)}`}
						</p>
						<div className='is-flex is-flex-direction-row'>
							<button
								className='button is-justify-content-start'
								onClick={this.toggleCalendarVisibility.bind(this)}>
								{`CW ${getWeek(this.state.currentDate, {
									weekStartsOn: 1,
								})}`}
							</button>
							<Calendar
								className={`ml-6 calendar box is-justify-content-end ${
									this.state.calendarVisible
										? ''
										: 'is-hidden'
								}`}
								minDetail='year'
								showWeekNumbers={true}
								onChange={this.changeCurrentDate.bind(this)}
								value={this.state.currentDate}
							/>
						</div>
						<div className='rows'>
							{this.createDayClustersForActivitiesInWeekForStateCurrentDate()}
						</div>
					</div>
				</div>
				<NewActivityDialogue
					currentDate={this.state.currentDate}
					updateListFunction={this.updateActivitiesInState.bind(this)}
				/>
			</div>
		);
	}
}

export default Activities;
