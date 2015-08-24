import Bootstrap from './bootstrap';

import Hedra from '../hedra';

var assert = require('chai').assert;

describe('Hedra', function() {
	let thing = new Hedra({  });
	
	describe('when Instantiated', function () {
		it('should have a position', function () {
			assert.isObject(thing.position);
		});
		
		it('should have a rotation', function () {
			assert.isObject(thing.rotation);
		});
		
		it('should have a scale', function () {
			assert.isObject(thing.scale);
		});
	});
});
