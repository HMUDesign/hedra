import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { TextureLoader, BoxGeometry, MeshPhongMaterial } from 'three';

import crateTexture from './assets/crate.gif';

import { Component, Mesh } from '@hmudesign/hedra';

export default class Cube extends Component {
	static propTypes = {
		size: PropTypes.number.isRequired,
	}

	constructor(props) {
		super(props);

		const { size } = this.props;
		this.geometry = new BoxGeometry(size, size, size);

		const textureLoader = new TextureLoader();
		const texture = textureLoader.load(crateTexture);
		this.material = new MeshPhongMaterial({ color: 0xffffff, map: texture });
	}

	state = {
		x: 0,
		z: 0,
	}

	componentWillDraw(delta) {
		const { x, z } = this.state;
		this.setState({
			x: x + Math.PI / 2 * delta,
			z: z + Math.PI / 2 * delta,
		});
	}

	handleClick = ({ target }) => {
		console.log('clicked!', target); // eslint-disable-line no-console
	}

	render() {
		const props = _.omit(this.props, [ 'size' ]);
		const { x, z } = this.state;

		return (
			<Mesh
				{...props}
				geometry={this.geometry}
				material={this.material}

				rotation={[ 0, 0, z ]}
				onClick={this.handleClick}
			>
				<Mesh
					geometry={this.geometry}
					material={this.material}

					position={[ 1, 0, 0 ]}
					rotation={[ x, 0, 0 ]}
				/>
			</Mesh>
		);
	}
}
