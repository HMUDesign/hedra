import { PerspectiveCamera, Camera } from 'three'

import { updateVector3 } from '../../helpers/updaters'
import useChanged from '../../helpers/useChanged'

import { useHedra } from '../../helpers/context'

export default function useCamera(config) {
  const useCamera = config instanceof Camera
    ? useCustomCamera
    : usePerspectiveCamera

  useCamera(config)
}

export function useCustomCamera(camera) {
  const hedra = useHedra()

  useChanged(camera, () => {
    if (hedra.camera) {
      hedra.scene.remove(hedra.camera)
      hedra.camera = undefined
    }

    if (!hedra.camera) {
      hedra.camera = camera
      hedra.scene.add(hedra.camera)
    }
  })
}

export function usePerspectiveCamera(position) {
  const hedra = useHedra()

  useChanged(position, () => {
    if (!hedra.camera) {
      hedra.camera = new PerspectiveCamera(75, 1, 0.1, 1000)
      hedra.scene.add(hedra.camera)
    }

    updateVector3(hedra.camera.position, position)
    hedra.camera.lookAt(hedra.scene.position)
  })
}
