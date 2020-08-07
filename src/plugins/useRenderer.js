import { useEffect } from 'react'
import { WebGLRenderer } from 'three'

import { useRoot } from '../helpers/context'

export function useWebGLRenderer() {
  const root = useRoot()

  if (!root.renderer) {
    root.renderer = true

    root.draw = () => {
      root.renderer.render(root.three, root.camera)
    }
  }

  useEffect(() => {
    const renderer = new WebGLRenderer({
      canvas: root.canvas.current,
      alpha: true,
      antialias: true,
    })

    renderer.setClearColor(0x000000, 1)
    // renderer.setPixelRatio(window.devicePixelRatio)

    root.renderer = renderer
  }, [ root ])
}
