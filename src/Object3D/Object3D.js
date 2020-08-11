import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import { Object3D } from 'three'

import {
  useHedra,
  propTypes,

  HedraProvider,
} from '../develop'

export default function HedraObject3D({ children, ...props }, ref) {
  const three = useMemo(() => new Object3D(), [])

  const hedra = useHedra(three, props)
  useImperativeHandle(ref, () => hedra)

  return (
    <HedraProvider hedra={hedra}>
      {children}
    </HedraProvider>
  )
}

HedraObject3D = forwardRef(HedraObject3D)
HedraObject3D.propTypes = {
  ...propTypes,
  children: PropTypes.node,
}
