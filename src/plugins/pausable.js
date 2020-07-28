import PropTypes from 'prop-types'
// import Handlers from './lib/handlers';
// import { bubbleEvent, cascadeEvent } from './index';

export const PLUGIN = 'pausable'

export function getScenePropTypes() {
  return {
    pausable: PropTypes.bool,
  }
}

export function setupScene(scene, newProps) {
  const { pausable } = scene.props
  if (pausable) {
    window.addEventListener('focus', scene.play, false)
    window.addEventListener('blur', scene.pause, false)
  }
}

export function teardownScene(scene, oldProps) {
  const { pausable } = scene.props
  if (pausable) {
    window.removeEventListener('blur', scene.pause, false)
    window.removeEventListener('focus', scene.play, false)
  }
}

export function updateScene(scene, oldProps, newProps) {
  const { pausable } = scene.props
  if (pausable !== newProps.pausable) {
    if (newProps.pausable) {
      window.addEventListener('focus', scene.play, false)
      window.addEventListener('blur', scene.pause, false)
    } else {
      window.removeEventListener('blur', scene.pause, false)
      window.removeEventListener('focus', scene.play, false)
    }
  }
}

export function preDrawScene(scene, delta, time) {
}

export function postDrawScene(scene, delta, time) {
}

export function playScene(scene, time) {
}

export function pauseScene(scene, time) {
}

export function getObjectPropTypes() {
  return {
  }
}

export function setupObject(object, newProps) {
}

export function teardownObject(object, oldProps) {
}

export function updateObject(object, oldProps, newProps) {
}
