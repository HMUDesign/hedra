import PropTypes from 'prop-types'
import React from 'react'
import { Object3D } from 'three'

import { HedraProvider } from '../helpers/context'
import useHedra, { propTypes } from '../useHedra'

export default function HedraRaw({ raw, children, ...props }) {
  const hedra = useHedra(raw, props)

  return (
    <HedraProvider hedra={hedra}>
      {children}
    </HedraProvider>
  )
}

HedraRaw.propTypes = {
  ...propTypes,
  raw: PropTypes.instanceOf(Object3D).isRequired,
  children: PropTypes.node,
}
