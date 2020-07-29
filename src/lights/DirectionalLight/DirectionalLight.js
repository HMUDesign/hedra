import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { DirectionalLight, DirectionalLightHelper } from 'three'

import ThreePropTypes from '../../ThreePropTypes'
import { HedraProvider } from '../../helpers/context'
import useHedra, { propTypes } from '../../useHedra'
import { updateColor } from '../../helpers/updaters'

export default function HedraDirectionalLight({ helper, color, intensity, children, ...props }) {
  const three = useMemo(() => new DirectionalLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])

  useEffect(() => {
    if (helper) {
      const thing = new DirectionalLightHelper(three, typeof helper === 'number' ? helper : 1)
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

HedraDirectionalLight.propTypes = {
  ...propTypes,
  helper: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  color: ThreePropTypes.color.isRequired,
  intensity: PropTypes.number.isRequired,
  children: PropTypes.node,
}
