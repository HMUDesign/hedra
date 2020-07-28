import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { PerspectiveCamera, Camera, Scene, WebGLRenderer, Clock, Vector3 } from 'three'
import { HedraContextProvider } from './lib/context'

import { updateVector3 } from './lib/updaters'
import {
  getScenePropTypes,
  setupScene,
  updateScene,
  teardownScene,
  preDrawScene,
  postDrawScene,
  playScene,
  pauseScene,
} from './plugins'

// eslint-disable-next-line react/no-unsafe
export default class HedraScene extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    camera: PropTypes.oneOfType([
      PropTypes.instanceOf(Camera),
      PropTypes.instanceOf(Vector3),
      PropTypes.instanceOf(Array),
    ]).isRequired,

    ...getScenePropTypes(),
  }

  static defaultProps = {
    camera: new Vector3(0, 0, 1.5),
  }

  constructor(props) {
    super(props)

    this.plugins = {}

    this.clock = new Clock(false)
    this.scene = new Scene()

    const { camera } = this.props
    if (camera instanceof Camera) {
      this.camera = camera
      this.add(this.camera)
    } else {
      this.camera = new PerspectiveCamera(75, 1, 0.1, 1000)
      this.add(this.camera)
      updateVector3(this.camera.position, camera)
      this.camera.lookAt(this.scene.position)
    }

    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  componentDidMount() {
    this.play()
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUpdate(newProps) {
    const { camera } = this.props
    if (camera !== newProps.camera) {
      if (newProps.camera instanceof Camera) {
        this.remove(this.camera)
        this.camera = newProps.camera
        this.add(this.camera)
      } else {
        updateVector3(this.camera.position, newProps.camera)
        this.camera.lookAt(this.scene.position)
      }
    }

    updateScene(this, this.props, newProps)
  }

  componentWillUnmount() {
    this.pause()
  }

  handleMount = (el) => {
    this.container = el

    if (el) {
      el.appendChild(this.renderer.domElement)
      setupScene(this, this.props)
    } else {
      teardownScene(this, this.props)
      this.renderer.domElement.remove()
    }
  }

  add(child) {
    return this.scene.add(child)
  }

  remove(child) {
    return this.scene.remove(child)
  }

  play = () => {
    this.clock.start()
    requestAnimationFrame(this._draw)

    const time = this.clock.getElapsedTime()
    playScene(this, time)
  }

  pause = () => {
    this.clock.stop()

    const time = this.clock.getElapsedTime()
    pauseScene(this, time)
  }

  _draw = () => {
    if (this.clock.running) {
      requestAnimationFrame(this._draw)
    }

    const delta = this.clock.getDelta()
    const time = this.clock.getElapsedTime()

    preDrawScene(this, delta, time)
    this.renderer.render(this.scene, this.camera)
    postDrawScene(this, delta, time)
  }

  render() {
    const { children } = this.props

    return (
      <HedraContextProvider value={this}>
        <div ref={this.handleMount}>
          {children}
        </div>
      </HedraContextProvider>
    )
  }
}