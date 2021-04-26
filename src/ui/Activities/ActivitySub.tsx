import { Component } from 'react';
import { Activity } from '../../domain/Activity';

class ActivitySub extends Component<Activity> {
	render() {
		return (
			<div className='field row'>
				<div className='box level is-grouped' data-testid='activity'>
					<div className='level-left'>
						<img alt='activity type'></img>
						<p className='title is-5'>
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
