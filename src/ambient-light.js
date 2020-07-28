import PropTypes from 'prop-types'
import { AmbientLight } from 'three'
import ThreePropTypes from '../three-prop-types'
import Component from './lib/base-component'

export default class HedraAmbientLight extends Component {
  static propTypes = {
    ...Component.propTypes,
    color: ThreePropTypes.color,
    intensity: PropTypes.number,
  }

  constructor(props) {
    const { color, intensity } = props
    const internal = new AmbientLight(color, intensity)

    super(props, internal)
  }
}
