import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { PointLight, PointLightHelper } from 'three'

import ThreePropTypes from '../../ThreePropTypes'
import { HedraProvider } from '../../helpers/context'
import useHedra, { propTypes } from '../../useHedra'
import { updateColor } from '../../helpers/updaters'

export default function HedraPointLight({ helper, color, intensity, distance, decay, children, ...props }, ref) {
  const three = useMemo(() => new PointLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])
  useMemo(() => { three.distance = distance }, [ three, distance ])
  useMemo(() => { three.decay = decay }, [ three, decay ])

  useEffect(() => {
    if (helper) {
      const thing = new PointLightHelper(three, typeof helper === 'number' ? helper : 1)
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
