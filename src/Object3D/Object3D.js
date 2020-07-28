import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { Object3D } from 'three'

import { HedraProvider } from '../helpers/context'
import useHedra, { propTypes } from '../useHedra'

export default function HedraObject3D({ children, ...props }) {
  const three = useMemo(() => new Object3D(), [])

  const hedra = useHedra(three, props)

  return (
    <HedraProvider hedra={hedra}>
      {children}
    </HedraProvider>
  )
}

HedraObject3D.propTypes = {
  ...propTypes,
  children: PropTypes.node,
}
