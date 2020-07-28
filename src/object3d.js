import Component from './lib/base-component';

import { Object3D } from 'three';

export default class HedraObject3D extends Component {
	static propTypes = {
		...Component.propTypes,
	}

	constructor(props) {
		const internal = new Object3D();

		super(props, internal);
	}
}
