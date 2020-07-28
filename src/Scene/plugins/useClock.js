import { useEffect } from 'react'
import { Clock } from 'three'

import { useParent } from '../../helpers/context'

export default function useClock() {
  const hedra = useParent()

  if (!hedra.clock) {
    hedra.clock = true

    const clock = new Clock(false)

    function update() {
      if (clock.running) {
        requestAnimationFrame(update)
      }

      // const delta = clock.getDelta()
      // const time = clock.getElapsedTime()

      // preDrawScene(this, delta, time)
      hedra.draw()
      // postDrawScene(this, delta, time)
    }

    hedra.play = () => {
      clock.start()
      requestAnimationFrame(update)

      // const time = clock.getElapsedTime()
      // playScene(this, time)
    }

    hedra.pause = () => {
      clock.stop()

      // const time = clock.getElapsedTime()
      // pauseScene(this, time)
    }
  }

  useEffect(() => {
    hedra.play()
    return () => hedra.pause()
  }, [ hedra ])
}
