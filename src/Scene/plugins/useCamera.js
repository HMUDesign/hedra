import { useEffect } from 'react'
import { PerspectiveCamera, CameraHelper } from 'three'

import { updateVector3 } from '../../helpers/updaters'

import { useParent } from '../../helpers/context'

export function useCustomCamera({ camera }) {
  const hedra = useParent()

  useEffect(() => {
    if (hedra.camera) {
      hedra.remove(hedra.camera)
      hedra.camera = undefined
    }

    if (!hedra.camera) {
      hedra.camera = camera
      hedra.add(hedra.camera)
    }
  }, [ hedra, camera ])
}

export function usePerspectiveCamera({
  position,
  helper: helperConfig = false,
}) {
  const hedra = useParent()

  if (!hedra.camera) {
    hedra.camera = new PerspectiveCamera(75, 1, 0.1, 1000)
    hedra.add(hedra.camera)
  }

  useEffect(() => {
    updateVector3(hedra.camera.position, position)
    hedra.camera.lookAt(hedra.three.position)
  }, [ hedra, position ])

  useEffect(() => {
    if (helperConfig) {
      const helper = new CameraHelper(hedra.camera)

      hedra.add(helper)
      return () => hedra.remove(helper)
    }

    return undefined
  }, [ hedra, helperConfig ])
}
