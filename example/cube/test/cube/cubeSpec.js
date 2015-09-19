import Bootstrap from 'hedra/test/bootstrap';

import Cube from '../../src/cube/cube';
import Hedra from 'hedra';

var assert = require('chai').assert;

Bootstrap.describeHedra('Cube Class', Cube, () => {
	describe('when Instantiated', () => {
		let cube;
		
		before(() => {
			return Cube.load().then(() => {
				cube = new Cube();
				Bootstrap.reset().add(cube);
			});
		});
		
		it('should rotate', (done) => {
			var rotation = cube.rotation.toArray();
			
			setTimeout(() => {
				assert.notDeepEqual(rotation, cube.rotation.toArray());
				
				done();
			}, 20);
		});
	});
});
