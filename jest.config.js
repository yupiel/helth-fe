module.exports = {
	roots: ['<rootDir>/src'],
	coveragePathIgnorePatterns: ['/node_modules/'],
	testMatch: [
		'**/__tests__/**/*.+(ts|tsx|js)',
		'**/?(*.)+(spec|test).+(ts|tsx|js)',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testResultsProcessor: 'jest-sonar-reporter'
};
