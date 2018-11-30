import PropTypes from 'prop-types';
import Handlers from './lib/handlers';

const onKeyDowns = new Handlers();
const onKeyUps = new Handlers();
const onKeyPresses = new Handlers();
const onWheels = new Handlers();

const modifierNames = {
	Alt: 'alt',
	Control: 'control',
	Meta: 'meta',
	Shift: 'shift',
};

const modifiers = {};
for (const key in modifierNames) {
	modifiers[modifierNames[key]] = false;
}

export function register(events) {
	const listeners = {
		keydown: ({ key }) => {
			if (modifierNames[key]) {
				modifiers[modifierNames[key]] = true;
			}

			return onKeyDowns.run({ key, modifiers: { ...modifiers } });
		},
		keyup: ({ key }) => {
			if (modifierNames[key]) {
				modifiers[modifierNames[key]] = false;
			}

			return onKeyUps.run({ key, modifiers: { ...modifiers } });
		},
		keypress: ({ key }) => {
			return onKeyPresses.run({ key, modifiers: { ...modifiers } });
		},
		wheel: ({ deltaX, deltaY }) => {
			return onWheels.run({ deltaX, deltaY, modifiers: { ...modifiers } });
		},
	};

	events.addEventListener('mount', ({ app }) => {
		for (const event in listeners) {
			window.addEventListener(event, listeners[event], false);
		}
	});

	events.addEventListener('unmount', ({ app }) => {
		for (const event in listeners) {
			window.removeEventListener(event, listeners[event], false);
		}
	});
}

export function getPropTypes() {
	return {
		onKeyDown: PropTypes.func,
		onKeyUp: PropTypes.func,
		onKeyPress: PropTypes.func,
		onWheel: PropTypes.func,
	};
}

export function setup(target, newProps) {
	onKeyDowns.add(newProps.onKeyDown);
	onKeyUps.add(newProps.onKeyUp);
	onKeyPresses.add(newProps.onKeyPress);
	onWheels.add(newProps.onWheel);
}

export function update(target, oldProps, newProps) {
	if (oldProps.onKeyDown !== newProps.onKeyDown) {
		onKeyDowns.delete(oldProps.onKeyDown);
		onKeyDowns.add(newProps.onKeyDown);
	}

	if (oldProps.onKeyUp !== newProps.onKeyUp) {
		onKeyUps.delete(oldProps.onKeyUp);
		onKeyUps.add(newProps.onKeyUp);
	}

	if (oldProps.onKeyPress !== newProps.onKeyPress) {
		onKeyPresses.delete(oldProps.onKeyPress);
		onKeyPresses.add(newProps.onKeyPress);
	}

	if (oldProps.onWheel !== newProps.onWheel) {
		onWheels.delete(oldProps.onWheel);
		onWheels.add(newProps.onWheel);
	}
}

export function teardown(target, oldProps) {
	onKeyDowns.delete(oldProps.onKeyDown);
	onKeyUps.delete(oldProps.onKeyUp);
	onKeyPresses.delete(oldProps.onKeyPress);
	onWheels.delete(oldProps.onWheel);
}
