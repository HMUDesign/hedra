export default class Handlers {
	constructor() {
		this._handlers = new Set();
	}

	add(handler) {
		if (typeof handler === 'function') {
			this._handlers.add(handler);
		}
	}

	delete(handler) {
		if (typeof handler === 'function') {
			this._handlers.delete(handler);
		}
	}

	run(event) {
		for (const handler of this._handlers) {
			handler(event);
		}
	}
}
