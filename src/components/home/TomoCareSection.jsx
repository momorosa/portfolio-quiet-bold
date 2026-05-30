import { useState } from "react"
import TomoCareAccordionItem from "../TomoCareAccordionItem.jsx"
import { tomoCareIntroContent as content } from "../../contents/tomoCareIntroContent.js"
import WorkingBrainDiagram from "../WorkingBrainDiagram.jsx"
import VerificationUIDiagram from "../VerificationUIDiagram.jsx"

// Diagram components keyed by phase title — takes priority over mediaSrc in the accordion.
const PHASE_DIAGRAMS = {
    "Phase 0: Working Brain":   <WorkingBrainDiagram />,
    "Phase 1: Verification UI": <VerificationUIDiagram />,
}

export default function TomoCareSection() {
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <section
          id="tomo-care"
          className="relative border-t-8 border-yellow-mellow"
          aria-labelledby="tomo-care-heading"
        >
            <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-18 lg:px-14">
                <div className="max-w-[1180px]">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
                        {content.headline}
                    </p>

                    <h2
                        id="tomo-care-heading"
                        className="text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl"
                    >
                        {content.title}
                    </h2>

                    <p className="mt-5 text-base leading-7 text-[var(--text)] md:text-lg">
                        {content.descriptionA}
                    </p>

                    <p className="mt-5 text-base leading-7 text-[var(--text-muted)] md:text-lg">
                        {content.descriptionB}
                    </p>

                    <p className="mt-4 text-sm text-[var(--text-soft)]">

                    </p>
                </div>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                    {content.phases.map((phase, index) => (
                        <TomoCareAccordionItem
                            key={phase.title}
                            phase={phase}
                            mediaComponent={PHASE_DIAGRAMS[phase.title]}
                            isOpen={openIndex === index}
                            onToggle={() => {
                                const href = phase.buttonProps?.href || ""
                                const isComingSoon = phase.isComingSoon || href.trim().length === 0

                                if (!isComingSoon) {
                                    setOpenIndex(index)
                                }
                            }}
                            isLast={index === content.phases.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
