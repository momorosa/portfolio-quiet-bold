import { useEffect, useRef, useState } from "react"
import { useAnimations, useGLTF } from "@react-three/drei"
import { createPortal } from "@react-three/fiber"
import { LoopOnce } from "three"
import animatedWizardUrl from "../assets/models/AnimatedWizard.glb?url"
import { useMagic } from "../hooks/useMagic"
import { VFXEmitter } from "wawa-vfx"

useGLTF.preload(animatedWizardUrl)

export default function Wizard({ url = animatedWizardUrl, animationName = "CharacterArmature|Idle", ...props }) {
    const groupRef = useRef()
    const { scene, nodes, animations } = useGLTF(url)
    const { actions } = useAnimations(animations || [], groupRef)
    const [anim, setAnim] = useState(animationName)


    console.log(animations)

    // enable shadows on all meshes
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }, [scene])

    useEffect(() => {
        const death = actions?.["CharacterArmature|Death"]
        if (death) {
            death.setLoop(LoopOnce)
            death.clampWhenFinished = true
        }
    }, [actions])

    // play current animation
    useEffect(() => {
        const action = actions?.[anim]
        if (!action) return
        action.reset().fadeIn(0.4).play()
        return () => action.fadeOut(0.4)
    }, [anim, actions])

    const spell = useMagic((state) => state.spell)
    const isCasting = useMagic((state) => state.isCasting)
    const gameStatus = useMagic((state) => state.gameStatus)

    useEffect(() => {
        if(gameStatus === "gameover") {
            setAnim("CharacterArmature|Death")
        } else if (isCasting) {
            switch (spell.name) {
                case "void":
                    setAnim("CharacterArmature|Spell2")
                    break
                default:
                    setAnim("CharacterArmature|Staff_Attack")
            }
        } else {
            setAnim("CharacterArmature|Idle_Attacking")
        }
    }, [isCasting, spell, gameStatus])

    return (
        <group ref={groupRef} {...props}>
            <primitive object={scene} />
            { nodes.Wizard_Staff &&
                isCasting &&
            createPortal(
                <VFXEmitter 
                    position-y={ -0.01 }
                    emitter="sparks"
                    position-x={ 0 }
                    settings={{
                        nbParticles: 500,
                        colorStart: spell.colors,
                        size: [0.01, 0.05],
                        directionMin: [ -0.5, 0.5, -0.5 ],
                        directionMax: [ 0.5, 0.5, 0.5 ],
                        speed: [ 0, 1 ],
                        startPositionMin: [ -0.05, -0.05, -0.05 ],
                        startRotationMax: [ 0.05, 0.05, 0.05 ],
                        loop: true,
                    }}
                />,
                nodes.Wizard_Staff
            )}
        </group>
    )
}
