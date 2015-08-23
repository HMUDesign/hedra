import HedraApp from '../app';
import Hedra from '../hedra';

var assert = require('chai').assert;

let parent = document.createElement('div');
parent.setAttribute('id', 'parent');
parent.style.position = 'fixed';
parent.style.right = '0';
parent.style.bottom = '0';
parent.style.top = '60px';
parent.style.width = '50%';
document.body.appendChild(parent);

function reset(App) {
	while(parent.childNodes.length) {
		parent.removeChild(parent.childNodes[0]);
	}
	
	if(App) {
		return new App({ parent });
	}
	else {
		let app = new HedraApp({ parent });
		
		app.camera.position.set(0, 0, 1.5);
		app.camera.lookAt(app.scene.position);
		
		return app;
	}
}

function describeHedraApp(name, Thing, spec) {
	describe(name, () => {
		console.log(Thing.prototype.__proto__.constructor, HedraApp)
		it('should extend Hedra/App.', () => {
			assert.instanceOf(Thing.prototype, HedraApp);
		});
		
		it('should have a .load() which returns a promise.', () => {
			assert.isFunction(Thing.load);
			assert.instanceOf(Thing.load(), Promise);
		});
		
		spec();
	});
}

function describeHedra(name, Thing, spec) {
	describe(name, () => {
		it('should extend Hedra.', () => {
			assert.instanceOf(Thing.prototype, Hedra);
		});
		
		it('should have a .load() which returns a promise.', () => {
			assert.isFunction(Thing.load);
			assert.instanceOf(Thing.load(), Promise);
		});
		
		spec();
	});
}

export default { reset, describeHedraApp, describeHedra };
