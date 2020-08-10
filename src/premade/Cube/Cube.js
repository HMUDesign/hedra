import PropTypes from 'prop-types'
import React, { forwardRef, useMemo } from 'react'
import { TextureLoader, BoxBufferGeometry, MeshBasicMaterial, MeshNormalMaterial } from 'three'

import { ThreePropTypes, Mesh } from '@hmudesign/hedra'

/**
 * A Cube. Uses MeshBasicMaterial if a `texture` is provided.
 */
export default function Cube({ size = 1, texture, color, children, ...props }, ref) {
  const geometry = useMemo(() => {
    return new BoxBufferGeometry(size, size, size)
  }, [ size ])

  const material = useMemo(() => {
    if (texture || color) {
      return new MeshBasicMaterial({
        color: typeof color === 'undefined' ? 0xffffff : color,
        map: texture ? new TextureLoader().load(texture) : null,
      })
    }

    return new MeshNormalMaterial()
  }, [ texture, color ])

  return (
    <Mesh
      name="Premade Cube"
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
  /** The color to display on the cube's sides. */
  color: ThreePropTypes.color,
  children: PropTypes.node,
}
