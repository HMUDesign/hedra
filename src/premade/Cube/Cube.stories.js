import React from 'react'
import { Demo } from '@hmudesign/hedra/premade'

import Cube from './Cube'

export default {
  title: 'Premade Assets/Components/Cube',
  component: Cube,
  parameters: {
    componentSubtitle: 'A simple cube using BoxBufferGeometry.',
  },
}

export const basic = () => (
  <Demo>
    <Cube rotation={[ 0, Math.PI / 4, 0 ]} />
  </Demo>
)
