import { Component } from 'react';
import { Activity } from '../../domain/Activity';
import ActivityIcon from '../ActivityIcon';

class ActivitySub extends Component<Activity> {
	render() {
		return (
			<div className='field row' data-testid='activity_entry'>
				<div className='box level is-grouped'>
					<div className='level-left'>
						<ActivityIcon {...this.props.activityType} />
						
						<p className='title is-5 ml-3' data-testid='activity_entry_type'>
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
