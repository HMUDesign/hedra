import { EventDispatcher } from 'three';

import * as keyboardPlugin from './keyboard';
import * as mousePlugin from './mouse';
import * as updatePlugin from './update';

const plugins = [
	keyboardPlugin,
	mousePlugin,
	updatePlugin,
];

const events = new EventDispatcher();
export function notify(event) {
	return events.dispatchEvent(event);
}

export function getPropTypes() {
	return plugins.reduce((propTypes, plugin) =>
		Object.assign(propTypes, plugin.getPropTypes() || {}), {});
}

export function setup(target, newProps) {
	for (const plugin of plugins) {
		plugin.setup(target, newProps);
	}
}

export function update(target, oldProps, newProps) {
	for (const plugin of plugins) {
		plugin.update(target, oldProps, newProps);
	}
}

export function teardown(target, oldProps) {
	for (const plugin of plugins) {
		plugin.teardown(target, oldProps);
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


for (const plugin of plugins) {
	plugin.register(events);
}
