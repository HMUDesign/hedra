import PropTypes from 'prop-types'
import { useEffect, useMemo, useRef } from 'react'

import ThreePropTypes from './ThreePropTypes'
import { useParent } from './helpers/context'
import { updateEuler, updateVector3 } from './helpers/updaters'

export default function useHedra(three, { name, position, rotation, scale } = {}) {
  useMemo(() => { three.name = name }, [ three, name ])
  useMemo(() => updateVector3(three.position, position), [ three, position ])
  useMemo(() => updateEuler(three.rotation, rotation), [ three, rotation ])
  useMemo(() => updateVector3(three.scale, scale), [ three, scale ])

  const context = useRef()
  if (!context.current) {
    context.current = {
      three,
      add: (child) => three.add(child),
      remove: (child) => three.remove(child),
    }
  }

  const hedra = useParent()
  useEffect(() => {
    if (hedra) {
      hedra.add(three)
      return () => hedra.remove(three)
    }

    return () => {}
  }, [ hedra, three ])

  return context.current
}

export const propTypes = {
  name: PropTypes.string,
  position: ThreePropTypes.position,
  rotation: ThreePropTypes.rotation,
  scale: ThreePropTypes.scale,
}
