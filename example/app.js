import Debug from 'debug';
let debug = Debug('app');

import BaseApp from 'hedra/app';
import Mouse from 'hedra/plugins/mouse';
import Resize from 'hedra/plugins/resize';

import Cube from './cube';

export default class App extends BaseApp {
	constructor(config) {
		super(config);
		
		Mouse(this, {  });
		Resize(this, { helper: true });
		
		this.camera.position.set(0, 0, 5);
		this.camera.lookAt(this.scene.position);
		
		this.cube = new Cube({  });
		this.add(this.cube);
	}
}
