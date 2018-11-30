import PropTypes from 'prop-types';
import ThreePropTypes from '../three-prop-types';
import Component from './lib/base-component';

import { AmbientLight } from 'three';

export default class HedraAmbientLight extends Component {
	static propTypes = {
		...Component.propTypes,
		color: ThreePropTypes.color,
		intensity: PropTypes.number,
	}

	constructor(props) {
		const { color, intensity } = props;
		const internal = new AmbientLight(color, intensity);

		super(props, internal);
	}
}
