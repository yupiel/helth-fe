import React, { Component } from 'react';
import ActivityTypes from '../../domain/ActivityType';
import { isBasicStateValueValid } from '../../common/ValueUtils';
import ChallengeAPIService from '../../ports/ChallengeAPIService';

interface NewChallengeDialogueProps {
	updateListFunction: () => void;
}

interface NewChallengeCreationValues {
	activityType: string;
	weeklyGoal: number;
	amountOfWeeks: number;
}

interface NewChallengeDialogueStates {
	currentNewChallengeFormSelections: NewChallengeCreationValues;
	newChallengeDialogueButtonText: string;
	newChallengeDialogueVisible: boolean;
}

class NewChallengeDialogue extends Component<
	NewChallengeDialogueProps,
	NewChallengeDialogueStates
> {
	state = {
		currentNewChallengeFormSelections: {
			activityType: '',
			weeklyGoal: 0,
			amountOfWeeks: 0,
		},
		newChallengeDialogueButtonText: '+',
		newChallengeDialogueVisible: false,
	};

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
					value={ActivityTypes[key].typeText}
					data-testid='challenge_add_dialogue_type_dropdown_option'>
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

		this.props.updateListFunction();
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
		return (
			<div className='is-flex is-position-fixed-bottom-right is-justify-content-flex-end is-flex-direction-row'>
				<div
					className={`is-align-self-flex-end mb-5 ${
						this.state.newChallengeDialogueVisible
							? ''
							: 'is-invisible'
					}`}>
					<form
						className='box'
						onSubmit={this.handleSubmitNewChallengeCreationForm.bind(
							this
						)}
						data-testid='challenge_add_dialogue'>
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
									)}
									data-testid='challenge_add_dialogue_type_dropdown'
									data-cy='challenge-add-dialogue-type'>
									<option
										key='type_DEFAULT'
										value='DEFAULT'
										data-testid='challenge_add_dialogue_type_dropdown_option'>
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
									data-testid='challenge_add_dialogue_weekly_goal'
									data-cy='challenge-add-dialogue-goal'
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
									data-testid='challenge_add_dialogue_week_amount'
									data-cy='challenge-add-dialogue-weeks'
									required={true}
									onChange={this.handleNewChallengeAmountOfWeeksChange.bind(
										this
									)}></input>
							</div>
						</div>

						<input
							className='button is-link mt-5'
							data-testid='challenge_add_dialogue_submit_button'
							data-cy='challenge-add-dialogue-submit'
							type='submit'
							value='Submit'></input>
					</form>
				</div>

				<div className='is-align-self-flex-end mb-5 ml-5 mr-5'>
					<button
						onClick={this.handleShowNewChallengeDialogueButton.bind(
							this
						)}
						className='button is-dark is-medium'
						data-testid='challenge_add_button'
						data-cy='new-challenge-dialogue-add'>
						{this.state.newChallengeDialogueButtonText}
					</button>
				</div>
			</div>
		);
	}
}

export default NewChallengeDialogue;
