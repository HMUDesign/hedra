import PropTypes from 'prop-types';
import ThreePropTypes from '../three-prop-types';
import Component from './lib/base-component';

import { HemisphereLight, HemisphereLightHelper } from 'three';

export default class HedraHemisphereLight extends Component {
	static propTypes = {
		...Component.propTypes,
		helper: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.number,
		]),
		skyColor: ThreePropTypes.color,
		groundColor: ThreePropTypes.color,
		intensity: PropTypes.number,
	}

	constructor(props) {
		const { skyColor, groundColor, intensity } = props;
		const internal = new HemisphereLight(skyColor, groundColor, intensity);

		const { helper } = props;
		if (helper) {
			internal.helper = new HemisphereLightHelper(internal, typeof helper === 'number' ? helper : 1);
			internal.add(internal.helper);
		}

		super(props, internal);
	}
}
