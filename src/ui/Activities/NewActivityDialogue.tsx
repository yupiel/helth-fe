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
			<div className='level is-floating-bottom-right mr-6'>
				<div
					className={`level-right mb-3 ${
						this.state.newActivityDialogueVisible
							? ''
							: 'is-invisible'
					}`}>
					<form
						className='box'
						onSubmit={this.handleCreateNewActivityButton.bind(
							this
						)}>
						<p className='title is-5'>New Activity</p>
						<div className='control select'>
							<select
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
						</div>
						<input
							className='button is-link'
							type='submit'
							value='Submit'></input>
					</form>
				</div>

				<div className='level-right ml-5'>
					<button
						onClick={this.handleShowNewActivityDialogueButton.bind(
							this
						)}
						className='button is-dark is-medium'>
						{this.state.newActivityDialogueButtonText}
					</button>
				</div>
			</div>
		);
	}
}

export default NewActivityDialogue;
