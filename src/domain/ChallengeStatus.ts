export interface ChallengeStatus {
	readonly statusText: string;
	readonly statusDescription: string;
}

export const ChallengeStatuses: { readonly [key: string]: ChallengeStatus } = {
	IN_PROGRESS: {
		statusText: 'IN_PROGRESS',
		statusDescription: 'In Progress'
	},
	SUCCEEDED: {
		statusText: 'SUCCEDED',
		statusDescription: 'SUCCEEDED'
	},
	FAILED: {
		statusText: 'FAILED',
		statusDescription: 'FAILED'
	},
};
