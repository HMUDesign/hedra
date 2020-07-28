import PropTypes from 'prop-types'
import React, { Component } from 'react'
// import ThreePropTypes from '../../three-prop-types'
import { updateVector3, updateEuler } from './updaters'
import {
  getObjectPropTypes,
  setupObject,
  updateObject,
  teardownObject,
} from '../plugins'

import { HedraContextType, HedraContextProvider } from './context'

// eslint-disable-next-line react/no-unsafe
export default class HedraBaseComponent extends Component {
  static contextType = HedraContextType;

  static propTypes = {
    children: PropTypes.node,
    // name: PropTypes.string,

    // position: ThreePropTypes.position,
    // rotation: ThreePropTypes.rotation,
    // scale: ThreePropTypes.scale,

    ...getObjectPropTypes(),
  }

  constructor(props, object) {
    super(props)

    this.plugins = {}

    this.applyObject(object, props)
  }

  componentDidMount() {
    setupObject(this, this.props)

    if (this._) {
      const parent = this.context
      parent.add(this._)
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUpdate(newProps) {
    if (this._) {
      this.updateProps(this.props, newProps)
    }

    updateObject(this, this.props, newProps)
  }

  componentWillUnmount() {
    if (this._) {
      const parent = this.context
      parent.remove(this._)
    }

    teardownObject(this, this.props)
  }

  updateProps(oldProps, newProps) {
    if (oldProps.position !== newProps.position) {
      if (typeof newProps.position !== 'undefined') {
        this.position = newProps.position
      }
    }

    if (oldProps.rotation !== newProps.rotation) {
      if (typeof newProps.rotation !== 'undefined') {
        this.rotation = newProps.rotation
      }
    }

    if (oldProps.scale !== newProps.scale) {
      if (typeof newProps.scale !== 'undefined') {
        this.scale = newProps.scale
      }
    }
  }

  applyObject(object, props) {
    if (this._ && this._.parent) {
      this._.parent.remove(this._)
    }

    const { name } = props
    this._ = object
    if (!this._) {
      return
    }

    this._._ = this
    if (!this._.name) {
      this._.name = name
    }

    const { position, rotation, scale } = props
    if (typeof position !== 'undefined') {
      this.position = position
    }
    if (typeof rotation !== 'undefined') {
      this.rotation = rotation
    }
    if (typeof scale !== 'undefined') {
      this.scale = scale
    }
  }

  get position() {
    return this._.position
  }

  set position(position) {
    updateVector3(this._.position, position)
  }

  get rotation() {
    return this._.rotation
  }

  set rotation(rotation) {
    updateEuler(this._.rotation, rotation)
  }

  get scale() {
    return this._.scale
  }

  set scale(scale) {
    updateVector3(this._.scale, scale)
  }

  add(child) {
    return this._.add(child)
  }

  remove(child) {
    return this._.remove(child)
  }

  render() {
    const { children } = this.props

    return (
      <HedraContextProvider value={this}>
        {children}
      </HedraContextProvider>
    )
  }
}
