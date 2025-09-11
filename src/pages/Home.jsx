import { Canvas } from "@react-three/fiber"
import { ScrollControls, Scroll } from "@react-three/drei"
import Experience from "../components/Experience.jsx"
import HomeUI from "../components/HomeUI.jsx"
import useBreakpoint from "../hooks/useBreakpoint.js"



export default function Home() {
    const { isMobile } =useBreakpoint()

    return (
        <div className="flex flex-col">
            {/* Main Section */}
            <section className="relative h-[100svh] overscroll-y-none">
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    gl={{ antialias: !isMobile, powerPreference: 'high-performance'}}
                    camera={{ fov: 35, position: [0, 0, 18] }}
                    className={ isMobile ? "touch-pan-y" : "touch-none" }
                >
                    <ScrollControls 
                        pages={ 4 } 
                        damping={isMobile ? 0.28 : 0.2}
                        style={{ overscrollBehavior: 'none', WebkitOverflowScrolling: 'touch' }}
                    >
                        <Scroll>
                            <Experience />
                        </Scroll>
                        <Scroll html className="will-change-transform">
                            <HomeUI />
                        </Scroll>
                    </ScrollControls>
                </Canvas>
            </section>
        </div>
    )
}
