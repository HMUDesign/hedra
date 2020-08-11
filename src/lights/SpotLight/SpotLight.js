import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { SpotLight, SpotLightHelper } from 'three'

import {
  ThreePropTypes,
  useHedra,
  propTypes,

  HedraProvider,
  useRoot,

  updateColor,
} from '../../develop'

export default function HedraSpotLight({
  color,
  intensity,
  distance,
  angle,
  penumbra,
  decay,
  children,
  helper: helperConfig = false,
  ...props
}, ref) {
  const root = useRoot()
  const three = useMemo(() => new SpotLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])
  useMemo(() => { three.distance = distance }, [ three, distance ])
  useMemo(() => { three.angle = angle }, [ three, angle ])
  useMemo(() => { three.penumbra = penumbra }, [ three, penumbra ])
  useMemo(() => { three.decay = decay }, [ three, decay ])

  useEffect(() => {
    if (helperConfig) {
      const helper = new SpotLightHelper(three)
      helper.name = `${three.name || 'SpotLight'} helper`

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

HedraSpotLight = forwardRef(HedraSpotLight)
HedraSpotLight.propTypes = {
  ...propTypes,
  helper: PropTypes.bool,
  color: ThreePropTypes.color.isRequired,
  intensity: PropTypes.number.isRequired,
  children: PropTypes.node,
  distance: PropTypes.number,
  angle: PropTypes.number,
  penumbra: PropTypes.number,
  decay: PropTypes.number,
}
