import { Object3D } from 'three'
import Component from './lib/base-component'

export default class HedraObject3D extends Component {
  static propTypes = {
    ...Component.propTypes,
  }

  constructor(props) {
    const internal = new Object3D()

    super(props, internal)
  }
}
