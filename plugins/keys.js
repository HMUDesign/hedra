export default function pluginKeys(context) {
	window.addEventListener('keydown', ({ key }) => {
		context.emit('key', key);
	});
}
