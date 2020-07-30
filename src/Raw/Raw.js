import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle } from 'react'
import { Object3D } from 'three'

import { HedraProvider } from '../helpers/context'
import useHedra, { propTypes } from '../useHedra'

export default function HedraRaw({ raw, children, ...props }, ref) {
  useImperativeHandle(ref, () => raw)
  const hedra = useHedra(raw, props)
  raw.hedra = hedra

  return (
    <HedraProvider hedra={hedra}>
      {children}
    </HedraProvider>
  )
}

HedraRaw = forwardRef(HedraRaw)
HedraRaw.propTypes = {
  ...propTypes,
  raw: PropTypes.instanceOf(Object3D).isRequired,
  children: PropTypes.node,
}
