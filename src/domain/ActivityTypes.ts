interface ActivityType {
	readonly typeText: string;
	readonly typeDescription: string;
	readonly typeDescriptionPast: string;
}

const ActivityTypes: { readonly [key: string]: ActivityType } = {
	DRINK_WATER: {
		typeText: 'DRINK_WATER',
		typeDescription: 'Drink Water',
		typeDescriptionPast: 'Drank Water',
	},
	WALKING: {
		typeText: 'WALKING',
		typeDescription: 'Walking',
		typeDescriptionPast: 'Walked',
	},
	RUNNING: {
		typeText: 'RUNNING',
		typeDescription: 'Running',
		typeDescriptionPast: 'Ran',
	},
	CYCLING: {
		typeText: 'CYCLING',
		typeDescription: 'Cycling',
		typeDescriptionPast: 'Cycled',
	},
	SWIMMING: {
		typeText: 'SWIMMING',
		typeDescription: 'Swimming',
		typeDescriptionPast: 'Swam',
	},
	CALISTHENICS: {
		typeText: 'CALISTHENICS',
		typeDescription: 'Calisthenics',
		typeDescriptionPast: 'Done Calisthenics',
	},
};

export default ActivityTypes