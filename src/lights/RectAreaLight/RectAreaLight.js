import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { RectAreaLight, RectAreaLightHelper } from 'three'

import ThreePropTypes from '../../ThreePropTypes'
import { HedraProvider } from '../../helpers/context'
import useHedra, { propTypes } from '../../useHedra'
import { updateColor } from '../../helpers/updaters'

export default function HedraRectAreaLight({ helper, color, intensity, width, height, children, ...props }) {
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

  const hedra = useHedra(three, props)

  return (
    <HedraProvider hedra={hedra}>
      {children}
    </HedraProvider>
  )
}

HedraRectAreaLight.propTypes = {
  ...propTypes,
  helper: PropTypes.bool,
  color: ThreePropTypes.color.isRequired,
  intensity: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node,
}
