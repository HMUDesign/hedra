import { Mesh, BoxGeometry, MeshBasicMaterial, Math as ThreeMath } from 'three';

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

		config.y = 2 * ThreeMath.radToDeg(Math.atan(1 / config.ratio));
		config.height = 2 * Math.tan(ThreeMath.degToRad(config.y / 2));

		config.x = 2 * ThreeMath.radToDeg(Math.atan(config.height / 2 * config.ratio));
		config.width = 2 * Math.tan(ThreeMath.degToRad(config.x / 2));

		if (config.helper) {
			const geometry = new BoxGeometry(config.width / config.height, 1, 1);
			const material = new MeshBasicMaterial({ wireframe: true });

			context.fov_helper = new Mesh(geometry, material);
			context.fov_helper.position.set(0, 0, -1 / config.height - 0.5);
			context.camera.add(context.fov_helper);
		}
	}
}

function resize(config) {
	const parent = this.renderer.domElement.parentNode;
	const event = {};

	event.width  = parent === document.body ? window.innerWidth  : parent.offsetWidth;
	event.height = parent === document.body ? window.innerHeight : parent.offsetHeight;

	this.bubble('resize:pre', event);

	this.camera.aspect = event.width / event.height;

	if (config.fov) {
		event.fovx = ThreeMath.radToDeg(2 * Math.atan(config.height * this.camera.aspect / 2));
		event.fovy = ThreeMath.radToDeg(2 * Math.atan(config.height / 2));
		this.camera.fov = config.y;

		if (event.fovx < config.x) {
			event.fovy = ThreeMath.radToDeg(2 * Math.atan(config.width / this.camera.aspect / 2));
			event.fovx = ThreeMath.radToDeg(2 * Math.atan(config.width / 2));
			this.camera.fov = event.fovy;
		}

		event.hud = {
			z: -this.camera.near,
			width:  2 * Math.tan(ThreeMath.degToRad(event.fovx / 2)) * this.camera.near,
			height: 2 * Math.tan(ThreeMath.degToRad(event.fovy / 2)) * this.camera.near,
		};
	}

	this.bubble('resize', event);

	this.camera.updateProjectionMatrix();

	this.renderer.setSize(event.width, event.height);
}
