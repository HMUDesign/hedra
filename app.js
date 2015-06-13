import Debug from 'debug';
let debug = Debug('hedra:app');

import Emitter from './lib/emitter';
import Hedra from './hedra';

import THREE from 'vendor/three';

export default class App extends Emitter {
	constructor(config) {
		super();
	}
	
	add(child) {
		if(!child instanceof Hedra) {
			throw new Error('Hedra.app.add: Child not an instance of `Hedra`.');
		}
		
		console.log(child)
	}
}
