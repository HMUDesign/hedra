import PropTypes from 'prop-types'
import { useEffect, useMemo, useRef } from 'react'

import ThreePropTypes from './ThreePropTypes'
import { useParent } from './helpers/context'
import { updateEuler, updateVector3 } from './helpers/updaters'

export default function useHedra(three, { name, position, rotation, scale, ...props } = {}) {
  useMemo(() => { three.name = name }, [ three, name ])
  useMemo(() => updateVector3(three.position, position), [ three, position ])
  useMemo(() => updateEuler(three.rotation, rotation), [ three, rotation ])
  useMemo(() => updateVector3(three.scale, scale), [ three, scale ])

  const hedra = useParent()

  const context = useRef()
  if (!context.current) {
    context.current = {
      handlers: {},
      sceneHandlers: hedra ? hedra.sceneHandlers : {},

      three,
      add: (child) => three.add(child),
      remove: (child) => three.remove(child),
    }
  }

  const oldProps = useRef({})
  useEffect(() => {
    const { sceneHandlers } = context.current

    for (const prop in oldProps.current) {
      const oldHandler = oldProps.current[prop]
      const newHandler = props[prop]

      if (sceneHandlers[prop] && newHandler !== oldHandler) {
        sceneHandlers[prop].off(oldHandler)
      }
    }

    for (const prop in props) {
      const oldHandler = oldProps.current[prop]
      const newHandler = props[prop]

      if (sceneHandlers[prop] && newHandler !== oldHandler) {
        sceneHandlers[prop].on(newHandler)
      }
    }

    oldProps.current = props
  }, [ props ])
  useEffect(() => {
    return () => {
      const { sceneHandlers } = context.current

      for (const prop in oldProps.current) {
        const oldHandler = oldProps.current[prop]

        if (sceneHandlers[prop]) {
          sceneHandlers[prop].off(oldHandler)
        }
      }
    }
  }, [])

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
