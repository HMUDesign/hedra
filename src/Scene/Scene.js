import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { Scene } from 'three'

import { HedraProvider } from '../helpers/context'
import useHedra from '../useHedra'

export default function HedraScene({ children, ...props }, ref) {
  const canvas = useRef()
  const three = useMemo(() => new Scene(), [])

  useImperativeHandle(ref, () => three)
  const hedra = useHedra(three)
  hedra.canvas = canvas

  window.scene = hedra

  return (
    <HedraProvider hedra={hedra}>
      <canvas ref={canvas} style={{ display: 'block' }} {...props} />
      {children}
    </HedraProvider>
  )
}

HedraScene = forwardRef(HedraScene)
HedraScene.propTypes = {
  children: PropTypes.node,
}
