import { isSameWeek } from 'date-fns';
import { Component } from 'react';
import { eachCalendarWeekRangeInMonthForDate } from '../../common/DateUtils';
import { Challenge } from '../../domain/Challenge';
import ChallengeSub from './ChallengesSub';
import ChallengeAPIService from '../../ports/ChallengeAPIService';

interface ChallengesComponentStates {
	currentDate: Date;
	coveredCalendarWeeks: number[];
	challenges: Challenge[];
	currentNewChallengeFormSelection: string;
}

class Challenges extends Component<{}, ChallengesComponentStates> {
	constructor(props: {}) {
		super(props);

		this.state = {
			currentDate: new Date(),
			coveredCalendarWeeks: [],
			challenges: [],
			currentNewChallengeFormSelection: '',
		};
	}

	componentDidMount() {
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
							data-testid='challenges_list_week'
							key={`calendar_week_${calendarWeekObject.calendarWeek.toString()}`}>
							{filtered.map((challenge, index) => (
								<ChallengeSub
									{...challenge}
									key={`bath_no_${index.toString()}`}
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
			<div data-testid='challenges_list'>
				<p>{this.state.currentDate.getFullYear()}</p>
				<button>Filter</button>
				{this.createStartWeekClustersForChallengesInMonthForStateCurrentDate()}
			</div>
		);
	}
}

export default Challenges;
