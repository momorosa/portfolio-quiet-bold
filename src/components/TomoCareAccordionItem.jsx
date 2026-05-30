import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Button from "./Button.jsx"

export default function TomoCareAccordionItem({
    phase,
    mediaComponent,
    isOpen = false,
    onToggle,
    isLast = false,
}) {
    const contentRef = useRef(null)
    const [maxHeight, setMaxHeight] = useState("0px")

    const href = phase.buttonProps?.href || ""
    const hasHref = href.trim().length > 0

    // Flexible: either set phase.isComingSoon manually,
    // or let the component infer it from an empty button href.
    const isComingSoon = phase.isComingSoon || !hasHref

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen && !isComingSoon ? `${contentRef.current.scrollHeight}px` : "0px")
        }
    }, [isOpen, isComingSoon, phase])

    const isExternal = /^https?:\/\//i.test(href)

    const metaIconColor =
        phase.metaIcon === "rocket_launch" ? "text-emerald-400" :
        phase.metaIcon === "code_blocks" ? "text-amber-200" :
        phase.metaIcon === "calendar_clock" ? "text-sky-200" :
        "text-[var(--accent)]"

    const handleToggle = () => {
        if (!isComingSoon) {
            onToggle?.()
        }
    }

    return (
        <article className={!isLast ? "border-b border-[var(--border)]" : ""}>
            <div
                className={[
                    "flex items-start justify-between gap-4 px-5 py-5 md:px-8 md:py-6",
                    isComingSoon ? "opacity-75" : "",
                ].join(" ")}
            >
                <button
                    type="button"
                    onClick={handleToggle}
                    disabled={isComingSoon}
                    aria-expanded={!isComingSoon ? isOpen : undefined}
                    aria-disabled={isComingSoon}
                    className={[
                        "group min-w-0 flex-1 text-left focus:outline-none",
                        isComingSoon ? "cursor-default" : "cursor-pointer",
                    ].join(" ")}
                >
                    <h3 className="text-xl font-semibold tracking-tight text-[var(--text)] md:text-2xl">
                        {phase.title}
                    </h3>

                    {phase.keyOutcomes && (
                        <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-[var(--text-muted)] md:text-[15px]">
                            <span className={`material-symbols-outlined mt-[1px] text-[18px] ${metaIconColor}`}>
                                {phase.metaIcon || "strategy"}
                            </span>
                            <span className={`font-semibold ${metaIconColor}`}>
                                {phase.keyOutcomesTitle}
                            </span>
                            <span>{phase.keyOutcomes}</span>
                        </p>
                    )}
                </button>

                <div className="shrink-0">
                    {isComingSoon ? (
                        <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
                            Coming soon
                        </span>
                    ) : isOpen && phase.buttonProps ? (
                        <Button
                            id="btn"
                            href={href}
                            className="px-4 py-2"
                            aria-label={phase.buttonProps.label}
                            rightIcon="chevron_forward"
                            rightIconHover="east"
                            iconSize="md-18"
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                        >
                            {phase.buttonProps.label}
                        </Button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleToggle}
                            aria-label={`Expand ${phase.title}`}
                            className="group inline-flex items-center justify-center p-1 text-[var(--accent)] transition-colors duration-200 hover:text-[var(--accent-hover)]"
                        >
                            <motion.span
                                initial={false}
                                animate={{ rotate: isOpen ? -45 : 0 }}
                                transition={{ duration: 0.28, ease: "easeInOut" }}
                                className="material-symbols-outlined text-[30px] leading-none cursor-pointer group-hover:scale-120 group-hover:text-[var(--accent-hover)]"
                            >
                                add
                            </motion.span>
                        </button>
                    )}
                </div>
            </div>

            {!isComingSoon && (
                <div
                    ref={contentRef}
                    style={{ maxHeight }}
                    className="overflow-hidden transition-[max-height] duration-400 ease-in-out"
                >
                    <div className="px-5 pb-5 md:px-8 md:pb-8">
                        {mediaComponent ? (
                            mediaComponent
                        ) : (phase.mediaType && phase.mediaSrc) ? (
                            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
                                <MediaBlock phase={phase} />
                            </div>
                        ) : null}

                        {phase.description ? (
                            <p className="mt-5 max-w-[900px] text-sm leading-6 text-[var(--text-muted)] md:text-[16px]">
                                {phase.description}
                            </p>
                        ) : null}
                    </div>
                </div>
            )}
        </article>
    )
}

function MediaBlock({ phase }) {
    if (phase.mediaType === "video") {
        return (
            <video
                src={phase.mediaSrc}
                poster={phase.mediaPoster}
                controls
                playsInline
                preload="metadata"
                className="aspect-[16/9] w-full object-cover"
                aria-label={phase.mediaAlt || phase.title}
            />
        )
    }

    return (
        <img
            src={phase.mediaSrc}
            alt={phase.mediaAlt || phase.title}
            className="aspect-[16/9] w-full object-cover"
        />
    )
}