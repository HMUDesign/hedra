import Debug from 'debug';
let debug = Debug('hedra');

import THREE from 'vendor/three';

export default class Hedra {
	constructor(config) {
		if(config.make !== false) {
			if(config.geometry && config.material) {
				this._ = new THREE.Mesh(config.geometry, config.material)
			}
			else {
				this._ = config.make || new THREE.Object3D();
			}
		}
	}
}
