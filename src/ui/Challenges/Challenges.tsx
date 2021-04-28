import { getWeek, isSameWeek } from 'date-fns';
import React, { Component } from 'react';
import { eachCalendarWeekRangeInMonthForDate } from '../../common/DateUtils';
import { isBasicStateValueValid } from '../../common/ValueUtils';
import { Challenge } from '../../domain/Challenge';
import ChallengeSub from './ChallengesSub';
import ChallengeAPIService from '../../ports/ChallengeAPIService';
import ActivityTypes from '../../domain/ActivityType';
import { isAuthTokenValid } from '../../common/AuthUtils';
import { Redirect } from 'react-router-dom';

interface NewChallengeCreationValues {
	activityType: string;
	weeklyGoal: number;
	amountOfWeeks: number;
}

interface ChallengesComponentStates {
	currentDate: Date;
	coveredCalendarWeeks: number[];
	challenges: Challenge[];
	currentNewChallengeFormSelections: NewChallengeCreationValues;
	newChallengeDialogueButtonText: string;
	newChallengeDialogueVisible: boolean;
}

class Challenges extends Component<{}, ChallengesComponentStates> {
	constructor(props: {}) {
		super(props);

		this.state = {
			currentDate: new Date(),
			coveredCalendarWeeks: [],
			challenges: [],
			currentNewChallengeFormSelections: {
				activityType: '',
				weeklyGoal: 0,
				amountOfWeeks: 0,
			},
			newChallengeDialogueButtonText: '+',
			newChallengeDialogueVisible: false,
		};
	}

	componentDidMount() {
		if (isAuthTokenValid()) this.updateChallengesInState();
	}

	private updateChallengesInState() {
		const currentMonthsWeekStartsAndEnds = eachCalendarWeekRangeInMonthForDate(
			this.state.currentDate
		);

		ChallengeAPIService.getAllChallengesForUserBetweenDates(
			currentMonthsWeekStartsAndEnds[0].startingOfWeek,
			currentMonthsWeekStartsAndEnds[
				currentMonthsWeekStartsAndEnds.length - 1
			].endingOfWeek
		).then((challenges) => {
			this.setState({ challenges: challenges });
		});
	}

