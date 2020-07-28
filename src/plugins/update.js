import PropTypes from 'prop-types'
import { fakeLifecycleCallback } from '../component'
import Handlers from './lib/handlers'

export const PLUGIN = 'update'

const onUpdates = new Handlers()

export function preDrawScene(scene, delta, time) {
  fakeLifecycleCallback('componentWillDraw', delta, time)

  onUpdates.run({ delta, time })
}

export function getObjectPropTypes() {
  return {
    onUpdate: PropTypes.func,
  }
}

export function setupObject(target, newProps) {
  onUpdates.add(newProps.onUpdate)
}

export function updateObject(target, oldProps, newProps) {
  if (oldProps.onUpdate !== newProps.onUpdate) {
    onUpdates.delete(oldProps.onUpdate)
    onUpdates.add(newProps.onUpdate)
  }
}

export function teardownObject(target, oldProps) {
  onUpdates.delete(oldProps.onUpdate)
}
