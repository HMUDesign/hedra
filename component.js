import * as THREE from 'three';
import Emitter from '@hmudesign/emitter';
import TWEEN from '@tweenjs/tween.js';

class TweenPromise extends Promise {
	constructor(tween) {
		super((resolve) => {
			tween.onComplete(resolve);
			tween.onStop(resolve);

			tween.start(TWEEN._time);
		});

		this.tween = tween;
	}
}

export default class HedraComponent extends Emitter {
	static load() {
		return Promise.resolve();
	}

	constructor(config) {
		if (typeof config.type === 'undefined') {
			config.type = 'mesh';
		}

		super();

		switch (config.type) {
			case 'mesh':
				this.geometry = config.geometry;
				this.material = config.material;
				this._ = new THREE.Mesh(this.geometry, this.material);
				break;

			case 'object':
				this._ = new THREE.Object3D();
				break;

			case 'app':
				break;

			default:
				throw new Error(`HedraComponent: Unknown type ${config.type}`);
		}

		this.children = [];
	}

	add(child) {
		if (child instanceof HedraComponent) {
			this.children.push(child);
			this._.add(child._);
		}
		else if (child instanceof THREE.Object3D) {
			this._.add(child);
		}
		else {
			throw new Error('HedraComponent: Child not an instance of `Hedra` or `THREE.Object3D`.');
		}

		return this;
	}

	bubble(...items) {
		this.emit(...items);

		for (const child of this.children) {
			child.bubble(...items);
		}

		return this;
	}

	tween(config) {
		const tween = new TWEEN.Tween(config.object || this);

		if (typeof config.to !== 'undefined' && typeof config.duration !== 'undefined') {
			tween.to(config.to, config.duration);
		}

		if (typeof config.easing !== 'undefined') {
			tween.easing(config.easing);
		}

		return new TweenPromise(tween);
	}

	get position() {
		return this._.position;
	}

	get rotation() {
		return this._.rotation;
	}

	get quaternion() {
		return this._.quaternion;
	}

	get scale() {
		return this._.scale;
	}
}
