import { getWeek } from 'date-fns';
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
			<div data-testid='challenge'>
				<img alt='challenge activity type'></img>
				<p>{this.props.activityType.typeDescription}</p>
				<p>
					{this.props.timesAWeekCurrent}/{this.props.timesAWeekGoal}
				</p>
				<p>
					Until CW
					{getWeek(this.props.expirationDate, { weekStartsOn: 1 })}
				</p>
			</div>
		);
	}
}

export default ChallengeSub;
