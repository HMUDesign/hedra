import PropTypes from 'prop-types';
import ThreePropTypes from '../three-prop-types';
import Component from './lib/base-component';

import { PointLight, PointLightHelper } from 'three';

export default class HedraPointLight extends Component {
	static propTypes = {
		...Component.propTypes,
		helper: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.number,
		]),
		color: ThreePropTypes.color,
		intensity: PropTypes.number,
		distance: PropTypes.number,
		decay: PropTypes.number,
	}

	constructor(props) {
		const { color, intensity, distance, decay } = props;
		const internal = new PointLight(color, intensity, distance, decay);

		const { helper } = props;
		if (helper) {
			internal.helper = new PointLightHelper(internal, typeof helper === 'number' ? helper : 1);
			internal.add(internal.helper);
		}

		super(props, internal);
	}
}
