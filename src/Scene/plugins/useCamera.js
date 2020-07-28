import { PerspectiveCamera, Camera } from 'three'

import { updateVector3 } from '../../helpers/updaters'
import useChanged from '../../helpers/useChanged'

import { useParent } from '../../helpers/context'

export default function useCamera(config) {
  const useCamera = config instanceof Camera
    ? useCustomCamera
    : usePerspectiveCamera

  useCamera(config)
}

export function useCustomCamera(camera) {
  const hedra = useParent()

  useChanged(camera, () => {
    if (hedra.camera) {
      hedra.remove(hedra.camera)
      hedra.camera = undefined
    }

    if (!hedra.camera) {
      hedra.camera = camera
      hedra.add(hedra.camera)
    }
  })
}

export function usePerspectiveCamera(position) {
  const hedra = useParent()

  useChanged(position, () => {
    if (!hedra.camera) {
      hedra.camera = new PerspectiveCamera(75, 1, 0.1, 1000)
      hedra.add(hedra.camera)
    }

    updateVector3(hedra.camera.position, position)
    hedra.camera.lookAt(hedra.three.position)
  })
}
