import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Component, HedraObject } from '@hmudesign/hedra';

import { BoxGeometry, MeshNormalMaterial } from 'three';

export default class Cube extends Component {
	static propTypes = {
		size: PropTypes.number.isRequired,
	}

	constructor(props) {
		super(props);

		const { size } = this.props;
		this.geometry = new BoxGeometry(size, size, size);
		this.material = new MeshNormalMaterial();
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
			<HedraObject
				{...props}

				type="Mesh"
				geometry={this.geometry}
				material={this.material}

				onClick={this.handleClick}

				rotation={[ 0, 0, z ]}
			>
				<HedraObject
					type="Mesh"
					geometry={this.geometry}
					material={this.material}

					position={[ 1, 0, 0 ]}
					rotation={[ x, 0, 0 ]}
				/>
			</HedraObject>
		);
	}
}
