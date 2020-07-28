import ThreePropTypes from '../three-prop-types'
import Component from './lib/base-component'

// eslint-disable-next-line react/no-unsafe
export default class HedraRaw extends Component {
  static propTypes = {
    ...Component.propTypes,
    object: ThreePropTypes.object3d,
  }

  constructor(props) {
    const { object } = props
    super(props, object)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUpdate(newProps) {
    const { object } = this.props

    if (object !== newProps.object) {
      this.applyObject(newProps.object, newProps)

      if (this._) {
        const parent = this.context
        parent.add(this._)
      }
    }

    // eslint-disable-next-line new-cap
    super.UNSAFE_componentWillUpdate(newProps)
  }
}
