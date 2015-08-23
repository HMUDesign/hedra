import Debug from 'debug';
let debug = Debug('app:cube');

import THREE from 'three';
import Hedra from 'hedra';

let material;
let geometry;

export default class Cube extends Hedra {
	static load() {
		return new Promise((resolve) => {
			geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
			material = new THREE.MeshNormalMaterial();
			
			resolve();
		});
	}
	
	constructor(config) {
		debug('construct');
		
		config = config || {};
		config.geometry = geometry;
		config.material = material;
		
		super(config);
		
		this.on('update').then((delta) => {
			this.rotation.x += Math.PI / 2 * delta;
			this.rotation.y += Math.PI / 2 * delta;
		});
		
		this.on('click').then(() => {
			console.log('clicked!');
		});
	}
}
