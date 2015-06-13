import Debug from 'debug';
let debug = Debug('hedra');

import Emitter from './lib/emitter';
import THREE from 'vendor/three';

export default class Hedra extends Emitter {
	constructor(config) {
		if(config.make === false) {
			delete config.make;
		}
		else {
			if(config.geometry && config.material) {
				config.make = new THREE.Mesh(config.geometry, config.material);
			}
			else {
				config.make = new THREE.Object3D();
			}
		}
		
		super();
		
		this.children = [];
		
		if(config.make) {
			this._ = config.make;
			this._._ = this;
		}
	}
	
	add(child) {
		if(!child instanceof Hedra) {
			throw new Error('Hedra.app.add: Child not an instance of `Hedra`.');
		}
		
		this.children.push(child);
		this._.add(child._);
	}
	
	bubble(...items) {
		this.emit(...items);
		
		for(let child of this.children) {
			child.bubble(...items);
		}
	}
	
	tween(config) {
		var tween = new TWEEN.Tween(config.object || this);
		
		if(config.to && config.duration) {
			tween.to(config.to, config.duration);
		}
		
		if(config.easing) {
			tween.easing(config.easing);
		}
		
		var promise = new Promise(function(resolve, reject) {
			tween.onComplete(resolve);
			tween.onStop(resolve);
			tween.start(TWEEN._time);
		});
		
		promise.tween = tween;
		
		return promise;
	}
	
	get position() {
		return this._.position;
	}
	
	get rotation() {
		return this._.rotation;
	}
}
