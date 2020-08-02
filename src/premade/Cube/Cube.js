import PropTypes from 'prop-types'
import React, { forwardRef, useMemo } from 'react'
import { TextureLoader, BoxBufferGeometry, MeshBasicMaterial, MeshNormalMaterial } from 'three'

import { Mesh } from '@hmudesign/hedra'

/**
 * A Cube. Uses MeshBasicMaterial if a `texture` is provided.
 */
export default function Cube({ size = 1, texture, children, ...props }, ref) {
  const geometry = useMemo(() => {
    return new BoxBufferGeometry(size, size, size)
  }, [ size ])

  const material = useMemo(() => {
    if (texture) {
      const loader = new TextureLoader()

      return new MeshBasicMaterial({
        color: 0xffffff,
        map: loader.load(texture),
      })
    }

    return new MeshNormalMaterial()
  }, [ texture ])

  return (
    <Mesh
      {...props}
      ref={ref}
      geometry={geometry}
      material={material}
    >
      {children}
    </Mesh>
  )
}

Cube = React.memo(forwardRef(Cube))
Cube.propTypes = {
  /** The size of the cube. */
  size: PropTypes.number,
  /** The texture image path to display on the cube's sides. */
  texture: PropTypes.string,
  children: PropTypes.node,
}
