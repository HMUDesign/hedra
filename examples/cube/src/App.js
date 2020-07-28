import React from 'react'

import { useCamera, useClock, useWebGLRenderer } from '@hmudesign/hedra'

export default function App() {
  useCamera([ 0, 0, 2 ])
  useClock()
  useWebGLRenderer()

  return (
    <div>App</div>
  )
}
