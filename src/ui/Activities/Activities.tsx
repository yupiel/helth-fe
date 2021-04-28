import { format, getWeek, getYear, isSameDay } from 'date-fns';
import { Activity } from '../../domain/Activity';
import ActivitySub from './ActivitySub';
import ActivityAPIService from '../../ports/ActivityAPIService';
import { Component } from 'react';
import { eachDayOfWeekForDate } from '../../common/DateUtils';
import { isAuthTokenValid } from '../../common/AuthUtils';
import { Redirect } from 'react-router';
import NewActivityDialogue from './NewActivityDialogue';

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
		if (isAuthTokenValid()) this.updateActivitiesInState();
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
							className='row'
							data-testid='activities_list_day'
							key={`week_day_${index.toString()}`}>
							<p className='subtitle is-6 mt-6'>{`${format(
								filtered[0].creationDate,
								'MMMM do',
								{ weekStartsOn: 1 }
							)}`}</p>
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
		if (!isAuthTokenValid()) {
			return <Redirect to='/login' />;
		}
		return (
			<div className='is-fullpage'>
				<div className='columns is-centered'>
					<div
						className='column is-two-fifths'
						data-testid='activities_list'>
						<p className='title is-1'>
							{`${getYear(this.state.currentDate)}`}
						</p>
						<p className='subtitle'>
							{`CW ${getWeek(this.state.currentDate, {
								weekStartsOn: 1,
							})}`}
						</p>
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
