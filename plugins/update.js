import PropTypes from 'prop-types';
import { fakeLifecycleCallback } from '../component';

const onUpdates = new Set();

export function register(events) {
	events.addEventListener('draw:pre', ({ delta, time }) => {
		fakeLifecycleCallback('componentWillDraw', delta, time);

		const event = { delta, time };
		for (const onUpdate of onUpdates) {
			onUpdate(event);
		}
	});
}

export function getPropTypes() {
	return {
		onUpdate: PropTypes.func,
	};
}

export function setup(target, newProps) {
	if (typeof newProps.onUpdate === 'function') {
		onUpdates.add(newProps.onUpdate);
	}
}

export function update(target, oldProps, newProps) {
	if (oldProps.onUpdate !== newProps.onUpdate) {
		if (typeof newProps.onUpdate === 'function') {
			onUpdates.add(newProps.onUpdate);
		}

		if (typeof oldProps.onUpdate === 'function') {
			onUpdates.delete(oldProps.onUpdate);
		}
	}
}

export function teardown(target, oldProps) {
	if (typeof oldProps.onUpdate === 'function') {
		onUpdates.delete(oldProps.onUpdate);
	}
}
