import PropTypes from 'prop-types'
import React, { useMemo, useRef } from 'react'
import { Scene } from 'three'

import { HedraProvider } from '../helpers/context'
import useHedra from '../useHedra'

export default function HedraScene({ children }) {
  const canvas = useRef()
  const three = useMemo(() => new Scene(), [])

  const hedra = useHedra(three)
  hedra.canvas = canvas

  return (
    <HedraProvider hedra={hedra}>
      <canvas ref={canvas} width={300} height={300} />
      {children}
    </HedraProvider>
  )
}

HedraScene.propTypes = {
  children: PropTypes.node,
}
