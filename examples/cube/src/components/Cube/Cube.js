import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef } from 'react'
import { TextureLoader, BoxBufferGeometry, MeshPhongMaterial } from 'three'
import TWEEN from '@tweenjs/tween.js'

import { Mesh } from '@hmudesign/hedra'
import crateTexture from './assets/crate.gif'

export default function Cube({ size, children, ...props }) {
  const geometry = useMemo(() => {
    return new BoxBufferGeometry(size, size, size)
  }, [ size ])

  const material = useMemo(() => {
    const loader = new TextureLoader()

    return new MeshPhongMaterial({
      color: 0xffffff,
      map: loader.load(crateTexture),
    })
  }, [])

  const cubeCenter = useRef()
  const cubeOffset = useRef()

  function handleUpdate(delta) {
    cubeCenter.current.rotation.z += Math.PI / 2 * delta
    cubeCenter.current.rotation.y += Math.PI / 7 * delta
    cubeOffset.current.rotation.x += Math.PI / 2 * delta
  }

  function handleEnter(e) {
    if (e.currentTargetThree === e.targetThree) {
      e.currentTargetThree.scale.setScalar(1.1)
    }
  }

  function handleLeave(e) {
    if (e.currentTargetThree === e.targetThree) {
      e.currentTargetThree.scale.setScalar(1)
    }
  }

  function handleClick(e) {
    if (e.currentTargetThree === e.targetThree) {
      console.log(`clicked ${e.currentTargetThree.name}!`) // eslint-disable-line no-console
    }
  }

  function handleKeyDown(e) {
    if (e.currentTargetThree === e.targetThree) {
      console.log(`keypress ${e.key} on ${e.currentTargetThree.name}!`) // eslint-disable-line no-console
    }
  }

  useEffect(() => {
    const tween = new TWEEN.Tween(cubeCenter.current)
    tween.to({ position: { z: 1 } }, 2500)
    tween.delay(2500)

    tween.start()
    return () => tween.stop()
  }, [])

  return (
    <Mesh
      {...props}
      ref={cubeCenter}
      name="center cube"
      geometry={geometry}
      material={material}

      onUpdate={handleUpdate}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}

      rotation={[ 0, 0, 0 ]}
    >
      <Mesh
        name="offset cube"
        ref={cubeOffset}
        geometry={geometry}
        material={material}

        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}

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
