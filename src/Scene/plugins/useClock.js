import { useEffect } from 'react'
import { Clock } from 'three'

import { useParent } from '../../helpers/context'
import Handlers from '../../helpers/Handlers'

export default function useClock() {
  const hedra = useParent()

  if (!hedra.clock) {
    hedra.clock = true

    const clock = new Clock(false)

    const onUpdate = new Handlers()
    hedra.sceneHandlers.onUpdate = onUpdate

    function update() {
      if (clock.running) {
        requestAnimationFrame(update)
      }

      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      onUpdate.handle(delta, time)
      hedra.draw()
    }

    hedra.play = () => {
      // The clock resets elapsedTime each start. We need a running tally instead.
      const { elapsedTime } = clock
      clock.start()
      clock.elapsedTime = elapsedTime || 0

      requestAnimationFrame(update)
    }

    hedra.pause = () => {
      clock.stop()
    }
  }

  useEffect(() => {
    hedra.play()
    return () => hedra.pause()
  }, [ hedra ])
}

export function useUpdate(action, deps) {
  const hedra = useParent()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => hedra.sceneHandlers.onUpdate.register(action), deps)
}
