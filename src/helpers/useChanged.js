import { useRef } from 'react'

export default function useChanged(test, action) {
  const cache = useRef()

  if (cache.current !== test) {
    cache.current = test

    action()
  }
}
