import React from 'react'

import { useCamera, useClock, useWebGLRenderer } from '@hmudesign/hedra'

import Cube from './components/Cube'

export default function App() {
  useCamera([ 0, 0, 2 ])
  useClock()
  useWebGLRenderer()

  return (
    <>
      <Cube size={0.25} />
    </>
  )
}
