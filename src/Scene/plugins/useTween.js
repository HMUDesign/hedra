import TWEEN from '@tweenjs/tween.js'

import { useUpdate } from './useClock'

window.TWEEN = TWEEN
TWEEN._time = 0
TWEEN.now = () => TWEEN._time

export default function useTween() {
  useUpdate((delta, time) => {
    TWEEN._time = time * 1000
    TWEEN.update(TWEEN._time)
  }, [])
}
