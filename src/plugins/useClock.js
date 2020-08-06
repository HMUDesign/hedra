import { useEffect } from 'react'
import { Clock } from 'three'

import { useRoot } from '../helpers/context'
import Handlers from '../helpers/Handlers'

export default function useClock({ autopause = false } = {}) {
  const root = useRoot()

  if (!root.clock) {
    const clock = new Clock(false)
    root.clock = clock

    const onUpdate = new Handlers()
    root.handlers.onUpdate = onUpdate

    function update() {
      if (clock.running) {
        requestAnimationFrame(update)
      }

      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      onUpdate.handle(delta, time)
      root.draw()
    }

    root.play = () => {
      // The clock resets elapsedTime each start. We need a running tally instead.
      const { elapsedTime } = clock
      clock.start()
      clock.elapsedTime = elapsedTime || 0

      requestAnimationFrame(update)
    }

    root.pause = () => {
      clock.stop()
    }
  }

  useEffect(() => {
    const { play, pause } = root

    if (autopause) {
      window.addEventListener('focus', play, false)
      window.addEventListener('blur', pause, false)
    }

    return () => {
      if (autopause) {
        window.removeEventListener('blur', pause, false)
        window.removeEventListener('focus', play, false)
      }
    }
  }, [ root, autopause ])

  useEffect(() => {
    root.play()
    return () => root.pause()
  }, [ root ])
}

export function useUpdate(action, deps) {
  const root = useRoot()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => root.handlers.onUpdate.register(action), deps)
}
