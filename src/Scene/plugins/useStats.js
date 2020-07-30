import { useEffect } from 'react'
import Stats from 'stats.js'

import { useParent } from '../../helpers/context'
import { useUpdate } from './useClock'

export default function useStats() {
  const hedra = useParent()

  useEffect(() => {
    hedra.root.stats = new Stats()
    hedra.root.canvas.current.parentNode.appendChild(hedra.root.stats.domElement)

    return () => hedra.root.stats.domElement.remove()
  }, [ hedra ])

  useUpdate(() => {
    hedra.root.stats.update()
  }, [])
}
