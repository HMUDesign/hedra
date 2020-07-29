import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import { Object3D } from 'three'

import { HedraProvider } from '../helpers/context'
import useHedra, { propTypes } from '../useHedra'

export default function HedraObject3D({ children, ...props }, ref) {
  const three = useMemo(() => new Object3D(), [])

  useImperativeHandle(ref, () => three)
  const hedra = useHedra(three, props)

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
