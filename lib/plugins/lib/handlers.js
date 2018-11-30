export default class Handlers {
	constructor() {
		this._handlers = new Set();
	}

	add(handler) {
		if (typeof handler === 'function') {
			this._handlers.add(handler);
		}
	}

	remove(handler) {
		if (typeof handler === 'function') {
			this._handlers.remove(handler);
		}
	}

	run(event) {
		for (const handler of this._handlers) {
			handler(event);
		}
	}
}
