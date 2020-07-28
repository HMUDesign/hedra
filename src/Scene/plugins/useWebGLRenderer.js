import { useEffect } from 'react'
import { WebGLRenderer } from 'three'

import { useHedra } from '../../helpers/context'

export default function useWebGLRenderer() {
  const hedra = useHedra()

  if (!hedra.renderer) {
    hedra.renderer = true

    hedra.draw = () => {
      hedra.renderer.render(hedra.scene, hedra.camera)
    }
  }

  useEffect(() => {
    hedra.renderer = new WebGLRenderer({
      canvas: hedra.canvas.current,
      alpha: true,
      antialias: true,
    })

    hedra.renderer.setClearColor(0x000000, 0)
    hedra.renderer.setPixelRatio(window.devicePixelRatio)

    return () => hedra.renderer.dispose()
  }, [ hedra ])
}
