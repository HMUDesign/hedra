/**
 * ES6-ified version of component-emitter
 * Original available at https://github.com/component/emitter
 */

export default class Emitter {
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	constructor() {
		this._emitters = {};
		this._subscribers = [];
	}
	
	/**
	 * Register a handler `fn`.
	 */
	
	then(fn, scope) {
		this._subscribers.push(fn.bind(scope || this));
		
		return this;
	}
	
	/**
	 * Return an emitter for the given `event`.
	 *
	 * @param {String} event
	 * @return {Emitter}
	 * @api public
	 */
	
	on(event) {
		if(!this._emitters[event]) {
			this._emitters[event] = new Emitter();
		}
		
		return this._emitters[event];
	}
	
	/**
	 * Remove the emitters for `event` or all events.
	 *
	 * @param {String} event
	 * @return {Emitter}
	 * @api public
	 */
	
	off(event) {
		// remove all emitters
		if(!event) {
			this._emitters = {};
			return this;
		}
		
		// remove all emitters for specific event
		else {
			delete this._emitters[event];
			return this;
		}
		
		return this;
	}
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	emit(...items) {
		this._subscribers.map((fn) => {
			fn.apply(this, items);
		});
		
		var event = items[0];
		if(typeof event === 'string') {
			items.shift();
			var emitter = this._emitters[event];
			
			if(emitter) {
				emitter.emit(...items);
			}
		}
		
		return this;
	}
	
	/**
	 * Check if this emitter has `event` emitters.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	has(event) {
		return !! this._emitters[event];
	}
}
