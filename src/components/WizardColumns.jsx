import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import trainingUrl from "../assets/models/WizardTraining.glb?url"

useGLTF.preload(trainingUrl)

export default function WizardColumns({ url = trainingUrl, ...props }) {
    const { scene } = useGLTF(url)

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }, [scene])

    return <primitive object={scene} {...props} />
}
