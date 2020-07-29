import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { SpotLight, SpotLightHelper } from 'three'

import ThreePropTypes from '../../ThreePropTypes'
import { HedraProvider } from '../../helpers/context'
import useHedra, { propTypes } from '../../useHedra'
import { updateColor } from '../../helpers/updaters'

export default function HedraSpotLight({ helper, color, intensity, distance, angle, penumbra, decay, children, ...props }, ref) {
  const three = useMemo(() => new SpotLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])
  useMemo(() => { three.distance = distance }, [ three, distance ])
  useMemo(() => { three.angle = angle }, [ three, angle ])
  useMemo(() => { three.penumbra = penumbra }, [ three, penumbra ])
  useMemo(() => { three.decay = decay }, [ three, decay ])

  useEffect(() => {
    if (helper) {
      const thing = new SpotLightHelper(three)
      three.add(thing)
      return () => three.remove(thing)
    }

    return null
  }, [ three, helper ])

  useImperativeHandle(ref, () => three)
  const hedra = useHedra(three, props)

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
