import * as keyboardPlugin from './keyboard';
import * as mousePlugin from './mouse';
import * as pausablePlugin from './pausable';
import * as statsPlugin from './stats';
import * as updatePlugin from './update';

const plugins = [
	keyboardPlugin,
	mousePlugin,
	pausablePlugin,
	statsPlugin,
	updatePlugin,
];


export function getScenePropTypes() {
	return plugins.reduce((propTypes, plugin) =>
		Object.assign(propTypes, (plugin.getScenePropTypes && plugin.getScenePropTypes()) || {}), {});
}

export function setupScene(scene, newProps) {
	for (const plugin of plugins) {
		if (plugin.setupScene) {
			plugin.setupScene(scene, newProps);
		}
	}
}

export function updateScene(scene, oldProps, newProps) {
	for (const plugin of plugins) {
		if (plugin.updateScene) {
			plugin.updateScene(scene, oldProps, newProps);
		}
	}
}

export function teardownScene(scene, oldProps) {
	for (const plugin of plugins) {
		if (plugin.teardownScene) {
			plugin.teardownScene(scene, oldProps);
		}
	}
}

export function preDrawScene(scene, delta, time) {
	for (const plugin of plugins) {
		if (plugin.preDrawScene) {
			plugin.preDrawScene(scene, delta, time);
		}
	}
}

export function postDrawScene(scene, delta, time) {
	for (const plugin of plugins) {
		if (plugin.postDrawScene) {
			plugin.postDrawScene(scene, delta, time);
		}
	}
}

export function playScene(scene, time) {
	for (const plugin of plugins) {
		if (plugin.playScene) {
			plugin.playScene(scene, time);
		}
	}
}

export function pauseScene(scene, time) {
	for (const plugin of plugins) {
		if (plugin.pauseScene) {
			plugin.pauseScene(scene, time);
		}
	}
}


export function getObjectPropTypes() {
	return plugins.reduce((propTypes, plugin) =>
		Object.assign(propTypes, (plugin.getObjectPropTypes && plugin.getObjectPropTypes()) || {}), {});
}

export function setupObject(object, newProps) {
	for (const plugin of plugins) {
		if (plugin.setupObject) {
			plugin.setupObject(object, newProps);
		}
	}
}

export function updateObject(object, oldProps, newProps) {
	for (const plugin of plugins) {
		if (plugin.updateObject) {
			plugin.updateObject(object, oldProps, newProps);
		}
	}
}

export function teardownObject(object, oldProps) {
	for (const plugin of plugins) {
		if (plugin.teardownObject) {
			plugin.teardownObject(object, oldProps);
		}
	}
}


export function bubbleEvent(object, event) {
	let stopped = false;
	event.stopPropagation = () => {
		stopped = true;
	};

	while (!stopped && object) {
		event.target = object;
		object.dispatchEvent(event);

		object = object.parent;
	}
}

export function cascadeEvent(object, event) {
	for (const child of object.children) {
		event.target = child;
		child.dispatchEvent(event);

		cascadeEvent(child, event);
	}
}
