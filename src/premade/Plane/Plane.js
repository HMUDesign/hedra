import PropTypes from 'prop-types'
import React, { forwardRef, useMemo } from 'react'
import { TextureLoader, PlaneBufferGeometry, MeshBasicMaterial, MeshNormalMaterial } from 'three'

import { ThreePropTypes, Mesh } from '@hmudesign/hedra'

/**
 * A Plane. Uses MeshBasicMaterial if a `texture` is provided.
 */
export default function Plane({ size = 1, texture, color, children, ...props }, ref) {
  const geometry = useMemo(() => {
    return new PlaneBufferGeometry(size, size)
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
      name="Premade Plane"
      {...props}
      ref={ref}
      geometry={geometry}
      material={material}
    >
      {children}
    </Mesh>
  )
}

Plane = React.memo(forwardRef(Plane))
Plane.propTypes = {
  /** The size of the cube. */
  size: PropTypes.number,
  /** The texture image path to display on the plane's side. */
  texture: PropTypes.string,
  /** The color to display on the plane's side. */
  color: ThreePropTypes.color,
  children: PropTypes.node,
}
