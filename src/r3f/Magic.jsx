import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { PositionalAudio, useGLTF, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { VFXEmitter, VFXParticles } from "wawa-vfx"
import { degToRad, lerp } from "three/src/math/MathUtils.js"
// import { useControls, button } from "leva"
import WizardCharacter from "../components/Wizard.jsx"
import WizardColumns from "../components/WizardColumns.jsx"
import textureUrl from "../assets/textures/magic_01.png?url"
import buildupUrl from "../assets/sfxs/buildup.mp3?url"
import blastUrl from "../assets/sfxs/blast.mp3?url"
import gravityUrl from "../assets/sfxs/gravity.mp3?url"
import fireUrl from "../assets/sfxs/fire.mp3?url"
import freezeUrl from "../assets/sfxs/freeze.mp3?url"
import ambientUrl from "../assets/sfxs/eerie.mp3?url"
import icicleUrl from "../assets/models/icicle.glb?url"
import { useMagic } from "../hooks/useMagic.js"
import Orc from "../components/Orc.jsx"

export default function Magic(props) {
    const pointerPosition = useRef(new THREE.Vector3(0, 0.001, 0))
    const pointer = useRef()
    const wizardLook = useRef()
    const update = useMagic((state) => state.update)

    useFrame(({ clock }, delta) => {
        update(delta)
        const t = clock.getElapsedTime()
        if (pointer.current) {
            pointer.current.position.lerp(pointerPosition.current, 0.1)
            const target = 2 + (Math.sin(t * 4) + 0.5) * 1
            const s = lerp(pointer.current.scale.x, target, 0.1)
            pointer.current.scale.set(s, s, s)
        }
        if (wizardLook.current) wizardLook.current.lookAt(pointerPosition.current)
    })

    const spell = useMagic((state) => state.spell)
    const addSpell = useMagic((state) => state.addSpell)

    return (
        <group {...props}>
            <AmbientIntro />
            <VFXS />
            <Spells />
            {/* Ground */}
            <mesh
                receiveShadow
                rotation-x={-Math.PI / 2}
                position-y={0.001}
                onPointerMove={(e) =>
                    pointerPosition.current.set(e.point.x, e.point.y + 0.001, e.point.z)
                }
                onClick={() =>
                    addSpell({
                        ...spell,
                        position: pointerPosition.current.clone(),
                    })
                }
            >
                <planeGeometry args={[100, 100]} />
                <shadowMaterial opacity={0.4} transparent />
            </mesh>

            {/* Pointer pulse */}
            <mesh ref={pointer} rotation-x={degToRad(-90)}>
                <circleGeometry args={[0.1, 32]} />
                <meshStandardMaterial
                    emissive={spell.colors[0]}
                    emissiveIntensity={2.5}
                />
            </mesh>

            {/* Environment: the two columns */}
            <group position-y={0} position-z={0}>
                <WizardColumns scale={0.5} />
            </group>

            <Orcs targetRef={wizardLook} />

            {/* Character: the animated wizard */}
            <group ref={wizardLook} position-y={0.01} position-z={4}>
                <WizardCharacter scale={0.4} />
            </group>
        </group>
    )
}

const Orcs = ({ targetRef }) => {
    const orcs = useMagic((state) => state.orcs)

    return orcs.map((orc) => (
        <Orc key={orc.id} data={orc} scale={0.4} targetRef={targetRef} />
    ))
}

const VFXS = () => {
    const coneGeo = useMemo(() => new THREE.ConeGeometry(0.5, 1, 16, 1), [])
    const sphereGeo = useMemo(() => new THREE.SphereGeometry(1, 32, 32), [])
    const circleGeo = useMemo(() => new THREE.CircleGeometry(1, 32), [])
    const texture = useTexture(textureUrl)
    texture.flipY = false
    texture.center.set(0.5, 0.5)

    const { nodes } = useGLTF(icicleUrl)

    return (
        <>
            <VFXParticles
                name="sparks"
                geometry={<primitive object={coneGeo} />}
                settings={{
                    nbParticles: 100000,
                    renderMode: "billboard",
                    intensity: 3,
                    fadeSize: [0.1, 0.1],
                }}
                materialProps={{
                    transparent: true,
                    depthWrite: false,
                    depthTest: true,
                    blending: THREE.AdditiveBlending,
                }}
            />
            <VFXParticles
                name="spheres"
                geometry={<primitive object={sphereGeo} />}
                settings={{
                    nbParticles: 1000,
                    renderMode: "mesh",
                    intensity: 5,
                    fadeSize: [0.7, 0.9],
                    fadeAlpha: [0, 1],
                }}
                materialProps={{
                    transparent: true,
                    depthWrite: false,
                    depthTest: true,
                    blending: THREE.AdditiveBlending,
                }}
            />
            <VFXParticles
                name="writings"
                geometry={<primitive object={circleGeo} />}
                alphaMap={texture}
                settings={{
                    nbParticles: 100,
                    renderMode: "mesh",
                    fadeAlpha: [0.9, 1.0],
                    fadeSize: [0.3, 0.9],
                }}
                materialProps={{
                    transparent: true,
                    depthWrite: false,
                    depthTest: true,
                    blending: THREE.AdditiveBlending,
                }}
            />
            <VFXParticles
                name="icicle"
                geometry={<primitive object={nodes.icicle.geometry} />}
                settings={{
                    nbParticles: 100,
                    renderMode: "mesh",
                    fadeAlpha: [0, 1.0],
                    fadeSize: [0.2, 0.8],
                }}
                materialProps={{
                    transparent: true,
                    depthWrite: false,
                    depthTest: true,
                    blending: THREE.AdditiveBlending,
                }}
            />
            <group visible={false} frustumCulled={false} scale={0.0001}>
                <VFXEmitter
                    emitter="sparks"
                    settings={{ nbParticles: 1, spawnMode: "burst", loop: false }}
                />
                <VFXEmitter
                    emitter="spheres"
                    settings={{ nbParticles: 1, spawnMode: "burst", loop: false }}
                />
                <VFXEmitter
                    emitter="writings"
                    settings={{ nbParticles: 1, spawnMode: "burst", loop: false }}
                />
            </group>
        </>
    )
}

const Spells = () => {
  // const [ count, setCount ] = useState(0)

  // useControls('Debug', {
  //     Restart: button(() => setCount((prev) => prev + 1 )),
  // })

    const active = useMagic((s) => s.casts) || []

    return active.map((spell) =>
        spell.name === "void" ? (
          <Void key={spell.id} position={spell.position} />
        ) : spell.name === "fire" ? (
          <Fire key={spell.id} position={spell.position} />
        ) : spell.name === "ice" ? (
          <Ice key={spell.id} position={spell.position} />
        ) : null
    )
}

const Void = ({ ...props }) => {
    const blastAudio = useRef()
    const gravityAudio = useRef()

    useEffect(() => {
        setTimeout(() => {
            gravityAudio.current.play()
        }, 500)

        setTimeout(() => {
            blastAudio.current.play()
        }, 1000)
    }, [])

    return (
        <group {...props}>
            {/* SFXs */}
            <PositionalAudio url={buildupUrl} autoplay distance={3} loop={false} />
            <PositionalAudio
                url={blastUrl}
                distance={30}
                refDistance={3}
                rolloffFactor={1.5}
                coneInnerAngle={60}
                coneOuterAngle={120}
                loop={false}
                ref={blastAudio}
            />
            <PositionalAudio
                url={gravityUrl}
                distance={10}
                loop={false}
                ref={gravityAudio}
            />

            {/* Build up */}
            <VFXEmitter
                emitter="sparks"
                // debug
                settings={{
                    duration: 0.5,
                    delay: 0,
                    nbParticles: 20,
                    spawnMode: "time",
                    loop: false,
                    startPositionMin: [-0.5, 0, -0.5],
                    startPositionMax: [0.5, 1, 0.5],
                    startRotationMin: [0, 0, 0],
                    startRotationMax: [0, 0, 0],
                    particlesLifetime: [0.5, 1],
                    speed: [0, 1],
                    directionMin: [0, 0, 0],
                    directionMax: [0, 0.1, 0],
                    rotationSpeedMin: [0, 0, 0],
                    rotationSpeedMax: [0, 0, 0],
                    colorStart: ["#4902ff"],
                    colorEnd: ["#ffffff"],
                    size: [0.1, 0.4],
                }}
            />
            <VFXEmitter
                emitter="spheres"
                settings={{
                    duration: 0.5,
                    delay: 0.5,
                    nbParticles: 1,
                    spawnMode: "burst",
                    loop: false,
                    startPositionMin: [0, 0.5, 0],
                    startPositionMax: [0, 0.5, 0],
                    startRotationMin: [0, 0, 0],
                    startRotationMax: [0, 0, 0],
                    particlesLifetime: [0.5, 0.5],
                    speed: [5, 20],
                    directionMin: [0, 0, 0],
                    directionMax: [0, 0, 0],
                    rotationSpeedMin: [0, 10, 0],
                    rotationSpeedMax: [0, 10, 0],
                    colorStart: ["#5b18ff"],
                    colorEnd: ["#d1beff"],
                    size: [0.5, 0.5],
                }}
            />
            <VFXEmitter
                emitter="writings"
                position-y={0.1}
                rotation-x={-Math.PI / 2}
                settings={{
                    duration: 1,
                    delay: 0,
                    nbParticles: 1,
                    spawnMode: "burst",
                    loop: false,
                    startPositionMin: [0, 0, 0],
                    startPositionMax: [0, 0, 0],
                    startRotationMin: [0, 0, 0],
                    startRotationMax: [0, 0, 0],
                    particlesLifetime: [1, 1],
                    speed: [5, 20],
                    directionMin: [0, 0, 0],
                    directionMax: [0, 0, 0],
                    rotationSpeedMin: [0, 0, 5],
                    rotationSpeedMax: [0, 0, 5],
                    colorStart: ["#FF9FED", "#E885FF"],
                    colorEnd: ["#FFFFFF", "#FFFFFF"],
                    size: [1, 1],
                }}
            />

            {/* Blast */}
            <VFXEmitter
                emitter="sparks"
                settings={{
                    duration: 1,
                    delay: 1,
                    nbParticles: 300,
                    spawnMode: "burst",
                    loop: false,
                    startPositionMin: [-0.1, -0.1, -0.1],
                    startPositionMax: [0.1, 0.1, 0.1],
                    startRotationMin: [0, 0, 0],
                    startRotationMax: [0, 0, 0],
                    particlesLifetime: [0.1, 1],
                    speed: [2, 8],
                    directionMin: [-1, 0, -1],
                    directionMax: [1, 1, 1],
                    rotationSpeedMin: [0, 0, 0],
                    rotationSpeedMax: [0, 0, 0],
                    colorStart: ["#ffffff", "#d1beff"],
                    colorEnd: ["#ffffff", "#5b18ff"],
                    size: [0.05, 0.1],
                }}
            />
        </group>
    )
}

const Ice = ({ ...props }) => {
    const spellEmitter = useRef()
    const time = useRef(0)

    useFrame((_, delta) => {
        time.current += delta
        if (spellEmitter.current) {
            spellEmitter.current.position.y = Math.cos(time.current * Math.PI) * 5
        }
    })

    const blastAudio = useRef()

    useEffect(() => {
      setTimeout(() => {
        blastAudio.current.play()
      }, 500)
    }, [])

    return (
        <group {...props}>
            {/* SFXs */}
            <PositionalAudio url={fireUrl} autoplay distance={20} loop={false} />
            <PositionalAudio
                url={freezeUrl}
                distance={30}
                loop={false}
                ref={blastAudio}
            />

            <VFXEmitter
                emitter="writings"
                position-y={0.1}
                rotation-x={-Math.PI / 2}
                settings={{
                    duration: 1,
                    delay: 0,
                    nbParticles: 1,
                    spawnMode: "burst",
                    loop: false,
                    startPositionMin: [0, 0, 0],
                    startPositionMax: [0, 0, 0],
                    startRotationMin: [0, 0, 0],
                    startRotationMax: [0, 0, 0],
                    particlesLifetime: [1, 1],
                    speed: [5, 20],
                    directionMin: [0, 0, 0],
                    directionMax: [0, 0, 0],
                    rotationSpeedMin: [0, 0, 5],
                    rotationSpeedMax: [0, 0, 5],
                    colorStart: ["skyblue"],
                    colorEnd: ["skyblue"],
                    size: [1, 1],
                }}
            />
            <VFXEmitter
                emitter="spheres"
                ref={spellEmitter}
                settings={{
                    duration: 1,
                    delay: 0,
                    nbParticles: 100,
                    spawnMode: "time",
                    loop: false,
                    startPositionMin: [0, 0, 0],
                    startPositionMax: [0, 0, 0],
                    startRotationMin: [0, 0, 0],
                    startRotationMax: [0, 0, 0],
                    particlesLifetime: [0.1, 0.1],
                    speed: [5, 20],
                    directionMin: [0, 0, 0],
                    directionMax: [0, 0, 0],
                    rotationSpeedMin: [0, 0, 0],
                    rotationSpeedMax: [0, 0, 0],
                    colorStart: ["white", "skyblue"],
                    colorEnd: ["#FFFFFF"],
                    size: [0.05, 0.2],
                }}
            >
                <VFXEmitter
                    emitter="sparks"
                    settings={{
                        duration: 0.5,
                        delay: 0,
                        nbParticles: 1000,
                        spawnMode: "time",
                        loop: false,
                        startPositionMin: [-0.1, 0, -0.1],
                        startPositionMax: [0.1, 0, 0.1],
                        startRotationMin: [0, 0, 0],
                        startRotationMax: [0, 0, 0],
                        particlesLifetime: [0.5, 1],
                        speed: [0.1, 5],
                        directionMin: [-1, 0, -1],
                        directionMax: [1, 1, 1],
                        rotationSpeedMin: [0, 0, 0],
                        rotationSpeedMax: [0, 0, 0],
                        colorStart: ["#FFFFFF", "skyblue"],
                        colorEnd: ["#FFFFFF", "skyblue"],
                        size: [0.01, 0.1],
                    }}
                />
            </VFXEmitter>
            <VFXEmitter
                emitter="icicle"
                position-y={0.1}
                settings={{
                    duration: 1,
                    delay: 0.5,
                    nbParticles: 5,
                    spawnMode: "burst",
                    loop: false,
                    startPositionMin: [-0.5, 0, -0.5],
                    startPositionMax: [0.5, 0, 0.5],
                    startRotationMin: [degToRad(180 - 20), 0, degToRad(-30)],
                    startRotationMax: [degToRad(180 + 20), 0, degToRad(30)],
                    particlesLifetime: [1, 1],
                    speed: [5, 20],
                    directionMin: [0, 0, 0],
                    directionMax: [0, 0, 0],
                    rotationSpeedMin: [0, 0, 0],
                    rotationSpeedMax: [0, 0, 0],
                    colorStart: ["skyblue", "#FFFFFF"],
                    colorEnd: ["skyblue", "#FFFFFF"],
                    size: [0.5, 1],
                }}
            />
        </group>
    )
}

const Fire = ({ ...props }) => {
    const spellEmitter = useRef()
    const time = useRef(0)

    useFrame((_, delta) => {
        time.current += delta;
        if (spellEmitter.current) {
            spellEmitter.current.position.y = Math.cos(time.current * Math.PI) * 5;
        }
    })

    const blastAudio = useRef()
    useEffect(() => {
        setTimeout(() => {
            blastAudio.current.play()
        }, 500)
    }, [])

    return (
        <group {...props}>
            {/* SFXs */}
            <PositionalAudio url={fireUrl} autoplay distance={20} loop={false} />
            <PositionalAudio
                url={blastUrl}
                distance={30}
                loop={false}
                ref={blastAudio}
            />
            {/* Buildup */}
            <VFXEmitter
                emitter="spheres"
                ref={spellEmitter}
                settings={{
                    duration: 1,
                    delay: 0,
                    nbParticles: 100,
                    spawnMode: "time",
                    loop: false,
                    startPositionMin: [0, 0, 0],
                    startPositionMax: [0, 0, 0],
                    startRotationMin: [0, 0, 0],
                    startRotationMax: [0, 0, 0],
                    particlesLifetime: [0.1, 0.1],
                    speed: [5, 20],
                    directionMin: [0, 0, 0],
                    directionMax: [0, 0, 0],
                    rotationSpeedMin: [0, 0, 0],
                    rotationSpeedMax: [0, 0, 0],
                    colorStart: ["red", "orange", "yellow"],
                    colorEnd: ["red"],
                    size: [0.05, 0.2],
                }}
            >
                <VFXEmitter
                    emitter="sparks"
                    settings={{
                        duration: 0.5,
                        delay: 0,
                        nbParticles: 1000,
                        spawnMode: "time",
                        loop: false,
                        startPositionMin: [-0.1, 0, -0.1],
                        startPositionMax: [0.1, 0, 0.1],
                        startRotationMin: [0, 0, 0],
                        startRotationMax: [0, 0, 0],
                        particlesLifetime: [0.5, 1],
                        speed: [0.1, 5],
                        directionMin: [-1, 1, -1],
                        directionMax: [1, 1, 1],
                        rotationSpeedMin: [0, 0, 0],
                        rotationSpeedMax: [0, 0, 0],
                        colorStart: ["red", "orange"],
                        colorEnd: ["red", "orange"],
                        size: [0.01, 0.1],
                    }}
                />
            </VFXEmitter>
            <VFXEmitter
                emitter="writings"
                position-y={0.1}
                rotation-x={-Math.PI / 2}
                settings={{
                    duration: 1,
                    delay: 0,
                    nbParticles: 1,
                    spawnMode: "burst",
                    loop: false,
                    startPositionMin: [0, 0, 0],
                    startPositionMax: [0, 0, 0],
                    startRotationMin: [0, 0, 0],
                    startRotationMax: [0, 0, 0],
                    particlesLifetime: [0.6, 0.6],
                    speed: [5, 20],
                    directionMin: [0, 0, 0],
                    directionMax: [0, 0, 0],
                    rotationSpeedMin: [0, 0, 5],
                    rotationSpeedMax: [0, 0, 5],
                    colorStart: ["yellow"],
                    colorEnd: ["red"],
                    size: [1, 1],
                }}
            />

            {/* Blast */}
            <VFXEmitter
                emitter="sparks"
                settings={{
                    duration: 1,
                    delay: 0.5,
                    nbParticles: 1200,
                    spawnMode: "burst",
                    loop: false,
                    startPositionMin: [-0.25, -0.1, -0.25],
                    startPositionMax: [0.25, 1, 0.25],
                    startRotationMin: [0, 0, 0],
                    startRotationMax: [0, 0, 0],
                    particlesLifetime: [0.1, 1],
                    speed: [1, 3],
                    directionMin: [-1, 0, -1],
                    directionMax: [1, 5, 1],
                    rotationSpeedMin: [0, 0, 0],
                    rotationSpeedMax: [0, 0, 0],
                    colorStart: ["red", "orange"],
                    colorEnd: ["red", "orange"],
                    size: [0.01, 0.16],
                }}
            />
        </group>
    )
}

const AmbientIntro = () => {
    const gameStatus = useMagic((s) => s.gameStatus)
    const audioRef = useRef()
    const hasPlayedRef = useRef(false)

    useEffect(() => {
        // Reset flag whenever we're not in an active play session
        if (gameStatus !== "playing") {
            hasPlayedRef.current = false
            return
        }

        if (!audioRef.current) return
        if (hasPlayedRef.current) return

        hasPlayedRef.current = true
        const audio = audioRef.current

        audio.setLoop?.(false)
        audio.setVolume?.(1)
        audio.play()

        // --- fade out near the end ---
        const TOTAL_MS = 16000 // adjust to match your clip
        const FADE_MS = 3000
        const fadeStart = TOTAL_MS - FADE_MS

        if (fadeStart > 0) {
            const timeoutId = setTimeout(() => {
                const start = performance.now()

                const tick = () => {
                    const elapsed = performance.now() - start
                    const t = Math.min(1, elapsed / FADE_MS)
                    const volume = 1 - t
                    audio.setVolume?.(volume)

                    if (t < 1) {
                        requestAnimationFrame(tick)
                    }
                }
                requestAnimationFrame(tick)
            }, fadeStart)

            return () => clearTimeout(timeoutId)
        }
    }, [gameStatus])

    return (
        <PositionalAudio
            ref={audioRef}
            url={ambientUrl}
            autoplay={false}
            loop={false}
            distance={30}
            refDistance={5}
            rolloffFactor={1.2}
        />
    )
}
