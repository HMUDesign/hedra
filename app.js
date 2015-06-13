import Debug from 'debug';
let debug = Debug('hedra:environment');

import Hedra from './hedra';
import THREE from 'vendor/three';

export default class Environment {
	constructor(config) {
		
	}
	
	add(child) {
		if(!child instanceof Hedra) {
			throw new Error('Hedra.app.add: Child not an instance of `Hedra`.');
		}
		
		console.log(child)
	}
}
