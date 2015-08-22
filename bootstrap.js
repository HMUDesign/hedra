import debug from 'debug';
window.debug = debug;

export default function(App) {
	window.onload = function() {
		App.load().then(() => {
			window.app = new App({ parent: document.body });
		});
	};
}
