import Debug from 'debug';
let debug = Debug('app');

import BaseApp from 'hedra/app';
import Mouse from 'hedra/plugins/mouse';
import Resize from 'hedra/plugins/resize';
import Keys from 'hedra/plugins/keys';

import Cube from './cube';

export default class App extends BaseApp {
	static load() {
		return new Promise.all([
			Cube.load(),
		]);
	}
	
	constructor(config) {
		super(config);
		
		Mouse(this, {  });
		Resize(this, { ratio: 16 / 9 });
		Keys(this, {  });
		
		this.camera.position.set(0, 0, 1.5);
		this.camera.lookAt(this.scene.position);
		
		App.load().then(() => {
			this.cube = new Cube();
			this.add(this.cube);
		});
		
		this.on('key').then((...items) => {
			console.log('key', items)
		});
		
		this.on('key', 'NUMPAD0').then((...items) => {
			console.log('numpad0', items)
		});
	}
}
