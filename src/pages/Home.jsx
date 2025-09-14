import { Canvas } from "@react-three/fiber"
import { ScrollControls, Scroll, useContextBridge } from "@react-three/drei"
import Experience from "../components/Experience.jsx"
import HomeUI from "../components/HomeUI.jsx"
import useBreakpoint from "../hooks/useBreakpoint.js"
import { useLocation, UNSAFE_LocationContext, UNSAFE_NavigationContext, UNSAFE_RouteContext, UNSAFE_DataRouterContext } from "react-router-dom"
import { useEffect } from "react"
import ScrollBridge from "../components/ScrollBridge.jsx"

// Bridge Router context into the Canvas subtree

function RoutedScroll({ isMobile }) {
    const ContextBridge = useContextBridge(
        UNSAFE_LocationContext,
        UNSAFE_NavigationContext,
        UNSAFE_RouteContext,
        UNSAFE_DataRouterContext
    )
    return (
        <ContextBridge>
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
                <ScrollBridge />
            </ScrollControls>
        </ContextBridge>
    )
}

export default function Home() {
    const { isMobile } =useBreakpoint()
    const location = useLocation()

    // Support deep link "/#projects" - page 1
    useEffect(() => {
        if(location.hash === '#projects'){
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('r3f-go', { detail: { page: 1, smooth: true } }))
            }, 0)
        }
    }, [ location.hash ])

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
                    <RoutedScroll isMobile={ isMobile } />
                </Canvas>
            </section>
        </div>
    )
}
