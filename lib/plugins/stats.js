import PropTypes from 'prop-types';
import Stats from 'stats.js';

export const PLUGIN = 'stats';

export function getScenePropTypes() {
	return {
		stats: PropTypes.bool.isRequired,
	};
}

export function setupScene(scene, newProps) {
	const { stats } = scene.props;
	if (stats) {
		scene.stats = new Stats();
		scene.container.appendChild(scene.stats.domElement);
	}
}

export function teardownScene(scene, oldProps) {
	if (scene.stats) {
		scene.stats.domElement.remove();
	}
}

export function updateScene(scene, oldProps, newProps) {
	const { stats } = scene.props;
	if (stats !== newProps.stats) {
		if(scene.stats) {
			scene.stats.domElement.remove();
			delete scene.stats;
		}

		if (newProps.stats) {
			scene.stats = new Stats();
		}
	}
}

export function postDrawScene(scene, delta, time) {
	if (scene.stats) {
		scene.stats.update();
	}
}
