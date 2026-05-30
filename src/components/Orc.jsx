import * as THREE from "three"
import { useEffect, useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useAnimations, useGLTF } from "@react-three/drei"
import { SkeletonUtils } from "three-stdlib" 
import orcUrl from "../assets/models/Orc.glb?url"

useGLTF.preload(orcUrl)

export default function Orc({ data, url = orcUrl, targetRef, ...props }) {
    const { scene, animations } = useGLTF(url)
    const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])

    const ref = useRef()
    const healthBar = useRef()
    const temp = useMemo(() => new THREE.Vector3(), [])

    // anim setup
    const [anim, setAnim] = useState("CharacterArmature|Walk")
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
        const cfg = (n) => {
            const a = actions?.[n]; if (!a) return
            a.setLoop(THREE.LoopOnce); a.clampWhenFinished = true
        }
        cfg("CharacterArmature|Death")
        cfg("CharacterArmature|HitReact")
    }, [actions])

    useEffect(() => {
        const a = actions?.[anim]
        if (!a) return
        a.reset().fadeIn(0.5).play()
        return () => a.fadeOut(0.5)
    }, [anim, actions])

    // mark meshes
    useEffect(() => {
        clonedScene.traverse((ch) => {
            if (ch.isMesh) ch.castShadow = ch.receiveShadow = true
        })
    }, [clonedScene])

    useFrame(() => {
        // health bar
        if (healthBar.current) {
            healthBar.current.scale.x = Math.max(0, data.health) / 100
        }

        // follow + position
        if (ref.current && targetRef?.current) {
            targetRef.current.getWorldPosition(temp)
            ref.current.lookAt(temp)
            if (ref.current.position.distanceTo(data.position) < 1) {
                ref.current.position.lerp(data.position, 0.1)
            } else {
                ref.current.position.copy(data.position)
            }
        }

        // keep anim in sync
        if (anim !== data.animation) setAnim(data.animation)
    })

    return (
        <group ref={ref} position={data.position} {...props}>
            <mesh ref={healthBar} position-y={3.5}>
                <planeGeometry args={[1, 0.1]} />
                <meshBasicMaterial color="red" />
            </mesh>
            <primitive object={clonedScene} />
        </group>
    )
}
