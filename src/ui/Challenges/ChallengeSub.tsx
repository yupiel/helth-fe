import { differenceInCalendarWeeks, getWeek } from 'date-fns';
import { Component } from 'react';
import { Challenge } from '../../domain/Challenge';
import ActivityIcon from '../ActivityIcon';

class ChallengeSub extends Component<Challenge> {
	private getColorCSSClassForChallengeStatus(): string {
		try {
			switch (this.props.challengeStatus.statusText) {
				case 'SUCCEEDED':
					return 'has-background-success-light';
				case 'FAILED':
					return 'has-background-danger-light';

				default:
					return '';
			}
		} catch (error) {
			return 'has-background-danger-dark';
		}
	}

	render() {
		return (
			<div className='field row'>
				<div
					className={`box is-grouped level ${this.getColorCSSClassForChallengeStatus()}`}
					data-testid='challenge_entry'
					data-cy='challenge-entry'>
					<div className='level-left'>
						<ActivityIcon {...this.props.activityType} />
						<p
							className='title is-5 ml-3'
							data-testid='challenge_entry_activity_type'>
							{this.props.activityType.typeDescription}
						</p>
					</div>
					<div className='level-right level-item'>
						<div>
							<p className='subtitle is-6'>
								{this.props.timesAWeekCurrent}/
								{differenceInCalendarWeeks(
									this.props.expirationDate,
									this.props.startDate,
									{ weekStartsOn: 1 }
								) * this.props.timesAWeekGoal}
							</p>
							<p className='subtitle is-6'>
								Until CW
								{getWeek(this.props.expirationDate, {
									weekStartsOn: 1,
								})}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ChallengeSub;
