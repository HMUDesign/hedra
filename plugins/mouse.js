import { Raycaster, Vector2 } from 'three';
import HedraComponent from '../component';

export default function pluginMouse(context) {
	const raycaster = new Raycaster();
	const mouse = new Vector2();

	const element = context.renderer.domElement;
	document.body.addEventListener('mousemove', (e) => {
		mouse.active = (
			e.clientX > 0 &&
			e.clientY > 0 &&
			e.clientX < element.offsetWidth &&
			e.clientY < element.offsetHeight
		);

		const mouseX =  (e.clientX / element.offsetWidth) * 2 - 1;
		const mouseY = -(e.clientY / element.offsetHeight) * 2 + 1;

		if (mouse.x !== mouseX) {
			mouse.dirty = true;
			mouse.x = mouseX;
		}

		if (mouse.y !== mouseY) {
			mouse.dirty = true;
			mouse.y = mouseY;
		}
	}, false);

	let hoveredLast = [];

	document.body.addEventListener('click', () => {
		for (const event of hoveredLast) {
			event.target._.bubble('click', event);
		}
	}, false);

	document.body.addEventListener('mousedown', () => {
		for (const event of hoveredLast) {
			event.target._.bubble('mousedown', event);
		}
	}, false);

	document.body.addEventListener('mouseup', () => {
		for (const event of hoveredLast) {
			event.target._.bubble('mouseup', event);
		}
	}, false);

	context.on('update', () => {
		if (!mouse.active) {
			return;
		}

		raycaster.setFromCamera(mouse, context.camera);
		const intersects = raycaster.intersectObjects(context._.children, true);

		const hoveredNext = [];
		for (const { object, distance, point, uv } of intersects) {
			let item = object;
			while (item && !(item._ instanceof HedraComponent)) {
				item = item.parent;
			}
			if (!item) {
				continue;
			}

			removeAncestors(item, hoveredNext);

			if (!hasDescendents(item, hoveredNext)) {
				hoveredNext.push({
					target: item,
					rawTarget: object,
					distance,
					point,
					uv,
				});
			}
		}

		for (const event of hoveredLast) {
			if (!hoveredNext.find(({ target }) => target === event.target)) {
				event.target._.bubble('mouseleave', event);
			}
		}

		for (const event of hoveredNext) {
			if (!hoveredLast.find(({ target }) => target === event.target)) {
				event.target._.bubble('mouseenter', event);
			}
		}

		hoveredLast = hoveredNext;

		if (mouse.dirty) {
			mouse.dirty = false;

			for (const event of hoveredLast) {
				event.target._.bubble('mousemove', event);
			}
		}
	});
}

function isAncestor(item, parent) {
	do {
		if (item === parent) {
			return true;
		}

		item = item.parent;
	}
	while (item);

	return false;
}

function removeAncestors(item, list) {
	for (let i = list.length - 1; i >= 0; i--) {
		if (isAncestor(item, list[i].target)) {
			list.splice(i, 1);
		}
	}
}

function hasDescendents(item, list) {
	for (let i = list.length - 1; i >= 0; i--) {
		if (isAncestor(list[i].target, item)) {
			return true;
		}
	}

	return false;
}
