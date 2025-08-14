import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader   from '../shaders/particles/vertex.glsl?raw'
import fragmentShader from '../shaders/particles/fragment.glsl?raw'
import glowImgSrc  from '../assets/glow.png'
import portraitSrc from '../assets/my-portrait.png'

export default function Particles() {
  // 1) Offscreen canvas + texture
  const { canvas, context, texture } = useMemo(() => {
    const size = 128
    const c = document.createElement('canvas')
    c.width = c.height = size
    const ctx = c.getContext('2d')
    ctx.fillRect(0, 0, size, size)
    return { canvas: c, context: ctx, texture: new THREE.CanvasTexture(c) }
  }, [])

  // 2) One glow image
  const glowImage = useMemo(() => {
    const img = new Image()
    img.src = glowImgSrc
    return img
  }, [])

  // 3) Raycast & cursor refs
  const planeRef     = useRef()
  const raycasterRef = useRef(new THREE.Raycaster())
  const screenCursor = useRef(new THREE.Vector2(0, 0))
  const canvasCursor = useRef(new THREE.Vector2())
  const canvasPrev   = useRef(new THREE.Vector2())

  // 4) Portrait texture
  const pictureTexture = useMemo(
    () => new THREE.TextureLoader().load(portraitSrc),
    []
  )

  // 5) Geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 128, 128)
    geo.setIndex(null)
    geo.deleteAttribute('normal')
    const count = geo.attributes.position.count
    const aI = new Float32Array(count)
    const aA = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      aI[i] = Math.random()
      aA[i] = Math.random() * Math.PI * 2
    }
    geo.setAttribute('aIntensity', new THREE.BufferAttribute(aI, 1))
    geo.setAttribute('aAngle',     new THREE.BufferAttribute(aA, 1))
    return geo
  }, [])

  // 6) Shader material
  const material = useMemo(
    () => new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uResolution:          { value: new THREE.Vector2() },
        uPictureTexture:      { value: pictureTexture },
        uDisplacementTexture: { value: texture }
      },
      transparent: true
    }),
    [pictureTexture, texture]
  )

  // 7) Keep uResolution in sync
  const { size, gl } = useThree()
  useEffect(() => {
    material.uniforms.uResolution.value.set(
      size.width  * gl.getPixelRatio(),
      size.height * gl.getPixelRatio()
    )
  }, [size, gl, material])

  // 8) Draw + update every frame
  useFrame(({ mouse, camera }) => {
    const raycaster = raycasterRef.current
    screenCursor.current.copy(mouse)

    // raycast → uv
    raycaster.setFromCamera(mouse, camera)
    const hits = raycaster.intersectObject(planeRef.current)
    if (hits.length) {
      const uv = hits[0].uv
      canvasCursor.current.set(uv.x * 128, (1 - uv.y) * 128)
    }

    // fade
    context.globalCompositeOperation = 'source-over'
    context.globalAlpha = 0.02
    context.fillRect(0, 0, 128, 128)

    // draw glow
    const dist = canvasPrev.current.distanceTo(canvasCursor.current)
    canvasPrev.current.copy(canvasCursor.current)
    const alpha = Math.min(dist * 0.1, 1)
    const glowSize = 128 * 0.25

    context.globalCompositeOperation = 'lighten'
    context.globalAlpha = alpha
    context.drawImage(
      glowImage,
      canvasCursor.current.x - glowSize * 0.5,
      canvasCursor.current.y - glowSize * 0.5,
      glowSize, glowSize
    )

    // upload
    texture.needsUpdate = true
  })

  // 9) Render
  return (
    <>
      <mesh ref={planeRef} visible={false}>
        <planeGeometry args={[10, 10]} />
      </mesh>
      <points geometry={geometry} material={material} />
    </>
  )
}
