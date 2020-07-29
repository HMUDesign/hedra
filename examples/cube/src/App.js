import React from 'react'

import {
  useCamera,
  useClock,
  useWebGLRenderer,

  AmbientLight,
  DirectionalLight,
} from '@hmudesign/hedra'

import Cube from './components/Cube'

export default function App() {
  useCamera([ 0, 0, 2 ])
  useClock()
  useWebGLRenderer()

  return (
    <>
      <AmbientLight
        name="Ambient light"
        color="white"
        intensity={0.2}
      />
      <DirectionalLight
        name="Key light"
        helper

        color="white"
        intensity={0.7}
        position={[ -8, 6, 8 ]}
      />
      <DirectionalLight
        name="Fill light"
        helper

        color="white"
        intensity={0.3}
        position={[ 8, 4, 4 ]}
      />
      <DirectionalLight
        name="Back light"
        helper

        color="white"
        intensity={0.6}
        position={[ -2, 8, -8 ]}
      />

      <Cube size={0.25} />
    </>
  )
}
