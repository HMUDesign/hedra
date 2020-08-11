import PropTypes from 'prop-types'
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { Scene } from 'three'

import {
  useHedra,
  HedraProvider,
} from '../develop'

export default function HedraScene({
  children,
  helper: helperConfig = false,
  ...props
}, ref) {
  const canvas = useRef()
  const three = useMemo(() => new Scene(), [])

  const hedra = useHedra(three)
  hedra.canvas = canvas

  useImperativeHandle(ref, () => hedra)

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
  children: PropTypes.node,
  helper: PropTypes.bool,
}
