import { differenceInCalendarWeeks, getWeek } from 'date-fns';
import { Component } from 'react';
import { Challenge } from '../../domain/Challenge';
import ActivityIcon from '../ActivityIcon'

class ChallengeSub extends Component<Challenge> {
	private getColorCSSClassForChallengeStatus(
		challengeStatus: string
	): string {
		switch (challengeStatus) {
			case 'IN_PROGRESS':
				return '';
			case 'SUCCEEDED':
				return 'has-background-success-light';
			case 'FAILED':
				return 'has-background-danger-light';

			default:
				return 'has-background-danger-dark';
		}
	}

	render() {
		return (
			<div className='field row'>
				<div
					className={`box is-grouped level ${this.getColorCSSClassForChallengeStatus(
						this.props.challengeStatus.statusText
					)}`}
					data-testid='challenge'>
					<div className='level-left'>
						<ActivityIcon {...this.props.activityType} />
						<p className='title is-5 ml-3'>
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
