import Bootstrap from '../bootstrap';

import HedraApp from '../../app';
import Mouse from '../../plugins/mouse';

var assert = require('chai').assert;

describe('Mouse Plugin', () => {
	it('should be a function', () => {
		assert.isFunction(Mouse);
	});
	
	let app = new HedraApp({ parent: Bootstrap.parent });
	
	describe('when Used', () => {
		it('should ...'/*, () => {
			assert.isObject(app.camera);
		}*/);
	});
});
