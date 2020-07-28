/* eslint-disable react/destructuring-assignment */

import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Scene } from 'three'

import { HedraProvider } from '../helpers/context'

export default function HedraScene({ children }) {
  const canvas = useRef()

  const context = useRef()
  if (!context.current) {
    const scene = new Scene()

    context.current = {
      plugins: {},
      canvas,
      scene,
      add(child) {
        return scene.add(child)
      },
      remove(child) {
        return scene.remove(child)
      },
    }
  }

  return (
    <HedraProvider value={context.current}>
      <canvas ref={canvas} />
      {children}
    </HedraProvider>
  )
}

HedraScene.propTypes = {
  children: PropTypes.node,
}
