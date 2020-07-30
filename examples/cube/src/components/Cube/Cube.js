import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef } from 'react'
import { TextureLoader, BoxGeometry, MeshPhongMaterial } from 'three'
import TWEEN from '@tweenjs/tween.js'

import { Mesh } from '@hmudesign/hedra'
import crateTexture from './assets/crate.gif'

export default function Cube({ size, children, ...props }) {
  const textureLoader = useMemo(() => {
    return new TextureLoader()
  }, [])

  const geometry = useMemo(() => {
    return new BoxGeometry(size, size, size)
  }, [ size ])

  const material = useMemo(() => {
    return new MeshPhongMaterial({
      color: 0xffffff,
      map: textureLoader.load(crateTexture),
    })
  }, [ textureLoader ])

  const cubeCenter = useRef()
  const cubeOffset = useRef()

  function handleUpdate(delta) {
    cubeCenter.current.rotation.z += Math.PI / 2 * delta
    cubeCenter.current.rotation.y += Math.PI / 7 * delta
    cubeOffset.current.rotation.x += Math.PI / 2 * delta
  }

  useEffect(() => {
    const tween = new TWEEN.Tween(cubeCenter.current)
    tween.to({ position: { z: 1 } }, 2500)
    tween.delay(2500)
    tween.start()
  }, [])

  return (
    <Mesh
      {...props}
      ref={cubeCenter}
      name="center cube"
      geometry={geometry}
      material={material}

      onUpdate={handleUpdate}

      rotation={[ 0, 0, 0 ]}
    >
      <Mesh
        name="offset cube"
        ref={cubeOffset}
        geometry={geometry}
        material={material}

        position={[ 1, 0, 0 ]}
        rotation={[ 0, 0, 0 ]}
      />

      {children}
    </Mesh>
  )
}

Cube = React.memo(Cube)
Cube.propTypes = {
  size: PropTypes.number.isRequired,
  children: PropTypes.node,
}
