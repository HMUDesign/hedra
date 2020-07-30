import { useEffect, useMemo } from 'react'
import { PerspectiveCamera, CameraHelper } from 'three'

import { updateEuler, updateVector3 } from '../../helpers/updaters'

import { useParent } from '../../helpers/context'

export function useCustomCamera({ camera }) {
  const hedra = useParent()

  useEffect(() => {
    if (hedra.root.camera) {
      hedra.root.remove(hedra.root.camera)
    }

    if (!hedra.root.camera) {
      hedra.root.camera = camera
      hedra.root.add(camera)
    }
  }, [ hedra, camera ])
}

export function usePerspectiveCamera({
  name, position, rotation, scale,
  helper: helperConfig = false,
}) {
  const hedra = useParent()

  if (!hedra.root.camera) {
    hedra.root.camera = new PerspectiveCamera(75, 1, 0.1, 1000)
    hedra.root.add(hedra.root.camera)
  }

  useMemo(() => {
    const { camera } = hedra.root
    camera.name = name
  }, [ hedra, name ])

  useMemo(() => {
    const { camera, three } = hedra.root
    updateVector3(camera.position, position)
    camera.lookAt(three.position)
  }, [ hedra, position ])

  useMemo(() => {
    const { camera, three } = hedra.root
    updateEuler(camera.rotation, rotation)
    camera.lookAt(three.position)
  }, [ hedra, rotation ])

  useMemo(() => {
    const { camera, three } = hedra.root
    updateVector3(camera.scale, scale)
    camera.lookAt(three.position)
  }, [ hedra, scale ])

  useEffect(() => {
    if (helperConfig) {
      const helper = new CameraHelper(hedra.root.camera)

      hedra.root.add(helper)
      return () => hedra.root.remove(helper)
    }

    return undefined
  }, [ hedra, helperConfig ])
}
