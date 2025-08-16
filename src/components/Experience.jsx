import { useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Float, PresentationControls } from '@react-three/drei'
import Particles from '../r3f/Particles.jsx'
import Laptop from '../r3f/Laptop.jsx'
import texture from '../assets/chef-claude.png'

export default function Experience() {

    const viewport = useThree((state) => state.viewport)
    const { width, height } = viewport

    const sectionY = (i) => -i * height
    const leftHalfX = -width * 0.25 + 0.5
    const rightHalfX = width * 0.25 - 0.5

    return (
        <>
            <Environment preset='sunset' />
            {/* Section 0 - About */}
            <Float 
                position={ [leftHalfX, sectionY(0), 0] }
                speed={ 4 } 
                floatIntensity={ 0.5 } 
                rotationIntensity={0}
            >
                <Particles /> 
            </Float>

            {/* Section 1 - Project01 */}
            <group position={[ rightHalfX, sectionY(1), 0 ]}>
                <PresentationControls
                    // global={false}
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
                        <Laptop texture={ texture } position={[ 0, -0.5, 0]}/>
                    </Float>
                </PresentationControls>
            </group>
        </>
    )
}
