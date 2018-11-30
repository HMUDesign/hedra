import ThreePropTypes from '../three-prop-types';
import Component from './lib/base-component';

import { Mesh } from 'three';

export default class HedraMesh extends Component {
	static propTypes = {
		...Component.propTypes,
		geometry: ThreePropTypes.geometry.isRequired,
		material: ThreePropTypes.material.isRequired,
	}

	constructor(props) {
		const { geometry, material } = props;
		const internal = new Mesh(geometry, material);

		super(props, internal);
	}
}
