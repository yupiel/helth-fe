import { Component } from 'react';
import Activity from '../../domain/Activity';

class ActivitySub extends Component<Activity> {
	render() {
		return (
			<div data-testid='activity'>
				<img></img>
				<p>{this.props.activityType}</p>
				<button></button>
			</div>
		);
	}
}

export default ActivitySub;
