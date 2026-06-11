// import React, { useRef, useMemo, useEffect } from "react"
// import { useFrame, useThree } from "@react-three/fiber"
// import * as THREE from "three"
// import vertexShader from "../shaders/particles/vertex.glsl?raw"
// import fragmentShader from "../shaders/particles/fragment.glsl?raw"
// import glowImgSrc from "../assets/glow.png"
// import portraitDarkSrc from "../assets/my-portrait.png"
// import portraitLightSrc from "../assets/momorosa.png"


// export default function Particles({ darkMode = false }) {
//   const SIZE = 128

//   const { context, texture } = useMemo(() => {
//     const c = document.createElement("canvas")
//     c.width = c.height = SIZE

//     const ctx = c.getContext("2d")
//     ctx.fillStyle = "black"
//     ctx.fillRect(0, 0, SIZE, SIZE)

//     const tex = new THREE.CanvasTexture(c)
//     tex.needsUpdate = true

//     return { context: ctx, texture: tex }
//   }, [])

//   const glowImage = useMemo(() => {
//     const img = new Image()
//     img.src = glowImgSrc
//     return img
//   }, [])

//   const planeRef = useRef()
//   const raycasterRef = useRef(new THREE.Raycaster())
//   const canvasCursor = useRef(new THREE.Vector2(SIZE * 0.5, SIZE * 0.5))
//   const canvasPrev = useRef(new THREE.Vector2(SIZE * 0.5, SIZE * 0.5))

//   const pictureTexture = useMemo(() => {
//     const loader = new THREE.TextureLoader()
//     const tex = loader.load(darkMode ? portraitDarkSrc : portraitLightSrc)
//     tex.minFilter = THREE.LinearFilter
//     tex.magFilter = THREE.LinearFilter
//     tex.generateMipmaps = false
//     tex.needsUpdate = true
//     return tex
//   }, [darkMode])

//   const geometry = useMemo(() => {
//     const geo = new THREE.PlaneGeometry(10, 10, 128, 128)
//     geo.setIndex(null)
//     geo.deleteAttribute("normal")

//     const count = geo.attributes.position.count
//     const aI = new Float32Array(count)
//     const aA = new Float32Array(count)

//     for (let i = 0; i < count; i++) {
//       aI[i] = Math.random()
//       aA[i] = Math.random() * Math.PI * 2
//     }

//     geo.setAttribute("aIntensity", new THREE.BufferAttribute(aI, 1))
//     geo.setAttribute("aAngle", new THREE.BufferAttribute(aA, 1))
//     return geo
//   }, [])

//   const material = useMemo(() => {
//     return new THREE.ShaderMaterial({
//       vertexShader,
//       fragmentShader,
//       uniforms: {
//         uResolution: { value: new THREE.Vector2(1, 1) },
//         uPictureTexture: { value: pictureTexture },
//         uDisplacementTexture: { value: texture },
//         uInvertMask: { value: darkMode ? 0.0 : 1.0 },
//         uDotColor: {
//           value: new THREE.Color(darkMode ? "#f5f5f5" : "#202020"),
//         },
//       },
//       transparent: true,
//       depthWrite: false,
//     })
//   }, [pictureTexture, texture, darkMode])

//   const { size, gl } = useThree()

//   useEffect(() => {
//     material.uniforms.uResolution.value.set(
//       size.width * gl.getPixelRatio(),
//       size.height * gl.getPixelRatio()
//     )
//   }, [size, gl, material])

//   useEffect(() => {
//     material.uniforms.uPictureTexture.value = pictureTexture
//     material.uniforms.uInvertMask.value = darkMode ? 0.0 : 1.0
//     material.uniforms.uDotColor.value.set(darkMode ? "#f5f5f5" : "#202020")
//     material.needsUpdate = true
//   }, [material, pictureTexture, darkMode])

//   useFrame(({ mouse, camera }) => {
//     if (!planeRef.current) return

//     const raycaster = raycasterRef.current
//     raycaster.setFromCamera(mouse, camera)

//     const hits = raycaster.intersectObject(planeRef.current)
//     if (hits.length) {
//       const uv = hits[0].uv
//       canvasCursor.current.set(uv.x * SIZE, (1 - uv.y) * SIZE)
//     }

//     context.globalCompositeOperation = "source-over"
//     context.globalAlpha = 0.02
//     context.fillStyle = "black"
//     context.fillRect(0, 0, SIZE, SIZE)

//     const dist = canvasPrev.current.distanceTo(canvasCursor.current)
//     canvasPrev.current.copy(canvasCursor.current)

