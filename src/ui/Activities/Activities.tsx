import { format, getWeek, getYear, isSameDay } from 'date-fns';
import { Activity } from '../../domain/Activity';
import ActivityTypes from '../../domain/ActivityType';
import ActivitySub from './ActivitySub';
import ActivityAPIService from '../../ports/ActivityAPIService';
import React, { Component } from 'react';
import { eachDayOfWeekForDate } from '../../common/DateUtils';
import { isBasicStateValueValid } from '../../common/ValueUtils';
import { isAuthTokenValid } from '../../common/AuthUtils';
import { Redirect } from 'react-router';

interface ActivitiesComponentStates {
	currentDate: Date;
	activities: Activity[];
	currentNewActivityFormSelection: string;
}

class Activities extends Component<{}, ActivitiesComponentStates> {
	constructor(props: {}) {
		super(props);

		this.state = {
			currentDate: new Date(),
			activities: [],
			currentNewActivityFormSelection: '',
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

	private createDropdownOptionsForActivityTypes() {
		let returnOptions = [];
		for (const key in ActivityTypes) {
			returnOptions.push(
				<option
					key={`type_${ActivityTypes[key].typeText}`}
					value={ActivityTypes[key].typeText}>
					{ActivityTypes[key].typeDescription}
				</option>
			);
		}

		return returnOptions;
	}

	private handleSelectDropDownChange(
		event: React.ChangeEvent<HTMLSelectElement>
	) {
		this.setState({
			currentNewActivityFormSelection: event.target.value,
		});
	}

	private async handleCreateNewActivityButton(
		event: React.FormEvent<HTMLFormElement>
	) {
		event.preventDefault();

		if (
			!isBasicStateValueValid(this.state.currentNewActivityFormSelection)
		) {
			return;
		}

		await ActivityAPIService.saveNewActivityForUser(
			this.state.currentNewActivityFormSelection,
			this.state.currentDate
		);

		this.updateActivitiesInState();
	}

	render() {
		if (!isAuthTokenValid()) {
			return <Redirect to='/login' />;
		}
		return (
			<div>
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
				<div className='columns'>
					<div className='column is-three-quarters'></div>
					<div className='column is-one-fifth'>
						<form
							className='box field'
							onSubmit={this.handleCreateNewActivityButton.bind(
								this
							)}>
							<label className='label' htmlFor='activity_type'>
								Add New Activity
							</label>
							<select
								className='select control'
								name='activity_type'
								onChange={this.handleSelectDropDownChange.bind(
									this
								)}
								defaultValue='DEFAULT'>
								<option key='type_DEFAULT' value='DEFAULT'>
									Select an activity type...
								</option>
								{this.createDropdownOptionsForActivityTypes()}
							</select>
							<input
								className='button is-link control ml-5'
								type='submit'
								value='Submit'></input>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Activities;
