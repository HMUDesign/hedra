import Debug from 'debug';
let debug = Debug('app:cube');

import THREE from 'vendor/three';
import Hedra from 'hedra';

export default class Cube extends Hedra {
	constructor(config) {
		config.geometry = new THREE.BoxGeometry(1, 1, 1);
		config.material = new THREE.MeshNormalMaterial();
		
		super(config);
		
		this.on('update').then((delta, time) => {
			this.rotation.x += Math.PI / 2 * delta;
			this.rotation.y += Math.PI / 2 * delta;
		});
	}
}
