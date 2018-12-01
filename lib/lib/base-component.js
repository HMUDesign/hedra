import PropTypes from 'prop-types';
import ThreePropTypes from '../../three-prop-types';
import React, { Component } from 'react';
import { updateVector3, updateEuler } from './updaters';
import {
	getObjectPropTypes,
	setupObject,
	updateObject,
	teardownObject,
} from '../plugins';

import { HedraContextType, HedraContextProvider } from './context';

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

		this.plugins = {};

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
		setupObject(this, this.props);

		const parent = this.context;
		parent.add(this._);
	}

	UNSAFE_componentWillUpdate(newProps) {
		const { position, rotation, scale } = this.props;

		if (position !== newProps.position) {
			if (typeof newProps.position !== 'undefined') {
				this.position = newProps.position;
			}
		}

		if (rotation !== newProps.rotation) {
			if (typeof newProps.rotation !== 'undefined') {
				this.rotation = newProps.rotation;
			}
		}

		if (scale !== newProps.scale) {
			if (typeof newProps.scale !== 'undefined') {
				this.scale = newProps.scale;
			}
		}

		updateObject(this, this.props, newProps);
	}

	componentWillUnmount() {
		const parent = this.context;
		parent.remove(this._);

		teardownObject(this, this.props);
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

	render() {
		const { children } = this.props;

		return (
			<HedraContextProvider value={this}>
				{children}
			</HedraContextProvider>
		);
	}
}
