import { useEffect } from 'react'

import { useRoot } from '../helpers/context'

const modifierNames = {
  Alt: 'alt',
  Control: 'control',
  Meta: 'meta',
  Shift: 'shift',
}

export default function useMouse() {
  const root = useRoot()

  useEffect(() => {
    const { bubbleEvent } = root

    const modifiers = Object.keys(modifierNames).reduce((modifiers, key) =>
      Object.assign(modifiers, { [key]: false }), {})

    const listeners = {
      click: (event) => bubbleEvent('onClick', { modifiers, event }),
      dblclick: (event) => bubbleEvent('onDoubleClick', { modifiers, event }),
      contextmenu: (event) => bubbleEvent('onContextMenu', { modifiers, event }),
      mousedown: (event) => bubbleEvent('onMouseDown', { modifiers, event }),
      mouseup: (event) => bubbleEvent('onMouseUp', { modifiers, event }),

      touchstart: (event) => bubbleEvent('onTouchStart', { modifiers, event }),
      touchend: (event) => bubbleEvent('onTouchEnd', { modifiers, event }),
      touchcancel: (event) => bubbleEvent('onTouchCancel', { modifiers, event }),
      touchmove: (event) => bubbleEvent('onTouchMove', { modifiers, event }),

      wheel: (event) => bubbleEvent('onWheel', {
        deltaX: event.deltaX,
        deltaY: event.deltaY,
        modifiers,
        event,
      }),
      keydown: (event) => {
        if (modifierNames[event.key]) {
          modifiers[modifierNames[event.key]] = true
        }

        return bubbleEvent('onKeyDown', {
          key: event.key,
          modifiers,
          event,
        })
      },
      keyup: (event) => {
        if (modifierNames[event.key]) {
          modifiers[modifierNames[event.key]] = false
        }

        return bubbleEvent('onKeyUp', {
          key: event.key,
          modifiers,
          event,
        })
      },
    }

    for (const event in listeners) {
      document.addEventListener(event, listeners[event], false)
    }

    return () => {
      for (const event in listeners) {
        document.removeEventListener(event, listeners[event], false)
      }
    }
  }, [ root ])
}
