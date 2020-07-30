import { useEffect } from 'react'
import { WebGLRenderer } from 'three'

import { useParent } from '../../helpers/context'

export default function useWebGLRenderer() {
  const hedra = useParent()

  if (!hedra.renderer) {
    hedra.renderer = true

    hedra.draw = () => {
      hedra.renderer.render(hedra.three, hedra.camera)
    }
  }

  useEffect(() => {
    hedra.renderer = new WebGLRenderer({
      canvas: hedra.canvas.current,
      alpha: true,
      antialias: true,
    })

    hedra.renderer.setClearColor(0x000000, 1)
    hedra.renderer.setPixelRatio(window.devicePixelRatio)

    return () => hedra.renderer.dispose()
  }, [ hedra ])
}
