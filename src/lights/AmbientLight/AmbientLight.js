import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { AmbientLight } from 'three'

import ThreePropTypes from '../../ThreePropTypes'
import { HedraProvider } from '../../helpers/context'
import useHedra, { propTypes } from '../../useHedra'
import { updateColor } from '../../helpers/updaters'

export default function HedraAmbientLight({ color, intensity, children, ...props }) {
  const three = useMemo(() => new AmbientLight(), [])
  useMemo(() => updateColor(three.color, color), [ three, color ])
  useMemo(() => { three.intensity = intensity }, [ three, intensity ])

  const hedra = useHedra(three, props)

  return (
    <HedraProvider hedra={hedra}>
      {children}
    </HedraProvider>
  )
}

HedraAmbientLight.propTypes = {
  ...propTypes,
  color: ThreePropTypes.color.isRequired,
  intensity: PropTypes.number.isRequired,
  children: PropTypes.node,
}
