import PropTypes from 'prop-types';
import { Mesh, BoxGeometry, MeshBasicMaterial, Math as ThreeMath } from 'three';

export const PLUGIN = 'resize';

export function getScenePropTypes() {
	return {
		resize: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				helper: PropTypes.bool,
				fullscreen: PropTypes.bool,
				ratio: PropTypes.oneOfType([
					PropTypes.bool,
					PropTypes.number,
				]),
			}),
		]),
	};
}

export function setupScene(scene, newProps) {
	const plugin = scene.plugins[PLUGIN] = {};
	plugin.config = getConfig(newProps.resize);

	if (plugin.config) {
		plugin.resize = handleResize.bind(null, scene);

		if (plugin.config.helper) {
			const geometry = new BoxGeometry(plugin.config.width / plugin.config.height, 1, 1);
			const material = new MeshBasicMaterial({ wireframe: true });

			scene.fovHelper = new Mesh(geometry, material);
			scene.fovHelper.position.set(0, 0, -1 / plugin.config.height - 0.5);
			scene.camera.add(scene.fovHelper);
		}

		window.addEventListener('resize', plugin.resize, false);
		plugin.resize();
	}
}

export function teardownScene(scene, oldProps) {
	const plugin = scene.plugins[PLUGIN];

	if (plugin.config.helper) {
		scene.fovHelper.remove();
		delete scene.fovHelper;
	}

	if (plugin.resize) {
		window.removeEventListener('resize', plugin.resize, false);
		delete plugin.resize;
	}
}

export function updateScene(scene, oldProps, newProps) {
	const plugin = scene.plugins[PLUGIN];

	const { resize } = scene.props;
	if (resize !== newProps.resize) {
		if (scene.fovHelper) {
			scene.fovHelper.remove();
			delete scene.fovHelper;
		}

		plugin.config = getConfig(newProps.resize);

		if (plugin.config) {
			plugin.resize = handleResize.bind(null, scene);

			if (plugin.config.helper) {
				const geometry = new BoxGeometry(plugin.config.width / plugin.config.height, 1, 1);
				const material = new MeshBasicMaterial({ wireframe: true });

				scene.fovHelper = new Mesh(geometry, material);
				scene.fovHelper.position.set(0, 0, -1 / plugin.config.height - 0.5);
				scene.camera.add(scene.fovHelper);
			}

			plugin.resize();
		}
	}
}

function getConfig(value) {
	if (!value) {
		return null;
	}

	const config = {};

	if (value === true) {
		config.helper = false;
		config.fullscreen = true;
		config.ratio = true;
	}
	else if (typeof value === 'number') {
		config.helper = false;
		config.fullscreen = true;
		config.ratio = value;
	}
	else if (typeof value === 'object') {
		config.helper = typeof value.helper === 'boolean' ? value.helper : false;
		config.fullscreen = typeof value.fullscreen === 'boolean' ? value.fullscreen : true;
		config.ratio = typeof value.ratio === 'number' ? value.ratio : true;
	}

	if (config.ratio === true) {
		config.ratio = 16 / 9;
	}

	if (typeof config.ratio === 'number') {
		config.y = 2 * ThreeMath.radToDeg(Math.atan(1 / config.ratio));
		config.height = 2 * Math.tan(ThreeMath.degToRad(config.y / 2));

		config.x = 2 * ThreeMath.radToDeg(Math.atan(config.height / 2 * config.ratio));
		config.width = 2 * Math.tan(ThreeMath.degToRad(config.x / 2));
	}

	return config;
}

function handleResize(scene) {
	const plugin = scene.plugins[PLUGIN];

	const width  = plugin.config.fullscreen ? window.innerWidth  : scene.container.parentNode.offsetWidth;
	const height = plugin.config.fullscreen ? window.innerHeight : scene.container.parentNode.offsetHeight;

	scene.camera.aspect = width / height;
	let fovx = null;
	let fovy = null;

	if (plugin.config.ratio) {
		fovx = ThreeMath.radToDeg(2 * Math.atan(plugin.config.height * scene.camera.aspect / 2));
		fovy = ThreeMath.radToDeg(2 * Math.atan(plugin.config.height / 2));
		scene.camera.fov = plugin.config.y;

		if (fovx < plugin.config.x) {
			fovy = ThreeMath.radToDeg(2 * Math.atan(plugin.config.width / scene.camera.aspect / 2));
			fovx = ThreeMath.radToDeg(2 * Math.atan(plugin.config.width / 2));
			scene.camera.fov = fovy;
		}

		// const hud = {
		// 	z: -scene.camera.near,
		// 	width:  2 * Math.tan(ThreeMath.degToRad(fovx / 2)) * scene.camera.near,
		// 	height: 2 * Math.tan(ThreeMath.degToRad(fovy / 2)) * this.camera.near,
		// };
	}

	scene.camera.updateProjectionMatrix();

	scene.renderer.setSize(width, height);
}
