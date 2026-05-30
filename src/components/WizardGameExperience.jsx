import { Environment, OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import Magic from "../r3f/Magic.jsx"

export default function WizardGameExperience() {
    return(
        <>
            <OrbitControls enabled={false} />
            <Environment preset="night" />
            <directionalLight 
                position={[ 1.5, 5, -5 ]}
                castShadow
                intensity={ 0.5 }
                shadow-mapSize-width={ 128 * 2 }
                shadow-mapSize-height={ 128 * 2 }
                // shadow-mapSize-width={1024}
                // shadow-mapSize-height={1024}
                shadow-bias={-0.0005}
            />
            <Magic />
            <EffectComposer multisampling={0}>
                <Bloom intensity={ 1.2 } luminanceThreshold={ 1 } mipmapBlur />
            </EffectComposer>
        </>
    )
}