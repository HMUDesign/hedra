import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { Mesh } from 'three'

import ThreePropTypes from '../ThreePropTypes'
import { HedraProvider } from '../helpers/context'
import useHedra, { propTypes } from '../useHedra'

export default function HedraMesh({ geometry, material, children, ...props }) {
  const three = useMemo(() => new Mesh(), [])
  useMemo(() => { three.geometry = geometry }, [ three, geometry ])
  useMemo(() => { three.material = material }, [ three, material ])

  const hedra = useHedra(three, props)

  return (
    <HedraProvider hedra={hedra}>
      {children}
    </HedraProvider>
  )
}

HedraMesh.propTypes = {
  ...propTypes,
  geometry: ThreePropTypes.geometry.isRequired,
  material: ThreePropTypes.material.isRequired,
  children: PropTypes.node,
}
