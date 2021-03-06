import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { PointLight, PointLightHelper } from 'three'

import {
  ThreePropTypes,
  useHedra,
  propTypes,

  HedraProvider,
  useRoot,

  updateColor,
} from '../../develop'

export default function HedraPointLight({
  color,
  intensity,
  distance,
  decay,
  children,
  helper: helperConfig = false,
  ...props
}, ref) {
  const root = useRoot()
  const three = useMemo(() => new PointLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])
  useMemo(() => { three.distance = distance }, [ three, distance ])
  useMemo(() => { three.decay = decay }, [ three, decay ])

  useEffect(() => {
    if (helperConfig) {
      const size = typeof helperConfig === 'number' ? helperConfig : 1
      const helper = new PointLightHelper(three, size)
      helper.name = `${three.name || 'PointLight'} helper`

      root.add(helper)
      return () => root.remove(helper)
    }

    return undefined
  }, [ root, three, helperConfig ])

  const hedra = useHedra(three, props)
  useImperativeHandle(ref, () => hedra)

  return (
    <HedraProvider hedra={hedra}>
      {children}
    </HedraProvider>
  )
}

HedraPointLight = forwardRef(HedraPointLight)
HedraPointLight.propTypes = {
  ...propTypes,
  helper: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  color: ThreePropTypes.color.isRequired,
  intensity: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
  decay: PropTypes.number.isRequired,
  children: PropTypes.node,
}
