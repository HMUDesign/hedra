/* globals describe it */

import Bootstrap from '../bootstrap';

import HedraApp from '../../app';
import Keys from '../../plugins/keys';

var assert = require('chai').assert;

describe('Keys Plugin', () => {
	it('should be a function', () => {
		assert.isFunction(Keys);
	});
	
	let app = new HedraApp({ parent: Bootstrap.parent });
	
	describe('when Used', () => {
		it('should ...', () => {
			assert.isObject(app);
		});
	});
});
