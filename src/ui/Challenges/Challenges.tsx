import { getWeek, isSameWeek } from 'date-fns';
import { Component } from 'react';
import { eachCalendarWeekRangeInMonthForDate } from '../../common/DateUtils';
import { Challenge } from '../../domain/Challenge';
import ChallengeSub from './ChallengeSub';
import NewChallengeDialogue from './NewChallengeDialogue';
import ChallengeAPIService from '../../ports/ChallengeAPIService';

interface ChallengesComponentStates {
	currentDate: Date;
	coveredCalendarWeeks: number[];
	challenges: Challenge[];
}

class Challenges extends Component<
	{ currentDate?: Date | undefined },
	ChallengesComponentStates
> {
	constructor(props: { currentDate?: Date | undefined }) {
		super(props);

		this.state = {
			currentDate: new Date(),
			coveredCalendarWeeks: [],
			challenges: [],
		};
	}

	componentDidMount() {
		if (this.props.currentDate)
			this.setState({ currentDate: this.props.currentDate });

		this.updateChallengesInState();
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

	render() {
		return (
			<div className='is-fullpage'>
				<div className='columns is-centered'>
					<div
						className='column is-two-fifths'
						data-testid='challenges_list'
						data-cy='challenges-list'>
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
				<NewChallengeDialogue
					updateListFunction={this.updateChallengesInState.bind(this)}
				/>
			</div>
		);
	}
}

export default Challenges;
