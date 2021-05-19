import {
	FaSwimmer,
	FaBiking,
	FaWalking,
	FaRunning,
	FaDumbbell,
} from 'react-icons/fa';
import { CgGlassAlt } from 'react-icons/cg';
import { VscError } from 'react-icons/vsc';

import { ActivityType } from '../domain/ActivityType';
import { Component } from 'react';
import { IconContext } from 'react-icons/lib';

class ActivityIcon extends Component<ActivityType> {
	private setIconForActivityType(activityType: ActivityType) {
		switch (activityType.typeText) {
			case 'DRINK_WATER':
				return <CgGlassAlt />;
			case 'WALKING':
				return <FaWalking />;
			case 'RUNNING':
				return <FaRunning />;
			case 'CYCLING':
				return <FaBiking />;
			case 'SWIMMING':
				return <FaSwimmer />;
			case 'CALISTHENICS':
				return <FaDumbbell />;

			default:
				return <VscError />;
		}
	}

	render() {
		return (
            <IconContext.Provider value={{ className: 'icon is-medium mt-2' }}>
                <div data-testid='activity_entry_icon'>
				    {this.setIconForActivityType(this.props)}
			    </div>
            </IconContext.Provider>
		);
	}
}

export default ActivityIcon;