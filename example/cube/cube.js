import Debug from 'debug';
let debug = Debug('app:cube');

import THREE from 'vendor/three';
import Hedra from 'hedra';

let material, geometry;

export default class Cube extends Hedra {
	static load() {
		return new Promise((resolve, reject) => {
			geometry = new THREE.BoxGeometry(.25, .25, .25);
			material = new THREE.MeshNormalMaterial();
			
			resolve();
		});
	}
	
	constructor(config) {
		config = config || {};
		config.geometry = geometry;
		config.material = material;
		
		super(config);
		
		this.on('update').then((delta, time) => {
			this.rotation.x += Math.PI / 2 * delta;
			this.rotation.y += Math.PI / 2 * delta;
		});
		
		this.on('click').then(() => {
			console.log('clicked!');
		});
	}
}
