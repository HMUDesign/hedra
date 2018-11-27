import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BoxGeometry, MeshNormalMaterial } from 'three';

import { HedraObject } from '@hmudesign/hedra';

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

	handleUpdate1 = ({ target, delta }) => {
		target.rotation.z += Math.PI / 2 * delta;
	}

	handleUpdate2 = ({ target, delta }) => {
		target.rotation.x += Math.PI / 2 * delta;
	}

	render() {
		const props = _.omit(this.props, [ 'size' ]);

		return (
			<HedraObject
				{...props}

				type="Mesh"
				geometry={this.geometry}
				material={this.material}

				onUpdate={this.handleUpdate1}
			>
				<HedraObject
					type="Mesh"
					geometry={this.geometry}
					material={this.material}

					onUpdate={this.handleUpdate2}

					position={[ 1, 0, 0 ]}
				/>
			</HedraObject>
		);
	}
}
