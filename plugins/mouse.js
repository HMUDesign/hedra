import * as THREE from 'three';
import HedraComponent from '../component';

export default function pluginMouse(context) {
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();
	mouse.buffer = 10;

	const element = context.renderer.domElement;
	document.body.addEventListener('mousemove', (e) => {
		mouse.active = (
			e.clientX > mouse.buffer &&
			e.clientY > mouse.buffer &&
			e.clientX < element.width - mouse.buffer &&
			e.clientY < element.height - mouse.buffer
		);

		mouse.x =  (e.clientX / element.width) * 2 - 1;
		mouse.y = -(e.clientY / element.height) * 2 + 1;
	}, false);

	let hovered = [];

	document.body.addEventListener('click', () => {
		for (const item of hovered) {
			item._.emit('click');
		}
	}, false);

	context.on('update').then(() => {
		if (!mouse.active) {
			return;
		}

		raycaster.setFromCamera(mouse, context.camera);

		const intersects = raycaster.intersectObjects(context._.children, true);

		const items = [];
		for (let item of intersects) {
			item = item.object;
			while (item && !(item._ instanceof HedraComponent)) {
				item = item.parent;
			}

			if (!item) {
				continue;
			}

			removeAncestors(item, items);

			if (!hasDescendents(item, items)) {
				items.push(item);
			}
		}

		hovered = hovered.filter((item) => {
			if (items.indexOf(item) === -1) {
				item._.emit('mouseleave');
				return false;
			}

			return true;
		});

		for (const item of items) {
			if (!hovered.includes(item)) {
				item._.emit('mouseenter');
				hovered.push(item);
			}
		}
	});
}

function isAncestor(item, parent) {
	do {
		if (parent === item) {
			return true;
		}

		item = item.parent;
	}
	while (item);

	return false;
}

function removeAncestors(item, list) {
	for (const j in list) {
		if (isAncestor(item, list[j])) {
			delete list[j];
		}
	}
}

function hasDescendents(item, list) {
	for (const j in list) {
		if (isAncestor(list[j], item)) {
			return true;
		}
	}

	return false;
}
