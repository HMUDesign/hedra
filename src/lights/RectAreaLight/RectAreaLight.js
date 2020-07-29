import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { RectAreaLight } from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

import ThreePropTypes from '../../ThreePropTypes'
import { HedraProvider } from '../../helpers/context'
import useHedra, { propTypes } from '../../useHedra'
import { updateColor } from '../../helpers/updaters'

export default function HedraRectAreaLight({ helper, color, intensity, width, height, children, ...props }, ref) {
  const three = useMemo(() => new RectAreaLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])
  useMemo(() => { three.width = width }, [ three, width ])
  useMemo(() => { three.height = height }, [ three, height ])

  useEffect(() => {
    if (helper) {
      const thing = new RectAreaLightHelper(three)
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

HedraRectAreaLight = forwardRef(HedraRectAreaLight)
HedraRectAreaLight.propTypes = {
  ...propTypes,
  helper: PropTypes.bool,
  color: ThreePropTypes.color.isRequired,
  intensity: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node,
}
