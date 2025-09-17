import { Environment, Float } from "@react-three/drei"
import { degToRad} from "three/src/math/MathUtils.js"
import { BankCard } from "../components/BankCard.jsx"
import Cursor from "../components/Cursor.jsx"
import { StarrySky } from "./StarrySky.jsx"
import useBreakpoint from "../hooks/useBreakpoint.js"
import { useControls } from "leva"

export default function BankCardExperience() {
    
    const { isMobile } = useBreakpoint()

    const transmissionSettings = useControls("Transmission Settings", {
    backside: false,
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 128, min: 64, max: 2048, step: 64 },
    transmission: { value: 0.95, min: 0, max: 1 },
    roughness: { value: 0.42, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.2, min: 0, max: 200, step: 0.01 },
    backsideThickness: { value: 200, min: 0, max: 200, step: 0.01 },
    ior: { value: 1.25, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.25, min: 0, max: 1 },
    anisotropy: { value: 0, min: 0, max: 10, step: 0.01 },
    distortion: { value: 0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#ffffff",
  })

    return (
        <>
            <Environment preset="sunset" />
            { !isMobile && <Cursor />}
            <StarrySky nbParticles={800} />
            <Float
                floatIntensity={3}
                rotationIntensity={1}
                speed={2}
            >
                <group scale={1} position={[ isMobile ? 0 : 3, 1, 5]}>
                    <BankCard 
                        rotation-x={degToRad(70)}
                        rotation-z={degToRad(20)}
                        scale={3}
                        transmissionSettings={transmissionSettings}
                    />
                </group>
            </Float>
            {/* Backdrop Sphere */}
            <mesh position-z={-20} position-y={-25}>
                <sphereGeometry args={[20, 64, 64]} />
                <meshPhysicalMaterial color="#191929" iridescence={0.3} />
            </mesh>
        </>
    )
}
