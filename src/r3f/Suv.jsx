import { useThree } from "@react-three/fiber"
import { ContactShadows, Environment, Float, PresentationControls } from "@react-three/drei"
import SuvModel from '../components/SuvModel.jsx'
import { useControls } from "leva"
import { useMemo } from "react"

export default function Suv() {
    const { camera, viewport } = useThree()
    const z = 0
    const vp = viewport.getCurrentViewport(camera, [0,0,z])
    const rightThirdX = useMemo(() => vp.width * 0.3, [vp.width])
    const envOptions = [ 'city','dawn','night','sunset','warehouse','forest','apartment','studio' ]
    const { carColor, trimColor, environmentPreset } = useControls({
        carColor: { value: '#CF9033' },
        trimColor: { value: '#000000'},
        environmentPreset: {
            value: 'sunset',
            options: envOptions
        }  
    })

    return<>
        <directionalLight 
            castShadow
            position={[ 5, 10, 5 ]} 
            intensity={1.1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
        />
        <ambientLight intensity={0.3} />
        <Environment preset={ environmentPreset }/>
        <PresentationControls
            rotation={[ 0.08, -Math.PI / 4, 0 ]}
            polar={[ 0, 0 ]}
            azimuth={[ -0.5, 0.75 ]}
            damping={ 0.25 }
            snap
            config={{ mass: 1, tension: 170, friction: 26 }}   // how "stiff" the controls feel   
        >
            <group position={[ rightThirdX, -1.2, 0 ]} scale={1.7}>
                <SuvModel color={ carColor } trimColor={ trimColor} castShadow receiveShadow />
            </group> 
        </PresentationControls>
        <ContactShadows 
            position-y={ -1.6 } 
            opacity={ 0.6 }
            scale={ 12 }
            blur={ 1.8 }
            far={ 16 } 
            frames={ Infinity}
        />
    </>
    
}