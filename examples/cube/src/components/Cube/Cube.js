import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { TextureLoader, BoxGeometry, MeshPhongMaterial } from 'three'

import { Mesh } from '@hmudesign/hedra'
import crateTexture from './assets/crate.gif'

export default function Cube({ size, ...props }) {
  const [ { x, z }, setPosition ] = useState({ x: 0, z: 0 })

  const { geometry, material } = useMemo(() => {
    const geometry = new BoxGeometry(size, size, size)

    const textureLoader = new TextureLoader()
    const texture = textureLoader.load(crateTexture)
    const material = new MeshPhongMaterial({ color: 0xffffff, map: texture })

    return { geometry, material }
  }, [ size ])

  function handleClick({ target }) {
    console.log('clicked!', target) // eslint-disable-line no-console
  }

  function handleKeyPress(event) {
    console.log('keypress', event) // eslint-disable-line no-console
  }

  function handleUpdate(delta) {
    setPosition(({ x, z }) => ({
      x: x + Math.PI / 2 * delta,
      z: z + Math.PI / 2 * delta,
    }))
  }

  return (
    <Mesh
      {...props}
      name="center cube"
      geometry={geometry}
      material={material}

      rotation={[ 0, 0, z ]}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
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
