import { useCallback, useEffect } from 'react'
import { Mesh, BoxGeometry, MeshBasicMaterial, MathUtils } from 'three'

import { useRoot } from '../../helpers/context'

export default function useDynamicSize({
  ratio = 16 / 9,
  fullscreen = true,
  helper: helperConfig = false,
} = {}) {
  const root = useRoot()

  root.resize = useCallback(() => {
    const { canvas, camera, renderer } = root

    const width = fullscreen ? window.innerWidth : canvas.parentNode.offsetWidth
    const height = fullscreen ? window.innerHeight : canvas.parentNode.offsetHeight

    if (camera.type === 'PerspectiveCamera') {
      camera.aspect = width / height

      if (ratio) {
        // const hud = { z: -camera.near }

        const test = MathUtils.radToDeg(2 * Math.atan(camera.aspect / ratio))
        if (test < 90) {
          camera.fov = MathUtils.radToDeg(2 * Math.atan(1 / camera.aspect))

          // hud.width = camera.near * 2 / camera.aspect
          // hud.height = camera.near * 2
        } else {
          camera.fov = MathUtils.radToDeg(2 * Math.atan(1 / ratio))

          // hud.width = camera.near * 2 * camera.aspect / ratio
          // hud.height = camera.near * 2 / ratio
        }
      }
    }

    if (camera.type === 'OrthographicCamera') {
      camera.left = width / -2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = height / -2
    }

    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }, [ root, ratio, fullscreen ])

  useEffect(() => {
    if (helperConfig) {
      const { camera } = root

      const geometry = new BoxGeometry(ratio, 1, 1)
      const material = new MeshBasicMaterial({ wireframe: true })

      const helper = new Mesh(geometry, material)
      helper.name = 'DynamicSize helper'
      helper.position.set(0, 0, -(ratio + 1) / 2)

      camera.add(helper)
      return () => camera.remove(helper)
    }

    return undefined
  }, [ root, ratio, helperConfig ])

  useEffect(() => {
    const { resize } = root
    resize()

    window.addEventListener('resize', resize, false)
    return () => window.removeEventListener('resize', resize, false)
  }, [ root ])
}
