import PropTypes from 'prop-types';
import { bubbleEvent } from './index';
import { Raycaster, Vector2 } from 'three';

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

export function register(events) {
	const raycaster = new Raycaster();
	const mouse = new Vector2();
	let hoveredLast = new Set();

	function bubbleEvents(type) {
		for (const event of hoveredLast) {
			bubbleEvent(event.target, { type, ...event });
		}
	}

	function handleMove(e) {
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

	const listeners = {
		click: bubbleEvents.bind(null, 'onClick'),
		dblclick: bubbleEvents.bind(null, 'onDoubleClick'),
		contextmenu: bubbleEvents.bind(null, 'onContextMenu'),
		mousedown: bubbleEvents.bind(null, 'onMouseDown'),
		mouseup: bubbleEvents.bind(null, 'onMouseUp'),
		touchstart: bubbleEvents.bind(null, 'onTouchStart'),
		touchend: bubbleEvents.bind(null, 'onTouchEnd'),
		touchmove: bubbleEvents.bind(null, 'onTouchMove'),
		mousemove: handleMove.bind(null),
	};

	events.addEventListener('mount', ({ app }) => {
		for (const event in listeners) {
			app.renderer.domElement.addEventListener(event, listeners[event], false);
		}
	});

	events.addEventListener('unmount', ({ app }) => {
		for (const event in listeners) {
			app.renderer.domElement.removeEventListener(event, listeners[event], false);
		}
	});

	events.addEventListener('draw:pre', ({ app }) => {
		if (!mouse.active) {
			return;
		}

		raycaster.setFromCamera(mouse, app.camera);
		const intersects = raycaster.intersectObjects(app.scene.children, true);

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
			for (const test of hoveredLast) {
				if (test.target === event.target) {
					continue outer;
				}
			}

			bubbleEvent(event.target, { type: 'onMouseEnter', ...event });
		}

		outer: for (const event of hoveredLast) {
			for (const test of hoveredNext) {
				if (test.target === event.target) {
					continue outer;
				}
			}

			bubbleEvent(event.target, { type: 'onMouseLeave', ...event });
		}

		hoveredLast = hoveredNext;

		if (mouse.dirty) {
			mouse.dirty = false;

			for (const event of hoveredLast) {
				bubbleEvent(event.target, { type: 'onMouseMove', ...event });
			}
		}
	});
}

export function getScenePropTypes() {
}

export function getObjectPropTypes() {
	return props.reduce((propTypes, event) => ({
		...propTypes,
		[event]: PropTypes.func,
	}), {});
}

export function setup(target, newProps) {
	for (const prop of props) {
		if (typeof newProps[prop] === 'function') {
			target.addEventListener(prop, newProps[prop]);
		}
	}
}

export function update(target, oldProps, newProps) {
	for (const prop of props) {
		if (oldProps[prop] !== newProps[prop]) {
			if (typeof newProps[prop] === 'function') {
				target.addEventListener(prop, newProps[prop]);
			}

			if (typeof oldProps[prop] === 'function') {
				target.removeEventListener(prop, oldProps[prop]);
			}
		}
	}
}

export function teardown(target, oldProps) {
	for (const prop of props) {
		if (typeof oldProps[prop] === 'function') {
			target.removeEventListener(prop, oldProps[prop]);
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
