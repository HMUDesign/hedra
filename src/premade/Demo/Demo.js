import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import { Scene, useRoot, usePerspectiveCamera, useWebGLRenderer } from '@hmudesign/hedra'
import { DefaultLoadingManager } from 'three'

function Defaults() {
  usePerspectiveCamera({ position: [ 0, 1, 2 ] })
  useWebGLRenderer()

  const hedra = useRoot()
  useEffect(() => {
    hedra.draw()

    DefaultLoadingManager.onLoad = () => {
      hedra.draw()
    }
  }, [ hedra ])

  return null
}

export default function Demo({ defaults = true, children }) {
  return (
    <Scene
      width={512}
      height={512}
      style={{
        display: 'block',
        width: '512px',
        height: '512px',
        margin: '0 auto',
      }}
    >
      {children}
      { defaults && <Defaults /> }
    </Scene>
  )
}

Demo.propTypes = {
  defaults: PropTypes.bool,
  children: PropTypes.node,
}
