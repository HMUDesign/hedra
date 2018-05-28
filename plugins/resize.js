import * as THREE from 'three';

export default function pluginResize(context, config) {
	config = config || {};
	if (config.fov !== false) {
		config.fov = true;
	}

	window.addEventListener('resize', resize.bind(context, config), false);
	setTimeout(resize.bind(context, config), 0);

	if (config.fov) {
		if (!config.ratio) {
			config.ratio = 16 / 9;
		}

		if (!config.y) {
			config.y = 2 * THREE.Math.radToDeg(Math.atan(1 / config.ratio));
		}

		const height = 2 * Math.tan(THREE.Math.degToRad(config.y / 2));

		if (!config.x) {
			config.x = 2 * THREE.Math.radToDeg(Math.atan(height / 2 * config.ratio));
		}

		const width = 2 * Math.tan(THREE.Math.degToRad(config.x / 2));

		if (config.helper) {
			const geometry = new THREE.BoxGeometry(width / height, 1, 1);
			const material = new THREE.MeshBasicMaterial({ wireframe: true });

			context.fov_helper = new THREE.Mesh(geometry, material);
			context.fov_helper.position.set(0, 0, -1 / height - 0.5);
			context.camera.add(context.fov_helper);
		}
	}
}

function resize(config) {
	const parent = this.renderer.domElement.parentNode;
	const event = {};

	if (parent === document.body) {
		event.width = window.innerWidth;
		event.height = window.innerHeight;
	}
	else {
		event.width = parent.offsetWidth;
		event.height = parent.offsetHeight;
	}

	this.bubble('resize', event);

	this.camera.aspect = event.width / event.height;

	if (config.fov) {
		this.camera.fov = config.y;

		const height = 2 * Math.tan(THREE.Math.degToRad(config.y / 2));
		event.fovx = THREE.Math.radToDeg(2 * Math.atan(height * this.camera.aspect / 2));
		event.fovy = THREE.Math.radToDeg(2 * Math.atan(height / 2));

		if (event.fovx < config.x) {
			const width = 2 * Math.tan(THREE.Math.degToRad(config.x / 2));
			event.fovy = THREE.Math.radToDeg(2 * Math.atan(width / this.camera.aspect / 2));
			event.fovx = THREE.Math.radToDeg(2 * Math.atan(width / 2));

			this.camera.fov = event.fovy;
		}
	}

	this.bubble('resize:post', event);

	this.camera.updateProjectionMatrix();

	this.renderer.setSize(event.width, event.height);
}
