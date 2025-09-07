import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export default function Laptop({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 0.8, texture, ...props }) 
{
    const { nodes, materials } = useGLTF('../../src/assets/models/mac-draco.glb')

    const group = useRef()

    const screen = useTexture(texture)
    screen.flipY = false

    return (
        <>
            <group ref={group} position={ position } rotation={ rotation } scale={ scale } dispose={ null } {...props}>
                <group position={[ 0, -0.04, 0.41 ]}>
                    <group position={[ 0, 2.96, -0.13 ]} rotation={[ Math.PI / 2, 0, 0 ]}>         
                    {/* screen */}
                        <mesh geometry={nodes.Cube008_2.geometry} renderOrder={0}>
                            <meshBasicMaterial map={screen} toneMapped={false} side={THREE.FrontSide} /> 
                        </mesh>
                        <mesh material={ materials.aluminium } geometry={ nodes['Cube008'].geometry } />
                        <mesh material={ materials['matte.001']} geometry={ nodes['Cube008_1'].geometry }/>
                    </group>
                </group>

                <mesh material={ materials.keys } geometry={ nodes.keyboard.geometry } position={[ 1.79, 0, 3.45 ]}/>
                <KeyboardReflection 
                    keyboardMesh={ nodes.keyboard }
                />
                <group position={[ 0, -0.1, 3.39 ]}>
                    <mesh material={ materials.aluminium } geometry={ nodes['Cube002'].geometry } />
                    <mesh material={ materials.trackpad } geometry={ nodes['Cube002_1'].geometry } />
                </group>
                <mesh material={ materials.touchbar } geometry={ nodes.touchbar.geometry} position={[ 0, -0.03, 1.2 ]} />
            </group>   
        </>
    )
}

useGLTF.preload('../../src/assets/models/mac-draco.glb')
useTexture.preload('../../src/assets/textures/screen.png')

function useSoftGlowTexture(w = 1024, h = 512) {
    
    // creates a vertical soft gradient that fades to transparent
    return useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, w, h)

        const gradient = ctx.createLinearGradient(0, 0, 0, h)
        gradient.addColorStop(0.00, 'rgba(255, 255, 255, 0.0)')
        gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.20)')
        gradient.addColorStop(0.50, 'rgba(255, 255, 255, 0.35)')
        gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.20)')
        gradient.addColorStop(1.00, 'rgba(255, 255, 255, 0.0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)

        ctx.filter = 'blur(20px)'
        ctx.drawImage(canvas, 0, 0)

        const texture = new THREE.CanvasTexture(canvas)
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping
        texture.needsUpdate = true
        return texture
       
    }, [w, h])  
}

function KeyboardReflection({ keyboardMesh, color="#CF9033", intensity=0.5, expand=[1.28, 1.5], lift=0.035 }) {

    const { size, center } =useMemo(() => {

        const geo = keyboardMesh.geometry
        geo.computeBoundingBox()
        const bbox = geo.boundingBox
        const size = new THREE.Vector3().subVectors(bbox.max, bbox.min)
        const center = new THREE.Vector3().addVectors(bbox.min, bbox.max).multiplyScalar(0.5)

        return { size, center }
    }, [keyboardMesh])

    const pos = useMemo(
        () => [
            keyboardMesh.position.x + center.x, 
            keyboardMesh.position.y + center.y + lift, 
            keyboardMesh.position.z + center.z
        ],
        [keyboardMesh.position, center, lift]
    )
    
    const rot = useMemo(
        () => [
            (keyboardMesh.rotation.x || 0) - Math.PI / 2, 
            keyboardMesh.rotation.y || 0, 
            keyboardMesh.rotation.z || 0
        ],
        [keyboardMesh.rotation]
    )

    const glowTexture = useSoftGlowTexture(1024, 512)

    return (
        <mesh position={ pos } rotation={ rot } renderOrder={ 2 }>
            <planeGeometry 
                args={[ size.x * expand[0], size.z * expand[1] ]}
            />
            <meshBasicMaterial 
                map={ glowTexture}
                color={ color }
                transparent
                opacity={ intensity }
                blending={ THREE.AdditiveBlending }
                depthWrite={ false }
                polygonOffset
                polygonOffsetFactor={ -1 }
                toneMapped={ false }
            />
        </mesh>
    )
}
