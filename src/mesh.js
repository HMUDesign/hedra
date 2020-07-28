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

	updateProps(oldProps, newProps) {
		super.updateProps(oldProps, newProps);

		if (oldProps.geometry !== newProps.geometry) {
			this.geometry = newProps.geometry;
		}

		if (oldProps.material !== newProps.material) {
			this.material = newProps.material;
		}
	}

	get geometry() {
		return this._.geometry;
	}
	set geometry(geometry) {
		return this._.geometry = geometry;
	}

	get material() {
		return this._.material;
	}
	set material(material) {
		return this._.material = material;
	}
}
