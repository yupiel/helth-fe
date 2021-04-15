import { Component } from 'react';
import { Activity } from '../../domain/Activity';

class ActivitySub extends Component<Activity> {
	render() {
		return (
			<div data-testid='activity'>
				<img alt='activity type image'></img>
				<p>{this.props.activityType.typeDescriptionPast}</p>
				<button></button>
			</div>
		);
	}
}

export default ActivitySub;
