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

  const parent = useParent()

  const context = useRef()
  if (!context.current) {
    context.current = makeContext(three)
    context.current.root = parent ? parent.root : context.current
    three.hedra = context.current
  }

  useHandlers(context.current.root.handlers, props)

  useEffect(() => {
    if (parent) {
      parent.add(three)
      return () => parent.remove(three)
    }

    return () => {}
  }, [ parent, three ])

  return context.current
}

export const propTypes = {
  name: PropTypes.string,
  position: ThreePropTypes.position,
  rotation: ThreePropTypes.rotation,
  scale: ThreePropTypes.scale,
}

function makeContext(three) {
  return {
    handlers: {},

    three,
    add: (child) => three.add(child),
    remove: (child) => three.remove(child),
  }
}

function useHandlers(handlers, props) {
  const oldProps = useRef({})

  useEffect(() => {
    for (const prop in oldProps.current) {
      const oldHandler = oldProps.current[prop]
      const newHandler = props[prop]

      if (handlers[prop] && newHandler !== oldHandler) {
        handlers[prop].off(oldHandler)
      }
    }

    for (const prop in props) {
      const oldHandler = oldProps.current[prop]
      const newHandler = props[prop]

      if (handlers[prop] && newHandler !== oldHandler) {
        handlers[prop].on(newHandler)
      }
    }

    oldProps.current = props
  }, [ handlers, props ])

  useEffect(() => {
    return () => {
      for (const prop in oldProps.current) {
        const oldHandler = oldProps.current[prop]

        if (handlers[prop]) {
          handlers[prop].off(oldHandler)
        }
      }
    }
  }, [ handlers ])
}
