import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import { Mesh } from 'three'

import ThreePropTypes from '../ThreePropTypes'
import { HedraProvider } from '../helpers/context'
import useHedra, { propTypes } from '../useHedra'

// eslint-disable-next-line prefer-arrow-callback
export default function HedraMesh({ geometry, material, children, ...props }, ref) {
  const three = useMemo(() => new Mesh(), [])
  useMemo(() => { three.geometry = geometry }, [ three, geometry ])
  useMemo(() => { three.material = material }, [ three, material ])

  useImperativeHandle(ref, () => three)
  const hedra = useHedra(three, props)

  return (
    <HedraProvider hedra={hedra}>
      {children}
    </HedraProvider>
  )
}

HedraMesh = forwardRef(HedraMesh)
HedraMesh.propTypes = {
  ...propTypes,
  geometry: ThreePropTypes.geometry.isRequired,
  material: ThreePropTypes.material.isRequired,
  children: PropTypes.node,
}
