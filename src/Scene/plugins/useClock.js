import { useEffect } from 'react'
import { Clock } from 'three'

import { useParent } from '../../helpers/context'
import Handlers from '../../helpers/Handlers'

export default function useClock({ autopause = true } = {}) {
  const hedra = useParent()

  if (!hedra.root.clock) {
    const clock = new Clock(false)
    hedra.root.clock = clock

    const onUpdate = new Handlers()
    hedra.root.handlers.onUpdate = onUpdate

    function update() {
      if (clock.running) {
        requestAnimationFrame(update)
      }

      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      onUpdate.handle(delta, time)
      hedra.root.draw()
    }

    hedra.root.play = () => {
      // The clock resets elapsedTime each start. We need a running tally instead.
      const { elapsedTime } = clock
      clock.start()
      clock.elapsedTime = elapsedTime || 0

      requestAnimationFrame(update)
    }

    hedra.root.pause = () => {
      clock.stop()
    }
  }

  useEffect(() => {
    const { play, pause } = hedra.root

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
  }, [ hedra, autopause ])

  useEffect(() => {
    hedra.root.play()
    return () => hedra.root.pause()
  }, [ hedra ])
}

export function useUpdate(action, deps) {
  const hedra = useParent()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => hedra.root.handlers.onUpdate.register(action), deps)
}
