import React from 'react'
import { Demo } from '@hmudesign/hedra/premade'

import Sphere from './Sphere'

export default {
  title: 'Premade Assets/Components/Sphere',
  component: Sphere,
  parameters: {
    componentSubtitle: 'A simple sphere using IcosahedronBufferGeometry.',
  },
}

export const basic = () => (
  <Demo>
    <Sphere />
  </Demo>
)
