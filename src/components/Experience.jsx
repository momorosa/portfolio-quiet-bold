import { Suspense } from 'react'
import { useThree } from '@react-three/fiber'
import { Environment, Float, PresentationControls } from '@react-three/drei'
import useBreakpoint from '../hooks/useBreakpoint.js'
import Particles from '../r3f/Particles.jsx'
import Laptop from '../r3f/Laptop.jsx'
import texture from '../assets/chef-claude.png'

export default function Experience() {

    const viewport = useThree((s) => s.viewport)
    const { width, height } = viewport
    const { isMobile } = useBreakpoint()

    const sectionY = (i) => -i * height
    
    const xParticles = isMobile ? 0 : -width * 0.25 + 0.5
    const xLaptop = isMobile ? 0 : width * 0.25 - 0.5

    const yTopHalf = (i) => sectionY(i) + (isMobile ? height * -0.01 : 0)

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 8]} intensity={1} />
            
            <Suspense fallback={ null }>
                <Environment preset='sunset' />
                {/* Section 0 - About */}
                <Float 
                    position={[ xParticles, yTopHalf(0), 0 ]}
                    speed={ 4 } 
                    floatIntensity={ 0.5 } 
                    rotationIntensity={0}
                >
                    <Particles /> 
                </Float>

                {/* Section 1 - Project01 */}
                <group position={[ xLaptop, yTopHalf(1), 0 ]}>
                    <PresentationControls
                        // global={false}
                        enabled={!isMobile}
                        cursor
                        rotation={[ 0.3, -0.5, 0 ]}
                        polar={[ -0.25, 0.25 ]}
                        azimuth={[-0.5, 0.35 ]}
                        damping={ 0.2 }
                        snap
                        config={{ mass: 1, tension: 350, friction: 28 }}
                    >
                        <Float
                            speed={ 0.5 }
                            floatIntensity={ 0.6 }
                            rotationIntensity={ 0 }
                        >
                            <Laptop 
                                texture={ texture } 
                                position={[ isMobile ? 0.5 : 0, isMobile ? -14 : -0.5, 0]}
                                scale={ isMobile ? 0.6 : 0.8 }
                            />
                        </Float>
                    </PresentationControls>
                </group>
            </Suspense>
        </>
    )
}
