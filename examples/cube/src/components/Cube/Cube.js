import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { TextureLoader, BoxGeometry, MeshPhongMaterial } from 'three'

import { Component, Mesh } from '@hmudesign/hedra'
import crateTexture from './assets/crate.gif'

export default class Cube extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      z: 0,
    }

    const { size } = this.props
    this.geometry = new BoxGeometry(size, size, size)

    const textureLoader = new TextureLoader()
    const texture = textureLoader.load(crateTexture)
    this.material = new MeshPhongMaterial({ color: 0xffffff, map: texture })
  }

  handleClick = ({ target }) => {
    console.log('clicked!', target) // eslint-disable-line no-console
  }

  handleKeyPress = (event) => {
    console.log('keypress', event) // eslint-disable-line no-console
  }

  componentWillDraw(delta) {
    const { x, z } = this.state
    this.setState({
      x: x + Math.PI / 2 * delta,
      z: z + Math.PI / 2 * delta,
    })
  }

  render() {
    const props = _.omit(this.props, [ 'size' ])
    const { x, z } = this.state

    return (
      <Mesh
        {...props}
        name="center cube"
        geometry={this.geometry}
        material={this.material}

        rotation={[ 0, 0, z ]}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
      >
        <Mesh
          name="offset cube"
          geometry={this.geometry}
          material={this.material}

          position={[ 1, 0, 0 ]}
          rotation={[ x, 0, 0 ]}
        />
      </Mesh>
    )
  }
}
