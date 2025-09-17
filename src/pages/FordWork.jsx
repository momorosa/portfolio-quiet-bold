import { Canvas } from '@react-three/fiber'
import { StarrySky } from '../r3f/StarrySky.jsx'
import { fordContent } from '../contents/ford.js'
import Suv from '../r3f/Suv.jsx'
import Accordion from '../components/Accordion.jsx'
import Button from '../components/Button.jsx'
import { Suspense } from 'react'
import { Html, Preload } from '@react-three/drei'

export default function FordWork() {
  return (
    <>
        {/* Mobile: hero block on top. Desktop: fixed full-screen background */}
        <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ fov: 35, position: [0, 1.6, 12] }}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
            className="
                block w-full h-[70svh]                     /* mobile hero height */
                md:fixed md:inset-0 md:h-auto              /* desktop overlay mode */
                md:z-0
                pointer-events-auto                        /* interact on mobile */
            "
        >
            <Suspense 
                fallback={
                    <Html center style={{ pointerEvents: 'none' }}>
                        <div className="h-6 w-6 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    </Html>
                }
            >
                <StarrySky />
                <Suv />
            </Suspense>
            <Preload all />
        </Canvas>

        {/* Mobile: regular flow content under the hero.
          Desktop: fixed overlay grid with left scroll column. */}
        <div
            className="
                relative z-10                              /* sits below canvas on mobile, above on desktop via md:z-20 */
                md:fixed md:inset-0 md:z-20
                md:pointer-events-none                     /* desktop: pass through except left column */
            "
        >
            <div className="mx-auto h-full max-w-[1120px] grid grid-cols-1 md:grid-cols-[minmax(0,640px)_1fr]">
                {/* LEFT: content column */}
                <div className="pointer-events-auto md:overflow-y-auto md:overscroll-contain hide-scrollbar">
                    <div className="px-6 md:px-10 py-12 md:py-16 text-white font-primary min-h-screen">
                        <h1 className="text-3xl md:text-4xl font-semibold md:leading-[1.2] text-yellow-mellow md:pt-24">
                            {fordContent.headline}
                        </h1>
                        <h2 className="text-2xl py-4">{fordContent.title}</h2>
                        <p className="font-light">{fordContent.team}</p>
                        <p className="font-light pb-6">
                            {fordContent.startDate} - {fordContent.endDate}
                        </p>
                        <p className="pt-2 pb-4">{fordContent.intro}</p>
                        <p className="pt-2 pb-4 text-yellow-mellow-light">
                            Skills: {fordContent.skills}
                        </p>
                        {fordContent.projects.map((proj, i) => (
                            <Accordion
                                key={proj.projectName}
                                title={proj.projectName}
                                meta={proj.keyOutcomes}
                                defaultOpen={i === 0}
                            >
                                {proj.description}
                            </Accordion>
                        ))}
                        <p className="pt-4 pb-2 italic">
                            Ford work is confidential. Reach out for a private showcase.
                        </p>
                        <Button
                            id="btn"
                            href="mailto:momorosa.design@gmail.com"
                            className="w-64 font-medium text-black bg-yellow-mellow px-5 py-3 mt-4"
                            aria-label="send message"
                            rightIcon="send"
                            iconSize="md-18"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Send message
                        </Button>
                        <div className="h-16" /> {/* footer spacer */}
                        </div>
                    </div>
                    {/* RIGHT: keeps canvas drag lane clean on desktop */}
                    <div className="hidden md:block select-none" aria-hidden />
                </div>
            </div>
        </>
    )
}
