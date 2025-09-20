import { Suspense, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Environment, Float, PresentationControls } from '@react-three/drei'
import useBreakpoint from '../hooks/useBreakpoint.js'
import Particles from '../r3f/Particles.jsx'
import Laptop from '../r3f/Laptop.jsx'
import texture from '../assets/chef-claude.png'
import FadingImageDisplacement from './FadingImageDisplacement.jsx'
import Image1 from '../assets/textures/woman-closeup.jpg'
import Image2 from '../assets/textures/woman-with-corgi.jpg'
import Image3 from '../assets/textures/boy-closeup.jpg'
import Image4 from '../assets/textures/boy-with-golden.jpg'
import DisplacementImg from '../assets/textures/11.jpg'
import FadingImage from './FadingImage.jsx'
// import FadingImageNoise from './FadingImageNoise.jsx'

export default function Experience() {

    const viewport = useThree((s) => s.viewport)
    const { width, height } = viewport
    const { isMobile } = useBreakpoint()
    const [ pcLocked, setPcLocked ] = useState(false)
    const lock = () => setPcLocked(true)
    const unlock = () => setPcLocked(false)

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
                        enabled={!isMobile && !pcLocked}
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
                
                {/* Section 2 - Project02 */}
                <group position={[ xLaptop, yTopHalf(2), 0 ]}>
                    <PresentationControls
                        enabled={!isMobile && !pcLocked}
                        cursor
                        rotation={[ 0.3, -0.5, 0 ]}
                        polar={[ -0.25, 0.25 ]}
                        azimuth={[-0.5, 0.35 ]}
                        damping={ 0.2 }
                        snap
                        config={{ mass: 1, tension: 350, friction: 28 }}
                    >
                        <FadingImageDisplacement 
                            src1={ Image1 }
                            src2={ Image2 }
                            dispSrc={ DisplacementImg }
                            position={[ -1.8 , 0, 0.5]}
                            input={isMobile ? 'drag' : 'hover'}
                            onInteractStart={lock}
                            onInteractEnd={unlock}
                        />
                        {/* <FadingImageNoise 
                            src1={ Image3 }
                            src2={ Image4 }
                            position={[ 2, 2.5, 0 ]}
                            input={isMobile ? 'drag' : 'hover'}
                            onInteractStart={() => setPcLocked(true)}
                            onInteractEnd={() => setPcLocked(false)}
                        /> */}
                        <FadingImage 
                            src1={ Image3 }
                            src2={ Image4 }
                            position={[ 1.8, 2.5, 0 ]}
                            input={isMobile ? 'drag' : 'hover'}
                            onInteractStart={() => setPcLocked(true)}
                            onInteractEnd={() => setPcLocked(false)}
                        />
                    </PresentationControls>
                </group>

            </Suspense>
        </>
    )
}
