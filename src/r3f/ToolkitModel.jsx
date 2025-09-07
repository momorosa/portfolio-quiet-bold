
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import modelUrl from '../assets/models/model.glb?url'
import { getChapterProgress } from '../utils/getChapterProgress.js'
import useReducedMotion from '../utils/useReducedMotion.js'

const BRAND = new THREE.Color("#CF9033")
const BASE = new THREE.Color("#202020")

const MESH_NAMES = ["VR_Headset", "Headphones", "Rocket003", "Notebook"]

export default function ToolkitModel({ scroll, ...props }) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF(modelUrl)
    const { actions } = useAnimations(animations, group)
    const [hovered, setHovered] = useState(null)
    const prefersReducedMotion = useReducedMotion()

    const extras = {
        receiveShadow: true,
        castShadow: true,
        "material-envMapIntensity": 0.2,
    }

    useEffect(() => {
        const action = actions?.["CameraAction.005"]
        if (!action) return
        action.play()
        action.paused = true
    }, [actions])

    useEffect(() => {
        if(!hovered || !group.current) {
            document.body.style.cursor = "auto"
            return
        }
        const obj = group.current.getObjectByName(hovered)
        if (obj?.material?.color) obj.material.color.set("white")
        document.body.style.cursor = "pointer"
        return () => { document.body.style.cursor = "auto" }
    }, [hovered])

    useFrame((state) => {

        const p = scroll?.current ?? 0
        const action = actions?.["CameraAction.005"]

        if (action?.getClip) {
            const dur = action.getClip().duration || 1
            action.time = THREE.MathUtils.lerp(action.time, dur * p, 0.06)
        }

        const { mesh: activeMesh, t } = getChapterProgress(p)
        const et = state.clock.elapsedTime * 0.5

        MESH_NAMES.forEach((name, i) => {
            const m = group.current?.getObjectByName(name)
            if (!m) return

            const isActive = name === activeMesh
            const isHovered = hovered === name

            // idle motion
            if (!prefersReducedMotion) {
                m.position.y = Math.sin((et + i * 2000) / 2) * 1
                m.rotation.x = Math.sin((et + i * 2000) / 3) / 10
                m.rotation.y = Math.cos((et + i * 2000) / 2) / 10
                m.rotation.z = Math.sin((et + i * 2000) / 3) / 10  
            }

            // emphasis by chapter
            const targetScale = prefersReducedMotion
            ? (isActive ? 1.0 : 0.9)
            : (isActive ? 1.0 + 0.12 * t : 0.72)

            m.scale.x = THREE.MathUtils.lerp(m.scale.x, targetScale, 0.12)
            m.scale.y = THREE.MathUtils.lerp(m.scale.y, targetScale, 0.12)
            m.scale.z = THREE.MathUtils.lerp(m.scale.z, targetScale, 0.12)

            const targetZ = prefersReducedMotion? 0 : (isActive ? 0.6 * t : 0)
            m.position.z = THREE.MathUtils.lerp(m.position.z, targetZ, 0.12)

            // hover color (white→brand→gray feel)
            const targetColor = isHovered ? BRAND : BASE
            m.material?.color?.lerp(targetColor, isHovered ? 0.08 : 0.06)

            if ("emissive" in m.material) {
                m.material.emissive.lerp(
                    isHovered ? BRAND : new THREE.Color(0x000000),
                    0.12
                )
                m.material.emissiveIntensity = isHovered ? 0.15 : 0;
            }
        })
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <group
                position={[0.06, 6.04, 0.35]}
                scale={[0.25, 0.25, 0.25]}
                onPointerOver={(e) => {
                    e.stopPropagation()
                    setHovered(e.object.name)
                }}
                onPointerMove={(e) => {
                    e.stopPropagation()
                    setHovered(e.object.name)
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(null);
                }}
            >
                <mesh
                    name="VR_Headset"
                    geometry={nodes.VR_Headset.geometry}
                    material={materials.M_Headset}
                    {...extras}
                />
                <mesh
                    name="Headphones"
                    geometry={nodes.Headphones.geometry}
                    material={materials.M_Headphone}
                    {...extras}
                />
                <mesh
                    name="Rocket003"
                    geometry={nodes.Rocket003.geometry}
                    material={materials.M_Rocket}
                    {...extras}
                />
                <mesh
                    name="Notebook"
                    geometry={nodes.Notebook.geometry}
                    material={materials.M_Notebook}
                    {...extras}
                />
            </group>

            <group
                name="Camera"
                position={[-1.78, 3.04, 23.58]}
                rotation={[1.62, 0.01, 0.11]}
            >
                <PerspectiveCamera
                    makeDefault
                    far={100}
                    near={0.1}
                    fov={28}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <directionalLight
                        castShadow
                        position={[10, 20, 15]}
                        shadow-camera-right={8}
                        shadow-camera-top={8}
                        shadow-camera-left={-8}
                        shadow-camera-bottom={-8}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        intensity={2}
                        shadow-bias={-0.0001}
                    />
                </PerspectiveCamera>
            </group>
        </group>
    )
}

useGLTF.preload(modelUrl)
