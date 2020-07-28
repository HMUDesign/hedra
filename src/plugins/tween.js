// import PropTypes from 'prop-types';
import TWEEN from '@tweenjs/tween.js'
import TweenPromise from './lib/tween-promise'

export const PLUGIN = 'tween'

// onTweenStart onTweenEnd onTweenIteration

export function preDrawScene(scene, delta, time) {
  TWEEN.update(time)
}

export function createTween({ target, duration, easing }) {
  const tween = new TWEEN.Tween(this)
  tween.to(target, duration)

  if (typeof easing !== 'undefined') {
    tween.easing(easing)
  }

  return new TweenPromise(tween)
}
