import React, { forwardRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { myStackContent as content } from '../contents/myStack.js'
import ProjectHeading from './ProjectHeading.jsx'

const START_AT = 0.25

const RANGES = [
    { key: "design", start: 0.25, end: 0.46 },
    { key: "dev",    start: 0.46, end: 0.67 },
    { key: "ai",     start: 0.67, end: 0.88 },
    { key: "xr",     start: 0.88, end: 1.00 },
]

const BLEND = 0.06

function SectionBlock({ title, items, progress, range, first = false }) {
    // Build a 4-point domain for nice ease-in/out per section
    const s0 = Math.max(0, range.start - BLEND)
    const s1 = range.start
    const e1 = range.end
    const e2 = Math.min(1, range.end + BLEND)

    // Cross-fade opacity and add a tiny slide
    const opacity = useTransform(progress, [s0, s1, e1, e2], [0, 1, 1, 0])
    const y       = useTransform(progress, [s0, s1, e1, e2], [20, 0, 0, -20])

    return (
        <section className="min-h-[170vh] md:min-h-[220vh] snap-start">
            <motion.div
                style={{ opacity, y }}
                className={`sticky top-12 sm:top-16 md:top-0 max-w-[720px] mx-auto md:ml-[14vw] p-6 md:p-20 pointer-events-none ${
          first ? "mt-4 sm:mt-6" : ""
        }`}
            >
                <h2 className="text-5xl tracking-wider font-light mb-6 pt-20">{title}</h2>
                {items.map((tool, i) => (
                    <div className="pb-4" key={i}>
                        <p className="text-xl">{tool.tool}</p>
                        <p className="text-zinc-400">{tool.description}</p>
                    </div>
                ))}
            </motion.div>
        </section>
    )
}

const MyToolkitUI = forwardRef(function MyToolkitUI({ scroll, caption }, ref) {
    const progress = useMotionValue(START_AT)

    return (
        <div
            ref={ref}
            onScroll={(e) => {
                const el   = e.currentTarget;
                const max  = el.scrollHeight - el.clientHeight;
                const raw  = max > 0 ? el.scrollTop / max : 0;

                // If overlay hasn't been scrolled yet, keep timeline at 0.
                const shifted = raw === 0 ? 0 : (START_AT + raw * (1 - START_AT));

                const p = Math.min(1, Math.max(0, shifted));
                if (scroll) scroll.current = p;
                if (progress?.set) progress.set(p);
                if (caption?.current) caption.current.innerText = p.toFixed(2);
            }}
            className="absolute inset-0 h-screen w-screen overflow-y-auto z-20
                    snap-y snap-proximity text-white overscroll-contain touch-pan-y"
        >
            <ProjectHeading
                title={content.title}
                description={content.description}
                roles={content.roles}
                className="text-white font-primary"
            />

            <div className="block md:hidden h-10 sm:h-14"/>

            <SectionBlock
                first
                title={content.designStack.title}
                items={content.designStack.stacks}
                progress={progress}
                range={RANGES[0]}
            />

            <SectionBlock
                title={content.devStack.title}
                items={content.devStack.stacks}
                progress={progress}
                range={RANGES[1]}
            />

            <SectionBlock
                title={content.aiStack.title}
                items={content.aiStack.stacks}
                progress={progress}
                range={RANGES[2]}
            />

            <SectionBlock
                title={content.vrStack.title}
                items={content.vrStack.stacks}
                progress={progress}
                range={RANGES[3]}
            />
            
            {/* Debug like original caption */}
            {/* <span ref={caption} className="fixed top-0 right-0 m-20 text-white font-light text-6xl">
                {START_AT.toFixed(2)}
            </span> */}
        </div>
    )
})

export default MyToolkitUI

