import * as THREE from 'three'
import { useRef, useState } from 'react'
import { shaderMaterial, useCursor, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { geometry, easing } from 'maath'

export const ImageFadeMaterial = shaderMaterial(
{
    dispFactor: 0,
    effectFactor: 0.15,
    tex: undefined,
    tex2: undefined,
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
    uniform float dispFactor;
    uniform float effectFactor;

    float rand(vec2 n) {
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u * u * (3.0 - 2.0 * u);

        float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), 
            u.y
        );
        return res * res;
    }

    void main() {
        vec2 uv = vUv;
        float noiseFactor = noise(gl_FragCoord.xy * 0.4);
        vec2 distorted1 = vec2(uv.x + dispFactor * noiseFactor, uv.y);
        vec2 distorted2 = vec2(uv.x - (1.0 - dispFactor) * noiseFactor, uv.y);
        vec4 c1 = texture2D(tex, distorted1);
        vec4 c2 = texture2D(tex2, distorted2);
        vec4 finalTexture = mix(c1, c2, dispFactor);
        gl_FragColor = finalTexture;
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }`
)

extend({ ImageFadeMaterial, 
    RoundedPlaneGeometry: geometry.RoundedPlaneGeometry 
})

const clamp01 = (x) => Math.min(1, Math.max(0, x))

export default function FadingImage({ 
    src1, 
    src2,
    width = 2.5,
    height = 4.0,
    progress,              // optional controlled 0..1
    defaultProgress = 0,   // uncontrolled initial
    speed = 0.4,           // easing speed
    noiseScale = 4.0,
    effectFactor = 0.15,
    animate = true,
    input = 'auto',        // 'auto' | 'hover' | 'drag' | 'none'
    onInteractStart,       // () => void  (use to lock PresentationControls)
    onInteractEnd,         // () => void  (unlock) 
    ...props 
}) {
    const ref = useRef()
    const [internal, setInternal] = useState(defaultProgress)
    const [dragging, setDragging] = useState(false)
    const [ hovered, setHovered ] = useState(false)
    
    const [ texture1, texture2 ] = useTexture([src1, src2 ])
    texture1.colorSpace = THREE.SRGBColorSpace
    texture2.colorSpace = THREE.SRGBColorSpace
    texture1.anisotropy = texture2.anisotropy = 8

    const isCoarse = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches
    const mode = input === 'auto' ? (isCoarse ? 'drag' : 'hover') : input

    // show pointer cursor when interactive
    useCursor(mode === 'drag' ? hovered : false)

    const uncontrolled = typeof progress !== 'number'
    const target = uncontrolled ? (mode === 'hover' ? (hovered ? 1 : 0) : internal) : progress

    useFrame((_state, delta) => {
        if (animate && ref.current) ref.current.time += delta
        if (ref.current) {
            ref.current.effectFactor = effectFactor
            easing.damp(ref.current, "dispFactor", target, speed, delta)
        }
    })

    // --- event handlers (stop propagation so PresentationControls doesn't rotate) ---
    const onPointerOver = (e) => {
        if (mode !== 'hover') return
        e.stopPropagation()
        setHovered(true)
    }
    const onPointerOut = (e) => {
        if (mode !== 'hover') return
        e.stopPropagation()
        setHovered(false)
    }

    const onPointerDown = (e) => {
        if (!(uncontrolled && mode === 'drag')) return
        e.stopPropagation()
        onInteractStart?.()
        setDragging(true)
        e.target.setPointerCapture?.(e.pointerId)
        if (e.uv) setInternal(clamp01(e.uv.x))
    }

    const onPointerMove = (e) => {
        if (!(uncontrolled && mode === 'drag' && dragging)) return
        e.stopPropagation()
        if (e.uv) setInternal(clamp01(e.uv.x))
    }

    const endDrag = (e) => {
        if (!(uncontrolled && mode === 'drag')) return
        e.stopPropagation()
        setDragging(false)
        onInteractEnd?.()
        e.target.releasePointerCapture?.(e.pointerId)
    }

    return(
        <mesh
            {...props} 
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <roundedPlaneGeometry args={[ width, height ]}/>
            <imageFadeMaterial 
                ref={ ref } 
                tex={ texture1 } 
                tex2={ texture2 } 
                toneMapped={ false } 
            />
        </mesh>
    )
}