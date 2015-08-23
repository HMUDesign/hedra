import Debug from 'debug';
let debug = Debug('app');

import BaseApp from 'hedra/app';
import Mouse from 'hedra/plugins/mouse';
import Resize from 'hedra/plugins/resize';

import Cube from './cube/cube';

export default class App extends BaseApp {
	static load() {
		return Promise.all([
			Cube.load(),
		]);
	}
	
	constructor(config) {
		debug('construct');
		
		super(config);
		
		Mouse(this, {  });
		Resize(this, { ratio: 16 / 9 });
		
		this.camera.position.set(0, 0, 1.5);
		this.camera.lookAt(this.scene.position);
		
		this.cube = new Cube();
		this.cube.scale.set(2, 2, 2);
		this.add(this.cube);
	}
}
