import PropTypes from 'prop-types'
import { RectAreaLight, RectAreaLightHelper } from 'three'
import ThreePropTypes from '../three-prop-types'
import Component from './lib/base-component'

export default class HedraRectAreaLight extends Component {
  static propTypes = {
    ...Component.propTypes,
    helper: PropTypes.bool,
    color: ThreePropTypes.color,
    intensity: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  constructor(props) {
    const { color, intensity, width, height } = props
    const internal = new RectAreaLight(color, intensity, width, height)

    const { helper } = props
    if (helper) {
      internal.helper = new RectAreaLightHelper(internal)
      internal.add(internal.helper)
    }

    super(props, internal)
  }
}
