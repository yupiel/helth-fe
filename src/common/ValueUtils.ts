export function isBasicStateValueValid(value: string | number) {
	if (value === undefined) return false;
	if (value === null) return false;
	if (String(value) === '') return false;
	if (String(value) === 'DEFAULT') return false;

	if (typeof value === 'number') {
		if (value === 0) return false;
	}

	return true;
}