	private createStartWeekClustersForChallengesInMonthForStateCurrentDate() {
		return eachCalendarWeekRangeInMonthForDate(this.state.currentDate).map(
			(calendarWeekObject) => {
				const filtered = this.state.challenges.filter((challenge) =>
					isSameWeek(
						challenge.startDate,
						calendarWeekObject.startingOfWeek,
						{ weekStartsOn: 1 }
					)
				);

				if (filtered.length > 0) {
					console.log(`filtered`);
					console.log(filtered);
					return (
						<div
							className='row'
							data-testid='challenges_list_week'
							key={`calendar_week_${calendarWeekObject.calendarWeek.toString()}`}>
							<p className='subtitle is-6 mt-6'>{`Started in CW ${getWeek(
								filtered[0].startDate,
								{ weekStartsOn: 1 }
							)}`}</p>
							{filtered.map((challenge, index) => (
								<ChallengeSub
									{...challenge}
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

	private handleNewChallengeActivityTypeChange(
		event: React.ChangeEvent<HTMLSelectElement>
	) {
		this.setState({
			currentNewChallengeFormSelections: {
				activityType: event.target.value,
				weeklyGoal: this.state.currentNewChallengeFormSelections
					.weeklyGoal,
				amountOfWeeks: this.state.currentNewChallengeFormSelections
					.amountOfWeeks,
			},
		});
	}
	private handleNewChallengeWeeklyGoalChange(
		event: React.FormEvent<HTMLInputElement>
	) {
		this.setState({
			currentNewChallengeFormSelections: {
				activityType: this.state.currentNewChallengeFormSelections
					.activityType,
				weeklyGoal: Number(event.currentTarget.value),
				amountOfWeeks: this.state.currentNewChallengeFormSelections
					.amountOfWeeks,
			},
		});
	}
	private handleNewChallengeAmountOfWeeksChange(
		event: React.FormEvent<HTMLInputElement>
	) {
		this.setState({
			currentNewChallengeFormSelections: {
				activityType: this.state.currentNewChallengeFormSelections
					.activityType,
				weeklyGoal: this.state.currentNewChallengeFormSelections
					.weeklyGoal,
				amountOfWeeks: Number(event.currentTarget.value),
			},
		});
	}

	private createDropwDownOptionsForNewChallengeActivityTypes() {
		let returnOptions = [];
		for (const key in ActivityTypes) {
			returnOptions.push(
				<option
					key={`new_challenge_activity_type_${ActivityTypes[key].typeText}`}
					value={ActivityTypes[key].typeText}>
					{ActivityTypes[key].typeDescription}
				</option>
			);
		}

		return returnOptions;
	}

	private async handleSubmitNewChallengeCreationForm(
		event: React.FormEvent<HTMLFormElement>
	) {
		event.preventDefault();

		if (
			!isBasicStateValueValid(
				this.state.currentNewChallengeFormSelections.activityType
			) ||
			!isBasicStateValueValid(
				this.state.currentNewChallengeFormSelections.weeklyGoal
			) ||
			!isBasicStateValueValid(
				this.state.currentNewChallengeFormSelections.amountOfWeeks
			)
		) {
			return;
		}

		await ChallengeAPIService.saveNewChallengeForUser(
			this.state.currentNewChallengeFormSelections.activityType,
			this.state.currentNewChallengeFormSelections.weeklyGoal,
			this.state.currentNewChallengeFormSelections.amountOfWeeks
		);

		this.updateChallengesInState();
	}

	private handleShowNewChallengeDialogueButton(event: React.SyntheticEvent) {
		event.preventDefault();

		if (this.state.newChallengeDialogueVisible) {
			this.setState({
				newChallengeDialogueVisible: false,
				newChallengeDialogueButtonText: '+',
			});
		} else {
			this.setState({
				newChallengeDialogueVisible: true,
				newChallengeDialogueButtonText: 'x',
			});
		}
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
						data-testid='challenges_list'>
						<div className='level'>
							<p className='title is-1 level-left'>
								{this.state.currentDate.getFullYear()}
							</p>
							<button className='button level-right'>
								Filter
							</button>
						</div>
						<div className='rows'>
							{this.createStartWeekClustersForChallengesInMonthForStateCurrentDate()}
						</div>
					</div>
				</div>
				<div className='columns is-sticky is-bottom-right is-vcentered mr-3'>
					<div className='column is-three-quarters'></div>
					<div
						className={`column is-one-fifth ${
							this.state.newChallengeDialogueVisible
								? ''
								: 'is-invisible'
						}`}>
						<form
							className='box'
							onSubmit={this.handleSubmitNewChallengeCreationForm.bind(
								this
							)}>
							<p className='title is-5'>New Challenge</p>

							<div className='field'>
								<label
									className='label'
									htmlFor='new_challenge_activity_type'>
									Target Activity:
								</label>
								<div className='control select'>
									<select
										name='new_challenge_activity_type'
										defaultValue='DEFAULT'
										onChange={this.handleNewChallengeActivityTypeChange.bind(
											this
										)}>
										<option
											key='type_DEFAULT'
											value='DEFAULT'>
											Select an Activity Type...
										</option>
										{this.createDropwDownOptionsForNewChallengeActivityTypes()}
									</select>
								</div>
							</div>

							<div className='field'>
								<label
									className='label'
									htmlFor='new_challenge_weekly_goal'>
									Weekly Goal Amount:
								</label>
								<div className='control'>
									<input
										className='input mt-3'
										type='number'
										min='1'
										max='21'
										name='new_challenge_weekly_goal'
										placeholder='max. 21'
										required={true}
										onChange={this.handleNewChallengeWeeklyGoalChange.bind(
											this
										)}></input>
								</div>
							</div>

							<div className='field'>
								<label
									className='label'
									htmlFor='new_challenge_amount_of_weeks'>
									Amount of Weeks:
								</label>
								<div className='control'>
									<input
										className='input mt-3'
										type='number'
										min='1'
										name='new_challenge_amount_of_weeks'
										required={true}
										onChange={this.handleNewChallengeAmountOfWeeksChange.bind(
											this
										)}></input>
								</div>
							</div>
							
							<input
								className='button is-link mt-5'
								type='submit'
								value='Submit'></input>
						</form>
					</div>
					<div className='column is-1'>
						<button
							onClick={this.handleShowNewChallengeDialogueButton.bind(
								this
							)}
							className='button is-dark is-medium'>
							{this.state.newChallengeDialogueButtonText}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Challenges;
