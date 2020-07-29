import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { HemisphereLight, HemisphereLightHelper } from 'three'

import ThreePropTypes from '../../ThreePropTypes'
import { HedraProvider } from '../../helpers/context'
import useHedra, { propTypes } from '../../useHedra'
import { updateColor } from '../../helpers/updaters'

export default function HedraHemisphereLight({ helper, skyColor, groundColor, intensity, children, ...props }, ref) {
  const three = useMemo(() => new HemisphereLight(), [])
  useMemo(() => updateColor(three.skyColor, skyColor), [ three, skyColor ])
  useMemo(() => updateColor(three.groundColor, groundColor), [ three, groundColor ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])

  useEffect(() => {
    if (helper) {
      const thing = new HemisphereLightHelper(three, typeof helper === 'number' ? helper : 1)
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

HedraHemisphereLight = forwardRef(HedraHemisphereLight)
HedraHemisphereLight.propTypes = {
  ...propTypes,
  helper: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  color: ThreePropTypes.color.isRequired,
  intensity: PropTypes.number.isRequired,
  children: PropTypes.node,
}
