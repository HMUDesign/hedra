import { useEffect } from 'react'
import Stats from 'stats.js'

import { useParent } from '../../helpers/context'
import { useUpdate } from './useClock'

export default function useStats() {
  const hedra = useParent()

  useEffect(() => {
    hedra.stats = new Stats()
    hedra.canvas.current.parentNode.appendChild(hedra.stats.domElement)

    return () => hedra.stats.domElement.remove()
  }, [ hedra ])

  useUpdate(() => {
    hedra.stats.update()
  }, [])
}
