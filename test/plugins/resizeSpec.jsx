import Bootstrap from '../bootstrap';

import HedraApp from '../../app';
import Resize from '../../plugins/resize';

var assert = require('chai').assert;

describe('Resize Plugin', () => {
	it('should be a function', () => {
		assert.isFunction(Resize);
	});
	
	let app = new HedraApp({ parent: Bootstrap.parent });
	
	describe('when Used', () => {
		it('should ...'/*, () => {
			assert.isObject(app.camera);
		}*/);
	});
});
