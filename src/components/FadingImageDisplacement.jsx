import * as THREE from 'three'
import { useRef, useState } from 'react'
import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { geometry, easing } from 'maath'

export const ImageFadeMaterialDisplacement = shaderMaterial(
{
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
},
    /*glsl*/ ` 
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    /*glsl*/ ` 
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
        vec2 uv = vUv;
        vec4 d = texture2D(disp, uv);
        vec2 distorted1 = vec2(uv.x + dispFactor * (d.r * effectFactor), uv.y);
        vec2 distorted2 = vec2(uv.x - (1.0 - dispFactor) * (d.r * effectFactor), uv.y);
        vec4 c1 = texture2D(tex, distorted1);
        vec4 c2 = texture2D(tex2, distorted2);
        vec4 finalTexture = mix(c1, c2, dispFactor);
        gl_FragColor = finalTexture;
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }`
)

extend({ ImageFadeMaterialDisplacement, 
    RoundedPlaneGeometry: geometry.RoundedPlaneGeometry 
})

export default function FadingImageDisplacement({
    src1,
    src2,
    dispSrc,
    width = 2.5 * 1.5,
    height = 4.0 * 1.5,
    // control knobs
    progress,            // optional controlled 0..1
    defaultProgress = 0, // initial value for uncontrolled
    speed = 0.4,         // easing speed
    input = 'auto',      // 'auto' | 'hover' | 'tap' | 'drag' | 'none'
    effectFactor = 1.2,  // pass through to shader
    onInteractStart,
    onInteractEnd,
    ...props
}) {
    const mat = useRef()
    const [internal, setInternal] = useState(defaultProgress)

    const [tex1, tex2, disp] = useTexture([src1, src2, dispSrc])
    tex1.colorSpace = THREE.SRGBColorSpace
    tex2.colorSpace = THREE.SRGBColorSpace
    tex1.anisotropy = tex2.anisotropy = 8

    // Choose input mode based on pointer capabilities
    const isCoarse = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches
    const mode = input === 'auto' ? (isCoarse ? 'drag' : 'hover') : input

    // Drive shader: controlled vs uncontrolled (internal)
    useFrame((_, delta) => {
        const target = typeof progress === 'number' ? progress : internal
        easing.damp(mat.current, 'dispFactor', target, speed, delta)
        // allow live effectFactor edits
        if (mat.current) mat.current.effectFactor = effectFactor
    })

    const handleDown = (e) => {
        if (mode !== 'drag') return
        e.stopPropagation()
        onInteractStart?.()
        e.target.setPointerCapture?.(e.pointerId)
        if (e.uv) setInternal(Math.min(1, Math.max(0, e.uv.x)))
    }
  
    const handleMove = (e) => {
        if (mode !== 'drag') return
        e.stopPropagation()
        if (e.buttons !== 1) return
        if (e.uv) setInternal(Math.min(1, Math.max(0, e.uv.x)))
    }

    const handleUp = (e) => {
        if (mode !== 'drag') return
        e.stopPropagation()
        onInteractEnd?.()
        e.target.releasePointerCapture?.(e.pointerId)
    }

    return (
        <mesh
            {...props}
            onPointerDown={ handleDown }
            onPointerMove={ handleMove }
            onPointerUp={ handleUp }
            onClick={mode === 'tap' ? () => onInteractStart?.() || setInternal(v => v < 0.5 ? 1 : 0) || onInteractEnd?.() : undefined}
            onPointerOver={mode === 'hover' ? () => setInternal(1) : undefined}
            onPointerOut={mode === 'hover' ? () => setInternal(0) : undefined}
        >
            <roundedPlaneGeometry args={[width, height]} />
            <imageFadeMaterialDisplacement
                ref={mat}
                tex={tex1}
                tex2={tex2}
                disp={disp}
                toneMapped={false}
                effectFactor={effectFactor}
            />
        </mesh>
    )
}