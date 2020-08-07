import PropTypes from 'prop-types'
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { Scene, Vector3 } from 'three'

import {
  ThreePropTypes,
  useHedra,
  HedraProvider,
  updateVector3,
} from '../develop'

export default function HedraScene({
  children,
  target,
  helper: helperConfig = false,
  ...props
}, ref) {
  const canvas = useRef()
  const three = useMemo(() => {
    const scene = new Scene()
    scene.target = new Vector3(0, 0, 0)
    return scene
  }, [])

  useMemo(() => updateVector3(three.target, target), [ three, target ])

  useImperativeHandle(ref, () => three)
  const hedra = useHedra(three)
  hedra.canvas = canvas

  useEffect(() => {
    if (helperConfig) {
      window.hedra = hedra
      return () => delete window.hedra
    }

    return undefined
  }, [ hedra, helperConfig ])

  return (
    <HedraProvider hedra={hedra}>
      <canvas ref={canvas} {...props} />
      {children}
    </HedraProvider>
  )
}

HedraScene = forwardRef(HedraScene)
HedraScene.propTypes = {
  target: ThreePropTypes.target,
  children: PropTypes.node,
  helper: PropTypes.bool,
}
