const specials = {
	Shift: 'shift',
	Meta: 'meta',
	Alt: 'alt',
	Control: 'control',
};

const state = {};

export default function pluginKeys(context) {
	for (const key in specials) {
		if (!state.hasOwnProperty(key)) {
			state[specials[key]] = false;
		}
	}

	window.addEventListener('wheel', ({ deltaX, deltaY }) => {
		context.bubble('wheel', { deltaX, deltaY });
	});

	window.addEventListener('keypress', ({ key }) => {
		context.bubble('keypress', key);
	});

	window.addEventListener('keydown', ({ key }) => {
		context.bubble('keydown', key);

		if (specials[key]) {
			state[specials[key]] = true;
		}
	});

	window.addEventListener('keyup', ({ key }) => {
		context.bubble('keyup', key);

		if (specials[key]) {
			state[specials[key]] = false;
		}
	});

	context.on('update', (event) => {
		event.keys = state;
	});
}
