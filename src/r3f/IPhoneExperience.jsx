import * as THREE from 'three'
import { Lightformer, ContactShadows, Environment, Float, PresentationControls, useTexture } from "@react-three/drei"
import { IPhone } from "../components/IPhone.jsx"
import useBreakpoint from "../hooks/useBreakpoint.js"
import screenSrc from '../assets/hq-img.png'
import { StarrySky } from './StarrySky.jsx'
import { useLayoutEffect } from 'react'

export default function IPhoneExperience() {
    const { isMobile } = useBreakpoint()
    const screen = useTexture(screenSrc)

    // Color/flip correct for GLTF UVs
    useLayoutEffect(() => {
        screen.encoding = THREE.sRGBEncoding    
        screen.flipY = false
        screen.anisotropy = 8
    
        screen.center.set(0.5, 0.5)
        screen.rotation = -Math.PI / 2
    
        screen.needsUpdate = true
    }, [ screen ])
 
    return (
        <>
            <Environment resolution={ isMobile ? 256 : 512 } frames={ 1 }>
                <group rotation={[0, Math.PI / 6, 0]}>
                    <Lightformer
                        form="rect"
                        intensity={2.5}
                        color="#fff7e6"
                        position={[6, 5, 8]}
                        scale={[9, 6]}
                        rotation={[0, 0, 0]}
                    />
                    {/* Cool rim (back-left) */}
                    <Lightformer
                        form="rect"
                        intensity={1.2}
                        color="#dfe8ff"
                        position={[-7, 3, -4]}
                        scale={[7, 4]}
                    />
                    {/* Overhead fill */}
                    <Lightformer
                        form="rect"
                        intensity={0.6}
                        color="#ffffff"
                        position={[0, 8, 0]}
                        scale={[10, 10]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                </group>
            </Environment>
            <StarrySky nbParticles={ isMobile ? 600 : 800 } />
            <directionalLight 
                castShadow={ !isMobile }
                position={[ 2.5, 6, 5 ]} 
                intensity={ 0.6 }
                shadow-mapSize-width={ isMobile? 512 : 1024 }
                shadow-mapSize-height={ isMobile? 512 : 1024 }
            />
            <ambientLight intensity={0.3} />
            <PresentationControls
                enabled={ !isMobile }
                cursor
                polar={[ -0.1, 0.2 ]}
                azimuth={[-0.35, 0.25 ]}
                damping={ 0.25 }
                snap
                config={{ mass: 1, tension: 220, friction: 28 }}
            >
                <Float
                    speed={ 2 }
                    floatIntensity={ 3 }
                    rotationIntensity={ 0.02 }
                >
                    <group
                        position={[ isMobile ? 0 : 6, isMobile ? -3 : -4, 0]}
                        scale={ 3 }
                        rotation={[ 0.05 , - Math.PI / 8 , 0]}
                    >
                        <IPhone castShadow screenMap={ screen } />
                    </group>
                </Float>
            </PresentationControls>
            <ContactShadows 
                position-y={ -5.6 } 
                opacity={ 0.6 }
                scale={ 24 }
                blur={ 2 }
                far={ 16 } 
                frames={ isMobile? 1 : Infinity }
            />
        </>
    )
}

useTexture.preload(screenSrc)