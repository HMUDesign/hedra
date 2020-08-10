import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { DirectionalLight, DirectionalLightHelper } from 'three'

import {
  ThreePropTypes,
  useHedra,
  propTypes,

  HedraProvider,
  useRoot,

  updateColor,
} from '../../develop'

export default function HedraDirectionalLight({
  color,
  intensity,
  children,
  helper: helperConfig = false,
  ...props
}, ref) {
  const root = useRoot()
  const three = useMemo(() => new DirectionalLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])

  useEffect(() => {
    if (helperConfig) {
      const size = typeof helperConfig === 'number' ? helperConfig : 1
      const helper = new DirectionalLightHelper(three, size)
      helper.name = `${three.name || 'DirectionalLight'} helper`

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

HedraDirectionalLight = forwardRef(HedraDirectionalLight)
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
