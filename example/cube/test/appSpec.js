import Bootstrap from 'hedra/test/bootstrap';

import App from '../src/app';

var assert = require('chai').assert;

Bootstrap.describeHedraApp('App Class', App, () => {
	describe('when Instantiated', () => {
		let app;
		
		before(() => {
			return App.load().then(() => {
				app = Bootstrap.reset(App);
			});
		});
		
		it('has a cube', () => {
			assert.isObject(app.cube);
		});
		
		it('with scale 2', () => {
			assert.deepEqual(app.cube.scale.toArray(), [2, 2, 2]);
		});
	});
});
