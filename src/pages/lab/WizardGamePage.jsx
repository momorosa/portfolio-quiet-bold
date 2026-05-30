import { Canvas } from "@react-three/fiber"
import { Loader } from "@react-three/drei"
import { Suspense } from "react"
import WizardGameExperience from "../../components/WizardGameExperience.jsx"
import WizardGameUI from "../../components/WizardGameUI.jsx"

export default function WizardGamePage() {
    return (
        <section className="relative h-[100svh] w-full overflow-hidden bg-[#574f5e]">
            {/* Canvas fills the viewport */}
            <Canvas
                className="absolute inset-0 pointer-events-auto"
                dpr={[1, 2]}
                shadows
                camera={{ position: [1, 6, 12], fov: 50 }}
                gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
            >
                <fog attach="fog" args={["#574f5e", 8, 22]} />
                <color attach="background" args={["#574f5e"]} />
                <Suspense fallback={null}>
                    <WizardGameExperience />
                </Suspense>
            </Canvas>

            {/* UI layers above Canvas */}
            <WizardGameUI />
            <Loader />
        </section>
    )
}
