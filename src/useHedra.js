import PropTypes from 'prop-types'
import { useEffect, useMemo, useRef } from 'react'

import ThreePropTypes from './ThreePropTypes'
import { useParent } from './helpers/context'
import Handlers from './helpers/Handlers'
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

  useHandlers(context.current.root.handlers, context.current.handlers, props)

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

function useHandlers(rootHandlers, componentHandlers, props) {
  const oldProps = useRef({})

  useEffect(() => {
    for (const prop in oldProps.current) {
      if (!prop.startsWith('on')) {
        continue
      }

      const oldHandler = oldProps.current[prop]
      const newHandler = props[prop]

      if (newHandler !== oldHandler) {
        if (rootHandlers[prop]) {
          rootHandlers[prop].off(oldHandler)
        } else if (componentHandlers[prop]) {
          componentHandlers[prop].off(oldHandler)
        }
      }
    }

    for (const prop in props) {
      const oldHandler = oldProps.current[prop]
      const newHandler = props[prop]

      if (newHandler !== oldHandler) {
        if (rootHandlers[prop]) {
          rootHandlers[prop].on(newHandler)
        } else {
          if (!componentHandlers[prop]) {
            componentHandlers[prop] = new Handlers()
          }

          componentHandlers[prop].on(newHandler)
        }
      }
    }

    oldProps.current = props
  }, [ rootHandlers, componentHandlers, props ])

  useEffect(() => {
    return () => {
      for (const prop in oldProps.current) {
        if (!prop.startsWith('on')) {
          continue
        }

        const oldHandler = oldProps.current[prop]
        if (rootHandlers[prop]) {
          rootHandlers[prop].off(oldHandler)
        } else if (componentHandlers[prop]) {
          componentHandlers[prop].off(oldHandler)
        }
      }
    }
  }, [ rootHandlers, componentHandlers ])
}
