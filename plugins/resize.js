import Debug from 'debug';
let debug = Debug('hedra:plugins:resize');

import THREE from 'three';

function resize(config) {
	debug('resize');
	
	var event = {
		width: window.innerWidth,
		height: window.innerHeight,
	};
	
	this.bubble('resize', event);
	
	this.camera.aspect = event.width / event.height;
	
	if(config.fov) {
		this.camera.fov = config.y;
		
		var height = 2 * Math.tan(THREE.Math.degToRad(config.y / 2));
		var _fovx = THREE.Math.radToDeg(2 * Math.atan(height * this.camera.aspect / 2));
		
		if(_fovx < config.x) {
			var width = 2 * Math.tan(THREE.Math.degToRad(config.x / 2));
			var _fovy = THREE.Math.radToDeg(2 * Math.atan(width / this.camera.aspect / 2));
			this.camera.fov = _fovy;
		}
	}
	
	this.camera.updateProjectionMatrix();
	
	this.renderer.setSize(event.width, event.height);
}

export default function Resize(context, config) {
	debug('initialize', config);
	
	config = config || {};
	if(config.fov !== false) config.fov = true;
	
	window.addEventListener('resize', resize.bind(context, config), false);
	setTimeout(resize.bind(context, config), 0);
	
	if(config.fov) {
		if(!config.ratio) config.ratio = 16 / 9;
		
		if(!config.y) config.y = 2 * THREE.Math.radToDeg(Math.atan(3 / 4));
		var height = 2 * Math.tan(THREE.Math.degToRad(config.y / 2));
		
		if(!config.x) config.x = 2 * THREE.Math.radToDeg(Math.atan(height / 2 * config.ratio));
		var width = 2 * Math.tan(THREE.Math.degToRad(config.x / 2));
		
		if(config.helper) {
			context.fov_helper = new THREE.Mesh(new THREE.BoxGeometry(width / height, 1, 1), new THREE.MeshBasicMaterial({ wireframe: true }));
			context.fov_helper.name = 'FOV Helper';
			context.fov_helper.position.set(0, 0, - 1 / height - .5);
			context.camera.add(context.fov_helper);
		}
	}
}