//     const alpha = Math.min(dist * 0.1, 1)
//     const glowSize = SIZE * 0.25

//     context.globalCompositeOperation = "lighten"
//     context.globalAlpha = alpha
//     context.drawImage(
//       glowImage,
//       canvasCursor.current.x - glowSize * 0.5,
//       canvasCursor.current.y - glowSize * 0.5,
//       glowSize,
//       glowSize
//     )

//     texture.needsUpdate = true
//   })

//   return (
//     <>
//       <mesh ref={planeRef} visible={false}>
//         <planeGeometry args={[10, 10]} />
//       </mesh>

//       <points geometry={geometry} material={material} />
//     </>
//   )
// }

import React, { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import vertexShader from "../shaders/particles/vertex.glsl?raw"
import fragmentShader from "../shaders/particles/fragment.glsl?raw"
import glowImgSrc from "../assets/glow.png"
import portraitSrc from "../assets/my-portrait.png"

export default function Particles() {
  const SIZE = 128

  // Offscreen canvas that drives the displacement (cursor glow trail)
  const { context, texture } = useMemo(() => {
    const c = document.createElement("canvas")
    c.width = c.height = SIZE

    const ctx = c.getContext("2d")
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, SIZE, SIZE)

    const tex = new THREE.CanvasTexture(c)
    tex.needsUpdate = true

    return { context: ctx, texture: tex }
  }, [])

  const glowImage = useMemo(() => {
    const img = new Image()
    img.src = glowImgSrc
    return img
  }, [])

  const planeRef = useRef()
  const raycasterRef = useRef(new THREE.Raycaster())
  const canvasCursor = useRef(new THREE.Vector2(SIZE * 0.5, SIZE * 0.5))
  const canvasPrev = useRef(new THREE.Vector2(SIZE * 0.5, SIZE * 0.5))

  const pictureTexture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    const tex = loader.load(portraitSrc)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    tex.needsUpdate = true
    return tex
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 128, 128)
    geo.setIndex(null)
    geo.deleteAttribute("normal")

    const count = geo.attributes.position.count
    const aI = new Float32Array(count)
    const aA = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      aI[i] = Math.random()
      aA[i] = Math.random() * Math.PI * 2
    }

    geo.setAttribute("aIntensity", new THREE.BufferAttribute(aI, 1))
    geo.setAttribute("aAngle", new THREE.BufferAttribute(aA, 1))
    return geo
  }, [])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uPictureTexture: { value: pictureTexture },
        uDisplacementTexture: { value: texture },
        uDotColor: { value: new THREE.Color("#f5f5f5") },
        uTime: { value: 0 },
        // Dial-able edge shimmer. 0 = fully still (pure old feel).
        // ~0.12 is a faint, always-alive twinkle. Bump up to taste.
        uShimmer: { value: 0.12 },
      },
      transparent: true,
      depthWrite: false,
    })
  }, [pictureTexture, texture])

  const { size, gl } = useThree()

  useEffect(() => {
    material.uniforms.uResolution.value.set(
      size.width * gl.getPixelRatio(),
      size.height * gl.getPixelRatio()
    )
  }, [size, gl, material])

  useFrame(({ mouse, camera, clock }) => {
    if (!planeRef.current) return

    material.uniforms.uTime.value = clock.elapsedTime

    const raycaster = raycasterRef.current
    raycaster.setFromCamera(mouse, camera)

    const hits = raycaster.intersectObject(planeRef.current)
    if (hits.length) {
      const uv = hits[0].uv
      canvasCursor.current.set(uv.x * SIZE, (1 - uv.y) * SIZE)
    }

    // fade the trail
    context.globalCompositeOperation = "source-over"
    context.globalAlpha = 0.02
    context.fillStyle = "black"
    context.fillRect(0, 0, SIZE, SIZE)

    // paint glow where the cursor moved
    const dist = canvasPrev.current.distanceTo(canvasCursor.current)
    canvasPrev.current.copy(canvasCursor.current)

    const alpha = Math.min(dist * 0.1, 1)
    const glowSize = SIZE * 0.25

    context.globalCompositeOperation = "lighten"
    context.globalAlpha = alpha
    context.drawImage(
      glowImage,
      canvasCursor.current.x - glowSize * 0.5,
      canvasCursor.current.y - glowSize * 0.5,
      glowSize,
      glowSize
    )

    texture.needsUpdate = true
  })

  return (
    <group rotation={[0, THREE.MathUtils.degToRad(20), 0]}>
      <mesh ref={planeRef} visible={false}>
        <planeGeometry args={[10, 10]} />
      </mesh>

      <points geometry={geometry} material={material} />
    </group>
  )
}