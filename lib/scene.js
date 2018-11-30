import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { HedraContextProvider } from './lib/context';

import { notify as notifyPlugins } from './plugins';
import { updateVector3 } from './lib/updaters';

import { PerspectiveCamera, Camera, Scene, WebGLRenderer, Clock, Vector3 } from 'three';
import Stats from 'stats.js';
import TWEEN from '@tweenjs/tween.js';

// eslint-disable-next-line react/no-unsafe
export default class HedraScene extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		fullscreen: PropTypes.bool.isRequired,
		pause: PropTypes.bool.isRequired,
		stats: PropTypes.bool.isRequired,
		camera: PropTypes.oneOfType([
			PropTypes.instanceOf(Camera),
			PropTypes.instanceOf(Vector3),
			PropTypes.instanceOf(Array),
		]).isRequired,
	}

	static defaultProps = {
		fullscreen: false,
		pause: false,
		stats: false,
		camera: new Vector3(0, 0, 1.5),
	}

	constructor(props) {
		super(props);

		this.clock = new Clock(false);
		this.scene = new Scene();

		const { camera } = this.props;
		if (camera instanceof Camera) {
			this.camera = camera;
			this.add(this.camera);
		}
		else {
			this.camera = new PerspectiveCamera(75, 1, 0.1, 1000);
			this.add(this.camera);
			updateVector3(this.camera.position, camera);
			this.camera.lookAt(this.scene.position);
		}

		this.renderer = new WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		this.renderer.setClearColor(0x000000, 0);
		this.renderer.setPixelRatio(window.devicePixelRatio);

		this.resize();

		const { stats } = this.props;
		if (stats) {
			this.stats = new Stats();
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.resize, false);

		const { pause } = this.props;
		if (pause) {
			window.addEventListener('focus', this.play, false);
			window.addEventListener('blur', this.pause, false);
		}

		this.play();
	}

	UNSAFE_componentWillUpdate(props) {
		const { pause } = this.props;
		if (pause !== props.pause) {
			if (props.pause) {
				window.addEventListener('focus', this.play, false);
				window.addEventListener('blur', this.pause, false);
			}
			else {
				window.removeEventListener('blur', this.pause, false);
				window.removeEventListener('focus', this.play, false);
			}
		}

		const { stats } = this.props;
		if (stats !== props.stats) {
			if(this.stats) {
				this.stats.domElement.remove();
				delete this.stats;
			}

			if (props.stats) {
				this.stats = new Stats();
			}
		}

		const { camera } = this.props;
		if (camera !== props.camera) {
			if (props.camera instanceof Camera) {
				this.remove(this.camera);
				this.camera = props.camera;
				this.add(this.camera);
			}
			else {
				updateVector3(this.camera.position, props.camera);
				this.camera.lookAt(this.scene.position);
			}
		}
	}

	componentDidUpdate() {
		this.resize();
	}

	componentWillUnmount() {
		this.pause();

		window.removeEventListener('resize', this.resize, false);

		const { pause } = this.props;
		if (pause) {
			window.removeEventListener('blur', this.pause, false);
			window.removeEventListener('focus', this.play, false);
		}
	}

	handleMount = (el) => {
		this.container = el;

		if (el) {
			el.appendChild(this.renderer.domElement);

			if (this.stats) {
				el.appendChild(this.stats.domElement);
			}

			notifyPlugins({ type: 'mount', app: this });
		}
		else {
			this.renderer.domElement.remove();

			if (this.stats) {
				this.stats.domElement.remove();
			}

			notifyPlugins({ type: 'unmount', app: this });
		}
	}

	add(child) {
		return this.scene.add(child);
	}

	remove(child) {
		return this.scene.remove(child);
	}

	play = () => {
		this.clock.start();
		requestAnimationFrame(this._draw);

		const time = this.clock.getElapsedTime();
		notifyPlugins({ type: 'play', app: this, time });
	}

	pause = () => {
		this.clock.stop();

		const time = this.clock.getElapsedTime();
		notifyPlugins({ type: 'pause', app: this, time });
	}

	resize = () => {
		const { fullscreen } = this.props;

		const width  = fullscreen ? window.innerWidth  : this.container.parentNode.offsetWidth;
		const height = fullscreen ? window.innerHeight : this.container.parentNode.offsetHeight;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(width, height);
	}

	_draw = () => {
		if (this.clock.running) {
			requestAnimationFrame(this._draw);
		}

		const delta = this.clock.getDelta();
		const time = this.clock.getElapsedTime();

		TWEEN.update(time);

		notifyPlugins({ type: 'draw:pre', app: this, delta, time });
		this.renderer.render(this.scene, this.camera);
		notifyPlugins({ type: 'draw:post', app: this, delta, time });

		if (this.stats) {
			this.stats.update();
		}
	}

	render() {
		const { children } = this.props;

		return (
			<HedraContextProvider value={this}>
				<div ref={this.handleMount}>
					{children}
				</div>
			</HedraContextProvider>
		);
	}
}