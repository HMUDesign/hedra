import React from 'react'

import {
  useBrowserEvents,
  useClock,
  useDynamicSize,
  useMouse,
  usePerspectiveCamera,
  useStats,
  useTween,
  useWebGLRenderer,
} from '@hmudesign/hedra'

import { ThreePointLighting } from '@hmudesign/hedra/premade'

import Cube from './components/Cube'

export default function App() {
  usePerspectiveCamera({ position: [ 0, 0, 2 ] })
  useWebGLRenderer()
  useClock()
  useStats()
  useTween()
  useDynamicSize({ helper: true })
  useMouse()
  useBrowserEvents()

  return (
    <>
      <ThreePointLighting />
      <Cube size={0.25} />
    </>
  )
}
