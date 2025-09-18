import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, Preload } from '@react-three/drei'
import { hqContent } from '../contents/housequest.js'
import Accordion from '../components/Accordion.jsx'
import Button from '../components/Button.jsx'
import { linkify } from '../utils/linkify.jsx'
import IPhone from '../r3f/IPhoneExperience.jsx'
import useBreakpoint from "../hooks/useBreakpoint.js"

const LINKS = {
   "access site": "https://housequest.webflow.io/",
}


export default function HousequestWork() {
    const { isMobile } = useBreakpoint()

    return (
        <>
            {/* Mobile: hero block on top. Desktop: fixed full-screen background */}
            <Canvas
                shadows
                dpr={[ 1, isMobile ? 1.25 : 2 ]}
                camera={{ position: [0, 3, 20], fov: 50 }}
                gl={{ antialias: true, powerPreference: 'high-performance' }}
                className="
                    bg-warm-gray-dark
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
                    <IPhone />
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
                                {hqContent.headline}
                            </h1>
                            <h2 className="text-2xl py-4">{ hqContent.title }</h2>
                            <p className="font-light">{ hqContent.team }</p>
                            <p className="font-light pb-6">
                                { hqContent.startDate } - { hqContent.endDate }
                            </p>
                            <p className="pt-2 pb-4">{ linkify(hqContent.intro, LINKS) }</p>
                            <p className="pt-2 pb-4 text-yellow-mellow-light">
                                Skills: { hqContent.skills }
                            </p>
                                { hqContent.projects.map((proj, i) => (
                                    <Accordion
                                        key={ proj.projectName }
                                        title={ proj.projectName }
                                        meta={ proj.keyOutcomes }
                                        defaultOpen={ i === 0 }
                                        buttonProps={ proj.actionButton }
                                    >
                                        { proj.description }
                                    </Accordion>
                                ))}
                            <p className="pt-4 pb-2 italic">
                                HouseQuest is currently in stealth. If you’re interested in beta testing, feel free to reach out for early access.
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
                                Sign me up
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
