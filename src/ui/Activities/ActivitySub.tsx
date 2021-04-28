import { Component } from 'react';
import { Activity } from '../../domain/Activity';
import { getIconForActivityType } from '../../common/IconUtils';

class ActivitySub extends Component<Activity> {
	render() {
		return (
			<div className='field row'>
				<div className='box level is-grouped' data-testid='activity'>
					<div className='level-left'>
						{getIconForActivityType(this.props.activityType)}
						
						<p className='title is-5 ml-3'>
							{this.props.activityType.typeDescriptionPast}
						</p>
						</div>
					<button className='level-right button is-danger'>-</button>
				</div>
			</div>
		);
	}
}

export default ActivitySub;
