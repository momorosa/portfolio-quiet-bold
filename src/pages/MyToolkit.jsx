import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import MyToolkitUI from '../components/MyToolkitUI.jsx'
import ToolkitModel from '../r3f/ToolkitModel.jsx'
import useBreakpoint from '../hooks/useBreakpoint.js'

export default function MyToolkit() {
    const overlayRef = useRef(null)
    const caption = useRef(null)
    const scroll = useRef(0)
    const { isMobile } = useBreakpoint()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" })
        scroll.current = 0
    }, [])

    return (
        <>
            <section className="relative bg-zinc-950">
                {/* Sticky canvas: stays put while the overlay scrolls */}
                <div className="sticky top-0 h-screen w-full z-10">
                    <Canvas 
                        shadows dpr={[1, 2]} 
                        gl={{ antialias: true, powerPreference: "high-performance" }}
                        onCreated={({ events }) => {
                            const el = overlayRef.current
                            if (el) events.connect(el)
                                
                        }}
                        className={ isMobile ? "touch-pan-y" : "touch-none" }
                    >
                        <ambientLight intensity={1} />
                        <Suspense fallback={null}>
                            <ToolkitModel scroll={scroll} />
                            <Environment preset="city" />
                        </Suspense>
                    </Canvas>
                </div>

                {/* The overlay is the scroller that drives the timeline */}
                <MyToolkitUI ref={overlayRef} caption={caption} scroll={scroll} className="sr-only"/>

            </section>
        </>
    )
}
