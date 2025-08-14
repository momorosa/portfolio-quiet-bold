import { useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import Particles from '../r3f/Particles.jsx'

export default function Experience() {

    const viewport = useThree((state) => state.viewport)
    const { width, height } = viewport

    const sectionY = (i) => -i * height
    const leftHalfX = -width * 0.25 + 0.5
    const rightHalfX = width * 0.25

    return (
        <>
            <Float 
                position={ [leftHalfX, sectionY(0), 0] }
                speed={ 4 } 
                floatIntensity={ 0.5 } 
                rotationIntensity={0}
            >
                <Particles /> 
            </Float>
            <Float
                position={[ width * 0.25, sectionY(1), 0 ]}
            >

            </Float>
        </>
    )
}
