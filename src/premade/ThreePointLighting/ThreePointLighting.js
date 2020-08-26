import PropTypes from 'prop-types'
import React from 'react'

import {
  AmbientLight,
  DirectionalLight,
} from '@hmudesign/hedra'

export default function ThreePointLighting({ children }) {
  return (
    <>
      <AmbientLight name="Ambient light" color="white" intensity={0.2} />
      <DirectionalLight name="Key light" helper color="white" intensity={0.7} position={[ -8, 6, 8 ]} />
      <DirectionalLight name="Fill light" helper color="white" intensity={0.3} position={[ 8, 4, 4 ]} />
      <DirectionalLight name="Back light" helper color="white" intensity={0.6} position={[ -2, 8, -8 ]} />

      {children}
    </>
  )
}

ThreePointLighting.propTypes = {
  children: PropTypes.node.isRequired,
}
