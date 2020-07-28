import PropTypes from 'prop-types'
import { SpotLight, SpotLightHelper } from 'three'
import ThreePropTypes from '../three-prop-types'
import Component from './lib/base-component'

export default class HedraSpotLight extends Component {
  static propTypes = {
    ...Component.propTypes,
    helper: PropTypes.bool,
    color: ThreePropTypes.color,
    intensity: PropTypes.number,
    distance: PropTypes.number,
    angle: PropTypes.number,
    penumbra: PropTypes.number,
    decay: PropTypes.number,
  }

  constructor(props) {
    const { color, intensity, distance, angle, penumbra, decay } = props
    const internal = new SpotLight(color, intensity, distance, angle, penumbra, decay)

    const { helper } = props
    if (helper) {
      internal.helper = new SpotLightHelper(internal)
      internal.add(internal.helper)
    }

    super(props, internal)
  }
}
