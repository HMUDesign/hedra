import Debug from 'debug';
let debug = Debug('hedra:app');

import Hedra from './hedra';
import THREE from 'three';
import TWEEN from 'tween';

export default class HedraApp extends Hedra {
	constructor(config) {
		debug('construct', config);
		
		config.make = false;
		config.parent = config.parent || document.body;
		
		if(!config.width && !config.height) {
			if(config.parent === document.body) {
				config.width = window.innerWidth;
				config.height = window.innerHeight;
			}
			else {
				config.width = config.parent.offsetWidth;
				config.height = config.parent.offsetHeight;
			}
		}
		
		if(config.parent === document.body) {
			document.body.style.margin = '0';
		}
		
		var scene = new THREE.Scene();
		
		var camera = new THREE.PerspectiveCamera(75, config.width / config.height, 0.1, 1000);
		camera.position.copy(config.camera || new THREE.Vector3(0,0,0));
		
		var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setClearColor(0x000000, 0);
		renderer.setSize(config.width, config.height);
		
		renderer.domElement.style.display = 'block';
		config.parent.appendChild(renderer.domElement);
		
		super(config);
		
		this.scene = this._ = scene;
		this.camera = camera;
		this.renderer = renderer;
		
		this.scene.add(this.camera);
		
		this.clock = new THREE.Clock(false);
		
		if(config.pause) {
			window.addEventListener('focus', () => {
				this.play();
			}, false);
			
			window.addEventListener('blur', () => {
				this.pause();
			}, false);
		}
		
		setTimeout(() => {
			this.play();
		}, 0);
		
		if(typeof window.Stats !== 'undefined') {
			this.stats = new window.Stats();
			
			this.stats.domElement.style.position = 'absolute';
			this.stats.domElement.style.top  = '0';
			this.stats.domElement.style.left = '0';
			config.parent.appendChild(this.stats.domElement);
		}
		
		if(typeof TWEEN !== 'undefined') {
			TWEEN._time = 0;
			this.on('update').then((e) => {
				TWEEN._time = e.time;
				TWEEN.update(e.time);
			});
		}
	}
	
	play() {
		debug('play');
		
		this.clock.start();
		requestAnimationFrame(() => { this.animate(); });
		
		return this;
	}
	
	pause() {
		debug('pause');
		
		this.clock.stop();
		
		return this;
	}
	
	animate() {
		if(this.clock.running) {
			requestAnimationFrame(() => { this.animate(); });
		}
		
		this.frame(this.clock.getDelta(), this.clock.getElapsedTime());
		
		return this;
	}
	
	frame(delta, time) {
		this.bubble('update', delta || 0, time || 0);
		
		this.render();
		
		if(this.stats) {
			this.stats.update();
		}
		
		return this;
	}
	
	render() {
		this.renderer.render(this.scene, this.camera);
		
		return this;
	}
}
