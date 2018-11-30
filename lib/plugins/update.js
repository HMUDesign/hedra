import PropTypes from 'prop-types';
import { fakeLifecycleCallback } from '../component';
import Handlers from './lib/handlers';

const onUpdates = new Handlers();

export function register(events) {
	events.addEventListener('draw:pre', ({ delta, time }) => {
		fakeLifecycleCallback('componentWillDraw', delta, time);

		onUpdates.run({ delta, time });
	});
}

export function getPropTypes() {
	return {
		onUpdate: PropTypes.func,
	};
}

export function setup(target, newProps) {
	onUpdates.add(newProps.onUpdate);
}

export function update(target, oldProps, newProps) {
	if (oldProps.onUpdate !== newProps.onUpdate) {
		onUpdates.delete(oldProps.onUpdate);
		onUpdates.add(newProps.onUpdate);
	}
}

export function teardown(target, oldProps) {
	onUpdates.delete(oldProps.onUpdate);
}
