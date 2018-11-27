import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { updateVector3, updateEuler } from './lib/updaters';

import { HedraContextType, HedraContextProvider } from './context';
import { Object3D, Mesh, Vector3, Euler } from 'three';
import TWEEN from '@tweenjs/tween.js';
import TweenPromise from './lib/tween-promise';

const TYPES = {
	Object3D: () => new Object3D(),
	Mesh: ({ geometry, material }) => {
		if (!geometry) {
			throw new Error('HedraObject::Mesh: You must specify geometry.');
		}

		if (!material) {
			throw new Error('HedraObject::Mesh: You must specify material.');
		}

		return new Mesh(geometry, material);
	},
};

// eslint-disable-next-line react/no-unsafe
export default class HedraObject extends Component {
	static contextType = HedraContextType;

	static propTypes = {
		children: PropTypes.node,
		type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,

		onUpdate: PropTypes.func,

		position: PropTypes.oneOfType([
			PropTypes.instanceOf(Vector3),
			PropTypes.instanceOf(Array),
		]),
		rotation: PropTypes.oneOfType([
			PropTypes.instanceOf(Euler),
			PropTypes.instanceOf(Array),
		]),
		scale: PropTypes.oneOfType([
			PropTypes.instanceOf(Vector3),
			PropTypes.instanceOf(Array),
			PropTypes.number,
		]),
	}

	static defaultProps = {
		type: 'Object3D',
	}

	constructor(props) {
		super(props);

		const { type } = this.props;
		this._ = TYPES[type](this.props);
		this._._ = this;

		const { position, rotation, scale } = this.props;
		if (typeof position !== 'undefined') {
			this.position = position;
		}
		if (typeof rotation !== 'undefined') {
			this.rotation = rotation;
		}
		if (typeof scale !== 'undefined') {
			this.scale = scale;
		}
	}

	componentDidMount() {
		const { onUpdate } = this.props;
		if (typeof onUpdate !== 'undefined') {
			this._.addEventListener('update', onUpdate);
		}

		const parent = this.context;
		parent.add(this._);
	}

	UNSAFE_componentWillUpdate(props) {
		const { type } = this.props;
		if (type !== props.type) {
			console.error('A HedraObject component is changing type. Once a HedraObject component is rendered, it\'s type must not change.'); // eslint-disable-line no-console
		}

		const { onUpdate } = this.props;
		if (onUpdate !== props.onUpdate) {
			if (typeof onUpdate !== 'undefined') {
				this._.removeEventListener('update', onUpdate);
			}
			if (typeof props.onUpdate !== 'undefined') {
				this._.addEventListener('update', props.onUpdate);
			}
		}

		const { position, rotation, scale } = this.props;
		if (position !== props.position) {
			if (typeof props.position !== 'undefined') {
				this.position = props.position;
			}
		}
		if (rotation !== props.rotation) {
			if (typeof props.rotation !== 'undefined') {
				this.rotation = props.rotation;
			}
		}
		if (scale !== props.scale) {
			if (typeof props.scale !== 'undefined') {
				this.scale = props.scale;
			}
		}
	}

	componentWillUnmount() {
		const parent = this.context;
		parent.remove(this._);

		const { onUpdate } = this.props;
		if (typeof onUpdate !== 'undefined') {
			this._.removeEventListener('update', onUpdate);
		}
	}

	get position() {
		return this._.position;
	}
	set position(position) {
		updateVector3(this._.position, position);
	}

	get rotation() {
		return this._.rotation;
	}
	set rotation(rotation) {
		updateEuler(this._.rotation, rotation);
	}

	get scale() {
		return this._.scale;
	}
	set scale(scale) {
		updateVector3(this._.scale, scale);
	}

	add(child) {
		return this._.add(child);
	}

	remove(child) {
		return this._.remove(child);
	}

	tween({ target, duration, easing }) {
		const tween = new TWEEN.Tween(this);
		tween.to(target, duration);

		if (typeof easing !== 'undefined') {
			tween.easing(easing);
		}

		return new TweenPromise(tween);
	}

	render() {
		const { children } = this.props;

		return (
			<HedraContextProvider value={this}>
				{children}
			</HedraContextProvider>
		);
	}
}
