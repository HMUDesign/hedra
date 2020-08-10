import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { HemisphereLight, HemisphereLightHelper } from 'three'

import {
  ThreePropTypes,
  useHedra,
  propTypes,

  HedraProvider,
  useRoot,

  updateColor,
} from '../../develop'

export default function HedraHemisphereLight({
  skyColor,
  groundColor,
  intensity,
  children,
  helper: helperConfig = false,
  ...props
}, ref) {
  const root = useRoot()
  const three = useMemo(() => new HemisphereLight(), [])
  useMemo(() => updateColor(three.skyColor, skyColor), [ three, skyColor ])
  useMemo(() => updateColor(three.groundColor, groundColor), [ three, groundColor ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])

  useEffect(() => {
    if (helperConfig) {
      const size = typeof helperConfig === 'number' ? helperConfig : 1
      const helper = new HemisphereLightHelper(three, size)
      helper.name = `${three.name || 'HemisphereLight'} helper`

      root.add(helper)
      return () => root.remove(helper)
    }

    return undefined
  }, [ root, three, helperConfig ])

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
