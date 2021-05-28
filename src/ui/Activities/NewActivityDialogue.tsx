import React, { Component } from 'react';
import ActivityAPIService from '../../ports/ActivityAPIService';
import { ActivityTypes } from '../../domain/ActivityType';
import { isBasicStateValueValid } from '../../common/ValueUtils';

interface NewActivityDialogueProps {
	currentDate: Date;
	updateListFunction: () => void;
}

class NewActivityDialogue extends Component<NewActivityDialogueProps> {
	state = {
		currentNewActivityFormSelection: '',
		newActivityDialogueButtonText: '+',
		newActivityDialogueVisible: false,
	};

	private createDropdownOptionsForActivityTypes() {
		let returnOptions = [];
		for (const key in ActivityTypes) {
			returnOptions.push(
				<option
					key={`type_${ActivityTypes[key].typeText}`}
					data-testid='activity_add_dialogue_type_dropdown_option'
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
			this.props.currentDate
		);

		this.props.updateListFunction();
	}

	private handleShowNewActivityDialogueButton(event: React.SyntheticEvent) {
		event.preventDefault();

		if (this.state.newActivityDialogueVisible) {
			this.setState({
				newActivityDialogueVisible: false,
				newActivityDialogueButtonText: '+',
			});
		} else {
			this.setState({
				newActivityDialogueVisible: true,
				newActivityDialogueButtonText: 'x',
			});
		}
	}

	render() {
		return (
			<div className='is-flex is-position-fixed-bottom-right is-justify-content-flex-end is-flex-direction-row'>
				<div
					data-testid='activity_add_flexparent'
					className={`is-align-self-flex-end mb-5 ${
						this.state.newActivityDialogueVisible
							? ''
							: 'is-invisible'
					}`}>
					<form
						className='box'
						data-testid='activity_add_dialogue'
						onSubmit={this.handleCreateNewActivityButton.bind(
							this
						)}>
						<p className='title is-5'>New Activity</p>
						<div className='control select'>
							<select
								name='activity_type'
								data-testid='activity_add_dialogue_type_dropdown'
								data-cy='new-activity-dialogue-type'
								onChange={this.handleSelectDropDownChange.bind(
									this
								)}
								defaultValue='DEFAULT'>
								<option
									data-testid='activity_add_dialogue_type_dropdown_option'
									key='type_DEFAULT'
									value='DEFAULT'>
									Select an activity type...
								</option>
								{this.createDropdownOptionsForActivityTypes()}
							</select>
						</div>
						<input
							className='button is-link'
							data-testid='activity_add_dialogue_submit_button'
							data-cy='new-activity-dialogue-submit'
							type='submit'
							value='Submit'></input>
					</form>
				</div>
				<button
					onClick={this.handleShowNewActivityDialogueButton.bind(
						this
					)}
					data-testid='activity_add_button'
					data-cy='new-activity-dialogue-add'
					className='button is-dark is-medium is-align-self-flex-end mb-5 mr-5 ml-5'>
					{this.state.newActivityDialogueButtonText}
				</button>
			</div>
		);
	}
}

export default NewActivityDialogue;
