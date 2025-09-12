import React, { useRef, Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import MyToolkitUI from '../components/MyToolkitUI.jsx'
import ToolkitModel from '../r3f/ToolkitModel.jsx'
import { StarrySky } from '../r3f/StarrySky.jsx'



export default function MyToolkit() {
    const overlayRef = useRef(null)
    const [ eventSource, setEventSource ] = useState(null)
    const caption = useRef(null)
    const scroll = useRef(0)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" })
        if (overlayRef.current) setEventSource(overlayRef.current)
    }, [])

    return (
        <>
            <Canvas 
                shadows 
                dpr={[1, 2]} 
                gl={{ antialias: true, powerPreference: "high-performance" }}
                eventSource={ eventSource ?? undefined }
                eventPrefix='client'
                className="fixed inset-0 touch-pan-y"
            >
                <ambientLight intensity={1} />
                <StarrySky />
                <Suspense fallback={null}>
                    <ToolkitModel scroll={scroll} />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
            <div 
                ref={ overlayRef }
                className='fixed inset-0 overflow-y-auto will-change-transform'
                onScroll={(e) => {
                    const el = e.currentTarget
                    const progress = el.scrollTop / (el.scrollHeight - el.clientHeight)
                    scroll.current = progress
                    if (caption.current) caption.current.innerText = progress.toFixed(2)
                }}
            >
                <div className='h-[400vh]'>
                    <MyToolkitUI 
                        caption={caption} 
                        scroll={scroll} 
                        className="pointer-events-auto h-screen w-full"
                    />
                </div>
                <div className="h-[200vh]"/>
            </div>
        </> 
    )
}
