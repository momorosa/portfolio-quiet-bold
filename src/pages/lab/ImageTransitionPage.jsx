import { Suspense, lazy, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { Html, Loader, PresentationControls } from "@react-three/drei"
import useBreakpoint from "../../hooks/useBreakpoint"
// import Footer from "../../components/Footer.jsx"

import imgTinkerClose from "../../assets/textures/tinker-closeup.jpg"
import imgTinkerFull from "../../assets/textures/tinker-full.jpg"
import imgSisterA from "../../assets/textures/sisters1.jpg"
import imgSisterB from "../../assets/textures/sisters2.jpg"
import LabProjectOverlay from "../../components/LabProjectOverlay.jsx"

const FadingImage = lazy(() => import("../../components/FadingImage.jsx"))
const FadingImageNoise = lazy(() => import("../../components/FadingImageNoise.jsx"))

export default function ImageTransitionPage() {
    const { isMobile } = useBreakpoint()

    const cfg = useMemo(() => {
        if (isMobile) {
            return {
                cameraZ: 9,
                fov: 46,
                dpr: [1, 1.1],
                aa: false,
                groupScale: 0.95,
                controls: { azimuth: [-0.15, 0.15], polar: [-0.1, 0.1] },
                aPos: [0, -1, 0],      // centered on mobile
                bRender: false,       // hide second plane on mobile
            }
        }
        
        return {
            cameraZ: 8,
            fov: 42,
            dpr: [1, 1.5],
            aa: true,
            groupScale: 1,
            controls: { azimuth: [-0.5, 0.35], polar: [-0.25, 0.25] },
            aPos: [-1.6, 0, 0],
            bRender: true,
            bPos: [1.6, 0, 0.8],
        }
    }, [isMobile])

    return (
        <section className="relative h-[100svh] w-full overflow-hidden font-primary">
            <Loader />
            <Canvas
                dpr={cfg.dpr}
                camera={{ position: [0, 0, cfg.cameraZ], fov: cfg.fov }}
                gl={{ antialias: cfg.aa, powerPreference: "high-performance" }}
                className="pointer-events-auto"
            >
                 <color attach="background" args={["#000"]} />
                <PresentationControls
                    cursor
                    azimuth={cfg.controls.azimuth}
                    polar={cfg.controls.polar}
                    damping={0.2}
                    snap
                    config={{ mass: 1, tension: 350, friction: 28 }}
                >
                    <Suspense fallback={<Html center>Loading…</Html>}>
                        <group scale={cfg.groupScale}>
                        {/* Always render the noise plane */}
                            <FadingImageNoise
                                src1={imgTinkerClose}
                                src2={imgTinkerFull}
                                position={cfg.aPos}
                            />
                        {/* Only render second plane on non-mobile */}
                            {cfg.bRender && (
                                <FadingImage
                                    src1={imgSisterB}
                                    src2={imgSisterA}
                                    position={cfg.bPos}
                                />
                            )}
                        </group>
                    </Suspense>
                </PresentationControls>
            </Canvas>

            <LabProjectOverlay 
                title="Image Transition: Noise vs Displacement"
                date="August 2025"
                disclaimer="Best on laptop/desktop."
                homeLink="/"
                tech={["React", "Three.js", "R3F", "GLSL", "Vite", "Tailwind", "midjourney"]}
                credits={[
                    { label: "Displacement shader inspo: React Three Fiber Examples", href: "https://codesandbox.io/p/sandbox/1g4qq" },
                ]}
            />             
        </section>

    )
}
