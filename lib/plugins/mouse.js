import PropTypes from 'prop-types';
import { bubbleEvent } from './index';
import { Raycaster, Vector2 } from 'three';

export const PLUGIN = 'mouse';

const props = [
	'onClick',
	'onDoubleClick',
	'onContextMenu',
	'onMouseDown',
	'onMouseUp',
	'onTouchStart',
	'onTouchEnd',
	'onTouchMove',
	'onMouseEnter',
	'onMouseLeave',
	'onMouseMove',
];

export function setupScene(scene, newProps) {
	const plugin = scene.plugins[PLUGIN] = {};

	plugin.raycaster = new Raycaster();
	plugin.mouse = new Vector2();
	plugin.hoveredLast = new Set();

	function bubbleEvents(type) {
		for (const event of plugin.hoveredLast) {
			bubbleEvent(event.target, { type, ...event });
		}
	}

	function handleMove(e) {
		const mouse = plugin.mouse;

		mouse.active = (
			e.clientX >= 0 &&
			e.clientY >= 0 &&
			e.clientX < e.target.offsetWidth &&
			e.clientY < e.target.offsetHeight
		);

		const mouseX =  (e.clientX / e.target.offsetWidth) * 2 - 1;
		const mouseY = -(e.clientY / e.target.offsetHeight) * 2 + 1;

		if (mouse.x !== mouseX) {
			mouse.dirty = true;
			mouse.x = mouseX;
		}

		if (mouse.y !== mouseY) {
			mouse.dirty = true;
			mouse.y = mouseY;
		}
	};

	const listeners = plugin.listeners = {
		click: bubbleEvents.bind(null, 'onClick'),
		dblclick: bubbleEvents.bind(null, 'onDoubleClick'),
		contextmenu: bubbleEvents.bind(null, 'onContextMenu'),
		mousedown: bubbleEvents.bind(null, 'onMouseDown'),
		mouseup: bubbleEvents.bind(null, 'onMouseUp'),
		touchstart: bubbleEvents.bind(null, 'onTouchStart'),
		touchend: bubbleEvents.bind(null, 'onTouchEnd'),
		touchmove: bubbleEvents.bind(null, 'onTouchMove'),
		touchcancel: bubbleEvents.bind(null, 'onTouchCancel'),
		mousemove: handleMove.bind(null),
	};

	for (const event in listeners) {
		scene.renderer.domElement.addEventListener(event, listeners[event], false);
	}
}

export function teardownScene(scene, oldProps) {
	const plugin = scene.plugins[PLUGIN];
	const listeners = plugin.listeners;

	for (const event in listeners) {
		scene.renderer.domElement.removeEventListener(event, listeners[event], false);
		delete listeners[event];
	}
}

export function preDrawScene(scene, delta, time) {
	const plugin = scene.plugins[PLUGIN];

	if (!plugin.mouse.active) {
		return;
	}

	plugin.raycaster.setFromCamera(plugin.mouse, scene.camera);
	const intersects = plugin.raycaster.intersectObjects(scene.scene.children, true);

	const hoveredNext = new Set();
	for (const { object, distance, point, uv } of intersects) {
		let target = object;
		while (target && !target._) {
			target = target.parent;
		}
		if (!target) {
			continue;
		}

		removeAncestors(hoveredNext, target);

		if (!hasDescendents(hoveredNext, target)) {
			hoveredNext.add({
				target,
				rawTarget: object,
				distance,
				point,
				uv,
			});
		}
	}

	outer: for (const event of hoveredNext) {
		for (const test of plugin.hoveredLast) {
			if (test.target === event.target) {
				continue outer;
			}
		}

		bubbleEvent(event.target, { type: 'onMouseEnter', ...event });
	}

	outer: for (const event of plugin.hoveredLast) {
		for (const test of hoveredNext) {
			if (test.target === event.target) {
				continue outer;
			}
		}

		bubbleEvent(event.target, { type: 'onMouseLeave', ...event });
	}

	if (plugin.mouse.dirty) {
		plugin.mouse.dirty = false;

		for (const event of hoveredNext) {
			bubbleEvent(event.target, { type: 'onMouseMove', ...event });
		}
	}

	plugin.hoveredLast = hoveredNext;
}


export function getObjectPropTypes() {
	return props.reduce((propTypes, event) => ({
		...propTypes,
		[event]: PropTypes.func,
	}), {});
}

export function setupObject(target, newProps) {
	for (const prop of props) {
		if (typeof newProps[prop] === 'function') {
			target._.addEventListener(prop, newProps[prop]);
		}
	}
}

export function updateObject(target, oldProps, newProps) {
	for (const prop of props) {
		if (oldProps[prop] !== newProps[prop]) {
			if (typeof newProps[prop] === 'function') {
				target._.addEventListener(prop, newProps[prop]);
			}

			if (typeof oldProps[prop] === 'function') {
				target._.removeEventListener(prop, oldProps[prop]);
			}
		}
	}
}

export function teardownObject(target, oldProps) {
	for (const prop of props) {
		if (typeof oldProps[prop] === 'function') {
			target._.removeEventListener(prop, oldProps[prop]);
		}
	}
}


function isAncestor(parent, child) {
	do {
		if (child === parent) {
			return true;
		}

		child = child.parent;
	}
	while (child);

	return false;
}

function removeAncestors(items, source) {
	for (const child of items) {
		if (isAncestor(child.target, source)) {
			items.delete(child);
		}
	}
}

function hasDescendents(items, source) {
	for (const child of items) {
		if (isAncestor(source, child.target)) {
			return true;
		}
	}

	return false;
}
