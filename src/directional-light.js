import PropTypes from 'prop-types'
import { DirectionalLight, DirectionalLightHelper } from 'three'
import ThreePropTypes from '../three-prop-types'
import Component from './lib/base-component'

export default class HedraDirectionalLight extends Component {
  static propTypes = {
    ...Component.propTypes,
    helper: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
    color: ThreePropTypes.color,
    intensity: PropTypes.number,
  }

  constructor(props) {
    const { color, intensity } = props
    const internal = new DirectionalLight(color, intensity)

    const { helper } = props
    if (helper) {
      internal.helper = new DirectionalLightHelper(internal, typeof helper === 'number' ? helper : 1)
      internal.add(internal.helper)
    }

    super(props, internal)
  }
}
