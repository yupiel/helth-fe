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

export function getIconForActivityType(activityType: ActivityType) {
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
			return <FaDumbbell className='icon is-medium' />;

		default:
			return <VscError />;
	}
}
