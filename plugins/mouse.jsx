import Debug from 'debug';
let debug = Debug('hedra:plugins:mouse');

import Hedra from '../../hedra';
import THREE from 'three';

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
	for (var j in list) {
		if (isAncestor(item, list[j])) {
			delete list[j];
		}
	}
}

function hasDescendents(item, list) {
	for (var j in list) {
		if (isAncestor(list[j], item)) {
			return true;
		}
	}
	
	return false;
}

export default function Mouse(context, config) {
	debug('initialize', config);
	
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	mouse.buffer = 10;
	
	var element = context.renderer.domElement;
	document.body.addEventListener('mousemove', (e) => {
		mouse.active = (
			e.clientX > mouse.buffer
			&& e.clientY > mouse.buffer
			&& e.clientX < element.width - mouse.buffer
			&& e.clientY < element.height - mouse.buffer
		);
		
		mouse.x =  (e.clientX / element.width) * 2 - 1;
		mouse.y = -(e.clientY / element.height) * 2 + 1;
	}, false);
	
	var hovered = [];
	
	document.body.addEventListener('click', () => {
		hovered.map(function(item) {
			item._.emit('click');
		});
	}, false);
	
	context.on('update').then(() => {
		if (!mouse.active) {
			return;
		}
		
		raycaster.setFromCamera(mouse, context.camera);
		
		var intersects = raycaster.intersectObjects(context._.children, true);
		
		var items = [];
		for (var item of intersects) {
			item = item.object;
			while (item && !(item._ instanceof Hedra)) {
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
		
		hovered = hovered.filter(function(item) {
			if (items.indexOf(item) === -1) {
				item._.emit('mouseleave');
				return false;
			}
			
			return true;
		});
		
		items.filter(function(item) {
			if (hovered.indexOf(item) === -1) {
				item._.emit('mouseenter');
				hovered.push(item);
			}
		});
	});
}
