import PropTypes from 'prop-types'
import React, { forwardRef, useMemo } from 'react'
import { TextureLoader, IcosahedronBufferGeometry, MeshBasicMaterial, MeshNormalMaterial } from 'three'

import { ThreePropTypes, Mesh } from '@hmudesign/hedra'

/**
 * A Sphere (well, a geodesic icosahedron). Uses MeshBasicMaterial if a `texture` is provided.
 */
export default function Sphere({ size = 1, detail = 2, texture, color, children, ...props }, ref) {
  const geometry = useMemo(() => {
    return new IcosahedronBufferGeometry(size, detail)
  }, [ size, detail ])

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
      name="Premade Sphere"
      {...props}
      ref={ref}
      geometry={geometry}
      material={material}
    >
      {children}
    </Mesh>
  )
}

Sphere = React.memo(forwardRef(Sphere))
Sphere.propTypes = {
  /** The radius of the sphere. */
  size: PropTypes.number,
  /** The amount of detail to apply. Higher numbers are better sphere approximations. */
  detail: PropTypes.number,
  /** The texture image path to display on the cube's sides. */
  texture: PropTypes.string,
  /** The color to display on the sphere's side. */
  color: ThreePropTypes.color,
  children: PropTypes.node,
}
