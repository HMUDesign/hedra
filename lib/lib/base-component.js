import PropTypes from 'prop-types';
import ThreePropTypes from '../../three-prop-types';
import React, { Component } from 'react';
import { updateVector3, updateEuler } from './updaters';
import {
	getObjectPropTypes,
	setup as setupPlugins,
	update as updatePlugins,
	teardown as teardownPlugins,
} from '../plugins';

import { HedraContextType, HedraContextProvider } from './context';
import TWEEN from '@tweenjs/tween.js';
import TweenPromise from './tween-promise';

// eslint-disable-next-line react/no-unsafe
export default class HedraBaseComponent extends Component {
	static contextType = HedraContextType;

	static propTypes = {
		children: PropTypes.node,
		name: PropTypes.string,

		position: ThreePropTypes.position,
		rotation: ThreePropTypes.rotation,
		scale: ThreePropTypes.scale,

		...getObjectPropTypes(),
	}

	constructor(props, internal) {
		super(props);

		const { name } = this.props;
		this._ = internal;
		this._._ = this;
		if (!this._.name) {
			this._.name = name;
		}

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
		setupPlugins(this._, this.props);

		const parent = this.context;
		parent.add(this._);
	}

	UNSAFE_componentWillUpdate(props) {
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

		updatePlugins(this._, this.props, props);
	}

	componentWillUnmount() {
		const parent = this.context;
		parent.remove(this._);

		teardownPlugins(this._, this.props);
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
