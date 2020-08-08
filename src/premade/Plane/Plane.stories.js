import React from 'react'
import { Demo } from '@hmudesign/hedra/premade'

import Plane from './Plane'

export default {
  title: 'Premade Assets/Components/Plane',
  component: Plane,
  parameters: {
    componentSubtitle: 'A simple plane using PlaneBufferGeometry.',
  },
}

export const basic = () => (
  <Demo>
    <Plane />
  </Demo>
)
