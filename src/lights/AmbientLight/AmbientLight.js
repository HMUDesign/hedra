import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import { AmbientLight } from 'three'

import {
  ThreePropTypes,
  useHedra,
  propTypes,

  HedraProvider,

  updateColor,
} from '../../develop'

export default function HedraAmbientLight({
  color,
  intensity,
  children,
  ...props
}, ref) {
  const three = useMemo(() => new AmbientLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])

  const hedra = useHedra(three, props)
  useImperativeHandle(ref, () => hedra)

  return (
    <HedraProvider hedra={hedra}>
      {children}
    </HedraProvider>
  )
}

HedraAmbientLight = forwardRef(HedraAmbientLight)
HedraAmbientLight.propTypes = {
  ...propTypes,
  color: ThreePropTypes.color.isRequired,
  intensity: PropTypes.number.isRequired,
  children: PropTypes.node,
}
