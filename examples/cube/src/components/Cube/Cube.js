import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { TextureLoader, BoxGeometry, MeshPhongMaterial } from 'three'

import { Mesh } from '@hmudesign/hedra'
import crateTexture from './assets/crate.gif'

export default function Cube({ size, ...props }) {
  const [ { x, z } ] = useState({ x: 0, z: 0 })

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

  return (
    <Mesh
      {...props}
      name="center cube"
      geometry={geometry}
      material={material}

      rotation={[ 0, 0, z ]}
    >
      <Mesh
        name="offset cube"
        geometry={geometry}
        material={material}

        position={[ 1, 0, 0 ]}
        rotation={[ x, 0, 0 ]}
      />
    </Mesh>
  )
}

Cube.propTypes = {
  size: PropTypes.number.isRequired,
}
