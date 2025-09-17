import { useRef } from "react"
import { useFrame, extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import * as THREE from "three"


const TrailMaterial = shaderMaterial(
    { 
        color: new THREE.Color('#ffffff'), 
        opacity: 1,
        intensity: 1,
    },
    // vertex shader
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // fragment shader
    `
    uniform vec3 color;
    uniform float opacity;
    uniform float intensity;
    varying vec2 vUv;
    void main() {
        float alpha = smoothstep(1.0, 0.5, vUv.y) * smoothstep(1.0, 0.5, vUv.x) * smoothstep(0.0, 0.5, vUv.x);
        gl_FragColor = vec4(color * intensity, alpha * opacity);
    }
    `
)

extend({ TrailMaterial })  



export default function SimpleTrail({
    target = null,
    color = '#FFFFFF',
    intensity = 6,
    numPoints = 20,
    height = 0.42,
    minDistance = 0.1,
    opacity = 0.5,
    duration = 20,
}) {
    const mesh = useRef()
    const positions = useRef(new Array(numPoints).fill( new THREE.Vector3(0, 0, 0)))

    const lastUnshift = useRef(Date.now())

    useFrame(() => {
        if(!mesh.current || !target?.current) return

        const curPoint = target.current.position
        const lastPoint = positions.current[0]
        const distanceToLastPoint = lastPoint.distanceTo(curPoint)

        if(distanceToLastPoint < minDistance){
            if(Date.now() - lastUnshift.current > duration) {
                positions.current.unshift(lastPoint)
                positions.current.pop()
                lastUnshift.current = Date.now()
            }
        } else {
            positions.current.unshift(curPoint.clone())
            positions.current.pop()
            lastUnshift.current = Date.now()
        }

        const geometry = mesh.current.geometry
        const positionAttribute = geometry.getAttribute('position')
        
        for(let i = 0; i < numPoints; i++) { 
            const point = positions.current[ positions.current.length - 1 - i ]
            positionAttribute.setXYZ(i * 2, point.x, point.y - height / 2, point.z)
            positionAttribute.setXYZ(i * 2 + 1, point.x, point.y + height / 2, point.z)      
        }
        positionAttribute.needsUpdate = true

    })

    return (
        <>
            <mesh ref={ mesh } >
                <planeGeometry args={[1, 1, 1, numPoints - 1]} />
                <trailMaterial 
                    color={color} 
                    opacity={opacity} 
                    intensity={intensity} 
                    side={THREE.DoubleSide} 
                    transparent
                    blending={THREE.AdditiveBlending}
                    depthWrite={false} 
                />
            </mesh>
        </>
    )
}   