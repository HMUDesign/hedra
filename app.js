import { PerspectiveCamera, Scene, WebGLRenderer, Clock, Vector3 } from 'three';
import Stats from 'stats.js';
import TWEEN from '@tweenjs/tween.js';
import HedraComponent from './component';

export default class HedraApp extends HedraComponent {
	constructor(config) {
		config.type = null;
		config.parent = config.parent || document.body;

		if (!config.width && !config.height) {
			config.width  = parent === document.body ? window.innerWidth  : parent.offsetWidth;
			config.height = parent === document.body ? window.innerHeight : parent.offsetHeight;
		}

		super(config);

		if (config.stats !== false) {
			this.stats = new Stats();

			this.stats.domElement.style.position = 'absolute';
			this.stats.domElement.style.top  = '0';
			this.stats.domElement.style.left = '0';
			config.parent.appendChild(this.stats.domElement);
		}

		this.camera = new PerspectiveCamera(75, config.width / config.height, 0.1, 1000);
		this.camera.position.copy(config.camera || new Vector3(0, 0, 0));

		this.scene = this._ = new Scene();
		this.scene.add(this.camera);

		this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
		this.renderer.setClearColor(0x000000, 0);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(config.width, config.height);

		this.renderer.domElement.style.display = 'block';
		config.parent.appendChild(this.renderer.domElement);

		this.clock = new Clock(false);

		if (config.pause) {
			window.addEventListener('focus', this.play, false);
			window.addEventListener('blur', this.pause, false);
		}

		setTimeout(this.play, 0);

		if (typeof TWEEN !== 'undefined') {
			TWEEN._time = 0;
			this.on('update').then((e) => {
				TWEEN._time = e.time;
				TWEEN.update(e.time);
			});
		}
	}

	destroy() {
		this.pause();

		window.removeEventListener('focus', this.play, false);
		window.removeEventListener('blur', this.pause, false);
		this.renderer.domElement.remove();

		if (this.stats) {
			this.stats.domElement.remove();
		}
	}

	_animate = () => {
		if (this.clock.running) {
			requestAnimationFrame(this._animate);
		}

		this.render(this.clock.getDelta(), this.clock.getElapsedTime());

		return this;
	}

	use(plugin, config) {
		plugin(this, config);

		return this;
	}

	play = () => {
		this.clock.start();
		requestAnimationFrame(this._animate);

		return this;
	}

	pause = () => {
		this.clock.stop();

		return this;
	}

	render(delta = 0, time = 0) {
		this.bubble('update', { delta, time });

		this.renderer.render(this.scene, this.camera);

		if (this.stats) {
			this.stats.update();
		}

		return this;
	}
}
