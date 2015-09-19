import Bootstrap from './bootstrap';

import HedraApp from '../app';
import Hedra from '../hedra';

var assert = require('chai').assert;

describe('HedraApp Class', () => {
	it('should extend Hedra.', () => {
		assert.instanceOf(HedraApp.prototype, Hedra);
	});
	
	let app = new HedraApp({ parent: Bootstrap.parent });
	
	describe('when Instantiated', () => {
		it('should have a camera', () => {
			assert.isObject(app.camera);
		});
		
		it('should have a renderer', () => {
			assert.isObject(app.renderer);
		});
		
		it('should have a clock', () => {
			assert.isObject(app.clock);
		});
		
		it('should play automatically', () => {
			assert.isTrue(app.clock.running);
		});
		
		it('is added to the appropriate parent', () => {
			assert.strictEqual(app.renderer.domElement.parentNode, Bootstrap.parent);
		});
		
		it('sizes to the dimensions of the parent');
	});
	
	describe('app.pause()', () => {
		it('should have a .pause() method', () => {
			assert.isFunction(app.pause);
		});
		
		let result;
		it('should pause the clock', () => {
			result = app.pause();
			assert.isFalse(app.clock.running);
		});
		
		it('should be chainable', () => {
			assert.strictEqual(result, app);
		});
	});
	
	describe('app.play()', () => {
		it('should have a .play() method', () => {
			assert.isFunction(app.play);
		});
		
		let result;
		it('should resume the clock', () => {
			result = app.play();
			assert.isTrue(app.clock.running);
		});
		
		it('should be chainable', () => {
			assert.strictEqual(result, app);
		});
	});
	
	describe('app.render()', () => {
		it('should have a .render() method', () => {
			assert.isFunction(app.render);
		});
		
		let result;
		it('should call renderer.render', (done) => {
			app.pause();
			
			app.renderer.render = () => {
				done();
			}
			
			result = app.render();
		});
		
		it('should be chainable', () => {
			assert.strictEqual(result, app);
		});
	});
});
