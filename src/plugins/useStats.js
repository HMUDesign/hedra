import { useEffect } from 'react'
import Stats from 'stats.js'

import { useRoot } from '../helpers/context'
import { useUpdate } from './useClock'

export default function useStats() {
  const root = useRoot()

  useEffect(() => {
    root.stats = new Stats()
    root.canvas.current.parentNode.appendChild(root.stats.domElement)

    return () => root.stats.domElement.remove()
  }, [ root ])

  useUpdate(() => {
    root.stats.update()
  }, [])
}
