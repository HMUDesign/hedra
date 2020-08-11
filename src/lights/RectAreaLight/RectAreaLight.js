import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { RectAreaLight } from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

import {
  ThreePropTypes,
  useHedra,
  propTypes,

  HedraProvider,
  useRoot,

  updateColor,
} from '../../develop'

export default function HedraRectAreaLight({
  color,
  intensity,
  width,
  height,
  children,
  helper: helperConfig = false,
  ...props
}, ref) {
  const root = useRoot()
  const three = useMemo(() => new RectAreaLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])
  useMemo(() => { three.width = width }, [ three, width ])
  useMemo(() => { three.height = height }, [ three, height ])

  useEffect(() => {
    if (helperConfig) {
      const helper = new RectAreaLightHelper(three)
      helper.name = `${three.name || 'RectAreaLight'} helper`

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
