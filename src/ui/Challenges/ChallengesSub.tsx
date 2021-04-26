import { differenceInCalendarWeeks, getWeek } from 'date-fns';
import { Component } from 'react';
import { Challenge } from '../../domain/Challenge';

class ChallengeSub extends Component<Challenge> {
	private getColorCSSClassForChallengeStatus(
		challengeStatus: string
	): string {
		switch (challengeStatus) {
			case 'IN_PROGRESS':
				return 'in_progress';
			case 'SUCCEEDED':
				return 'succeeded';
			case 'FAILED':
				return 'failed';
			default:
				return 'ERROR';
		}
	}

	render() {
		return (
			<div className='field row'>
				<div className='box is-grouped level' data-testid='challenge'>
					<div className='level-left'>
						<img alt='challenge activity type'></img>
						<p className='title is-5'>{this.props.activityType.typeDescription}</p>
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
