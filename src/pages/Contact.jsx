import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Portal from "../r3f/Portal"
import FooterText from '../components/FooterText'
import Button from '../components/Button'

export default function Contact() {
    const containerRef = useRef(null)
    const [ eventSource, setEventSource ] = useState(null)

    useEffect(() => {
        if (containerRef.current) setEventSource(containerRef.current)
    }, [])

    return <>
        <section className="relative h-[100svh] w-full">
            <div ref={ containerRef } className="sticky top-0 h-screen w-full">
                <Canvas
                    shadows
                    camera={{
                        fov: 30,
                        near: 0.1,
                        far: 2000,
                        position: [ 0, 0, 10 ]
                    }}
                    className="absolute inset-0 touch-pan-y"
                    gl={{ antialias: true, stencil: true, powerPreference: "high-performance" }}
                    dpr={[ 1, 2 ]}
                    eventSource={ eventSource ?? undefined }
                    eventPrefix='client'
                >
                    <Portal />
                </Canvas>
                <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
                    <div className="max-w-[1120px] mx-auto w-full p-6 md:px-10 pointer-events-auto">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <h2 className="text-3xl md:text-4xl text-white">Let’s grab coffee!</h2>
                                <p className="text-zinc-300 text-lg font-light py-2">If you love building playful, interactive products, let's connect.</p>
                            </div>
                            <Button
                                id="btn"
                                href={`mailto:momorosa.design@gmail.com?subject=${encodeURIComponent(
                                    "Quick hello from your site — let's chat")}`}
                                className="font-medium text-black bg-yellow-mellow px-5 py-3"
                                aria-label="Let's chat"
                                leftIcon="local_cafe"
                                iconSize="md-18"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                I'm in!
                            </Button>  
                        </div>  
                        <p className="font-light italic text-yellow-mellow-light mt-10">
                            * doublc click to enter & exit portal
                        </p>                  
                    </div>
                    <div className="mt-auto pointer-events-auto">
                        <FooterText />
                    </div>
                </div>
            </div>
        </section>
    </>
}

