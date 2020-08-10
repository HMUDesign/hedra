import { useEffect, useMemo } from 'react'
import { PerspectiveCamera, CameraHelper } from 'three'

import { updateEuler, updateVector3 } from '../helpers/updaters'

import { useRoot } from '../helpers/context'

export function useCustomCamera({ camera } = {}) {
  const root = useRoot()

  useEffect(() => {
    if (root.camera) {
      root.remove(root.camera)
    }

    if (!root.camera) {
      root.camera = camera
      root.add(camera)
    }
  }, [ root, camera ])
}

export function usePerspectiveCamera({
  name, position, rotation, scale,
  helper: helperConfig = false,
} = {}) {
  const root = useRoot()

  if (!root.camera) {
    root.camera = new PerspectiveCamera(75, 1, 0.1, 1000)
    root.add(root.camera)
  }

  useMemo(() => { root.camera.name = name }, [ root, name ])
  useMemo(() => updateVector3(root.camera.position, position), [ root, position ])
  useMemo(() => updateEuler(root.camera.rotation, rotation), [ root, rotation ])
  useMemo(() => updateVector3(root.camera.scale, scale), [ root, scale ])

  useEffect(() => {
    if (helperConfig) {
      const helper = new CameraHelper(root.camera)
      helper.name = `${root.camera.name || 'DirectionalLight'} helper`

      root.add(helper)
      return () => root.remove(helper)
    }

    return undefined
  }, [ root, helperConfig ])
}
