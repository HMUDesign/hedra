import { Vector2, Vector3, Euler, Color } from 'three'

export function updateVector2(target, source) {
  if (!source) {
    return target
  }

  if (source instanceof Vector2) {
    return target.copy(source)
  }

  if (Array.isArray(source)) {
    return target.fromArray(source)
  }

  if (typeof source === 'number') {
    return target.fromArray([ source, source ])
  }

  throw new Error('updateVector2: Invalid source.')
}

export function updateVector3(target, source) {
  if (!source) {
    return target
  }

  if (source instanceof Vector3) {
    return target.copy(source)
  }

  if (Array.isArray(source)) {
    return target.fromArray(source)
  }

  if (typeof source === 'number') {
    return target.fromArray([ source, source, source ])
  }

  throw new Error('updateVector3: Invalid source.')
}

export function updateEuler(target, source) {
  if (!source) {
    return target
  }

  if (source instanceof Euler) {
    return target.copy(source)
  }

  if (Array.isArray(source)) {
    return target.fromArray(source)
  }

  throw new Error('updateEuler: Invalid source.')
}

export function updateColor(target, source) {
  if (!source) {
    return target
  }

  if (source instanceof Color) {
    return target.copy(source)
  }

  if (Array.isArray(source)) {
    return target.fromArray(source)
  }

  if (typeof source === 'number' || typeof source === 'string') {
    return target.set(source)
  }

  throw new Error('updateEuler: Invalid source.')
}
