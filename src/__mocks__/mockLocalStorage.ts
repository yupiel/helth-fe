class mockLocalStorage {
	private store: { [key: string]: string } = {};

	public length = Object.keys(this.store).length;

	clear() {
		this.store = {};
	}

	getItem(key: string) {
		return this.store[key] || null;
	}

	key(index: number) {
		return Object.keys(this.store)[index];
	}

	setItem(key: string, value: string) {
		this.store[key] = String(value);
	}

	removeItem(key: string) {
		delete this.store[key];
	}
}

export default mockLocalStorage;
