import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { RectAreaLight } from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

import ThreePropTypes from '../../ThreePropTypes'
import { HedraProvider } from '../../helpers/context'
import useHedra, { propTypes } from '../../useHedra'
import { updateColor } from '../../helpers/updaters'

export default function HedraRectAreaLight({
  color,
  intensity,
  width,
  height,
  children,
  helper: helperConfig = false,
  ...props
}, ref) {
  const three = useMemo(() => new RectAreaLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])
  useMemo(() => { three.width = width }, [ three, width ])
  useMemo(() => { three.height = height }, [ three, height ])

  useEffect(() => {
    if (helperConfig) {
      const helper = new RectAreaLightHelper(three)
      helper.name = `${three.name || 'RectAreaLight'} helper`

      three.add(helper)
      return () => three.remove(helper)
    }

    return null
  }, [ three, helperConfig ])

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
