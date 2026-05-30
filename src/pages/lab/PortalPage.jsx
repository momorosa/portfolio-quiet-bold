import { Canvas } from "@react-three/fiber"
import { Loader } from "@react-three/drei"
import { Suspense } from "react"
import PortalExperience from "../../r3f/PortalExperience.jsx"
import LabProjectOverlay from "../../components/LabProjectOverlay.jsx"


export default function PortalPage() {
    return (
        <section className="relative h-[100svh] w-full overflow-hidden bg-linear-to-t from-rose-200 to-zinc-700">
            {/* Canvas fills the viewport */}
            <Canvas
                className="absolute inset-0 pointer-events-auto"
                dpr={[1, 2]}
                shadows
                camera={{
                        fov: 30,
                        near: 0.1,
                        far: 2000,
                        position: [ 0, 0, 10 ]
                    }}
                gl={{ antialias: true, powerPreference: "high-performance"}}
            >
                <Suspense fallback={null}>
                    <PortalExperience />
                </Suspense>
            </Canvas>

            {/* UI layers above Canvas */}
            <LabProjectOverlay 
                title="Portal Effects"
                date="September 2025"
                disclaimer="Best on laptop/desktop."
                homeLink="/"
                tech={["React", "Three.js", "R3F", "React Three Drei", "Vite", "Tailwind", "GLTF", "Skybox AI by Blockade Lab"]}
                credits={[
                    { label: "models (Stag, Husky, Horse) from Quaternius", href: "https://quaternius.com/index.html" },
                ]}
            />   
            <Loader />
            <div className="fixed bottom-4 left-4 right-4 z-20 flex flex-col gap-4 max-w-2xl mx-auto font-primary bg-[var(--surface)]/50 backdrop-blur-sm p-4 text-[var(--text)] text-shadow-lg">
                <p className="text-sm sm:text-base text-center">
                    Double click to enter and exit the portals.
                </p>
            </div>
        </section>
    )
}
