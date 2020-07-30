import { useEffect } from 'react'
import { WebGLRenderer } from 'three'

import { useParent } from '../../helpers/context'

export default function useWebGLRenderer() {
  const hedra = useParent()

  if (!hedra.root.renderer) {
    hedra.root.renderer = true

    hedra.root.draw = () => {
      hedra.root.renderer.render(hedra.root.three, hedra.root.camera)
    }
  }

  useEffect(() => {
    const renderer = new WebGLRenderer({
      canvas: hedra.root.canvas.current,
      alpha: true,
      antialias: true,
    })

    renderer.setClearColor(0x000000, 1)
    renderer.setPixelRatio(window.devicePixelRatio)

    hedra.root.renderer = renderer
  }, [ hedra ])
}
