import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"  
import { useControls } from "leva"
import SimpleTrail from "../r3f/SimpleTrail"

const tempVec = new THREE.Vector3()

export default function Cursor() {
    const { color, intensity, opacity, size } = useControls("Cursor", {
        color: "#dfbcff",
        size: { value: 0.2, min: 0.1, max: 3, step: 0.01 },
        intensity: { value: 4.6, min: 1, max: 10, step: 0.1 },
        opacity: { value: 0.5, min: 0, max: 1, step: 0.01 },
    })
    const target = useRef()

    const viewPort = useThree((state) => state.viewport)

    useFrame(({ pointer }, delta) => {
        if(target.current) {
            tempVec.set(
                (pointer.x * viewPort.width) / 2, 
                (pointer.y * viewPort.height) / 2, 
                0
            )
            target.current.position.lerp(tempVec, delta * 12)
        }
    })

    return (
        <>
            <group ref={ target}>
                <mesh visible={ false }>
                    <sphereGeometry args={[size / 2, 32, 32]} />
                    <meshStandardMaterial color={ color } transparent opacity={ opacity } emissive={ color } emissiveIntensity={ intensity } />
                    </mesh>
            </group>
            <SimpleTrail 
                target={ target}
                color = { color }
                intensity = { intensity }
                opacity = { opacity }
                height = { size }
            />
        </>
    )
}