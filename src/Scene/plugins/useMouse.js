import { useEffect } from 'react'
import { Raycaster, Vector2 } from 'three'

import { useRoot } from '../../helpers/context'

import { useUpdate } from './useClock'

const raycaster = new Raycaster()

export default function useMouse({ autopause = true } = {}) {
  const root = useRoot()

  if (!root.mouse) {
    root.mouse = new Vector2()
    root.hovered = new Set()

    root.bubbleEvent = (type, data = {}) => {
      if (!root.mouse.active) {
        return
      }

      for (const event of root.hovered) {
        bubbleEvent(event.targetThree, type, { ...event, ...data })
      }
    }
  }

  useEffect(() => {
    const { mouse, canvas: { current: canvas } } = root

    function handleEnter(e) {
      mouse.active = true
    }

    function handleLeave(e) {
      mouse.active = false
    }

    function handleMove(e) {
      const mouseX = (e.clientX / e.target.offsetWidth) * 2 - 1
      const mouseY = -(e.clientY / e.target.offsetHeight) * 2 + 1

      if (mouse.x !== mouseX) {
        mouse.dirty = true
        mouse.x = mouseX
      }

      if (mouse.y !== mouseY) {
        mouse.dirty = true
        mouse.y = mouseY
      }
    }

    canvas.addEventListener('mouseenter', handleEnter, false)
    canvas.addEventListener('mousemove', handleMove, false)
    canvas.addEventListener('mouseleave', handleLeave, false)

    return () => {
      canvas.removeEventListener('mouseenter', handleEnter, false)
      canvas.removeEventListener('mousemove', handleMove, false)
      canvas.removeEventListener('mouseleave', handleLeave, false)
    }
  }, [ root ])

  useUpdate((delta, time) => {
    const { three, camera, mouse, hovered } = root

    if (!mouse.active) {
      return
    }

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(three.children, true)

    const hoveredNext = new Set()
    for (const { object, distance, point, uv } of intersects) {
      let three = object
      while (three && !three.hedra) {
        three = three.parent
      }
      if (!three || !three.parent) {
        continue
      }

      removeAncestors(hoveredNext, three)
      if (!hasDescendents(hoveredNext, three)) {
        hoveredNext.add({
          targetThree: three,
          targetHedra: three.hedra,
          distance,
          point,
          uv,
        })
      }
    }

    // eslint-disable-next-line no-labels
    enter: for (const event of hoveredNext) {
      for (const test of hovered) {
        if (test.targetThree === event.targetThree) {
          continue enter // eslint-disable-line no-labels
        }
      }

      bubbleEvent(event.targetThree, 'onMouseEnter', { ...event })
    }

    if (mouse.dirty) {
      mouse.dirty = false

      for (const event of hoveredNext) {
        bubbleEvent(event.targetThree, 'onMouseMove', { ...event })
      }
    }

    // eslint-disable-next-line no-labels
    leave: for (const event of hovered) {
      for (const test of hoveredNext) {
        if (test.targetThree === event.targetThree) {
          continue leave // eslint-disable-line no-labels
        }
      }

      bubbleEvent(event.targetThree, 'onMouseLeave', { ...event })
    }

    root.hovered = hoveredNext
  }, [])
}

function bubbleEvent(three, type, event) {
  event = { ...event }

  let stopped = false
  event.stopPropagation = () => {
    stopped = true
  }

  while (!stopped && three && three.parent) {
    if (three.hedra && three.hedra.handlers[type]) {
      event.currentTargetThree = three
      event.currentTargetHedra = three.hedra

      three.hedra.handlers[type].handle(event)
    }

    three = three.parent
  }
}

function isAncestor(parent, child) {
  do {
    if (child === parent) {
      return true
    }

    child = child.parent
  } while (child)

  return false
}

function removeAncestors(items, source) {
  for (const child of items) {
    if (isAncestor(child.targetThree, source)) {
      items.delete(child)
    }
  }
}

function hasDescendents(items, source) {
  for (const child of items) {
    if (isAncestor(source, child.targetThree)) {
      return true
    }
  }

  return false
}
