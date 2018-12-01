import PropTypes from 'prop-types';
// import Handlers from './lib/handlers';
// import { bubbleEvent, cascadeEvent } from './index';

export const PLUGIN = 'resize';

export function getScenePropTypes() {
	return {
		fullscreen: PropTypes.bool,
	};
}

export function setupScene(scene, newProps) {
	const plugin = scene.plugins[PLUGIN] = {};

	plugin.resize = function() {
		const { fullscreen } = scene.props;

		const width  = fullscreen ? window.innerWidth  : scene.container.parentNode.offsetWidth;
		const height = fullscreen ? window.innerHeight : scene.container.parentNode.offsetHeight;

		scene.camera.aspect = width / height;
		scene.camera.updateProjectionMatrix();

		scene.renderer.setSize(width, height);
	};

	window.addEventListener('resize', plugin.resize, false);
	plugin.resize();
}

export function teardownScene(scene, oldProps) {
	const plugin = scene.plugins[PLUGIN];
	window.removeEventListener('resize', plugin.resize, false);
}

export function updateScene(scene, oldProps, newProps) {
	const plugin = scene.plugins[PLUGIN];
	plugin.resize();
}
