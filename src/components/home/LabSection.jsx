import { useEffect, useMemo, useRef, useState } from "react"
import { projects } from "../../contents/projects.js"
import Button from "../Button.jsx"

export default function LabSection() {
    const scrollerRef = useRef(null)
    const [canLeft, setCanLeft] = useState(false)
    const [canRight, setCanRight] = useState(true)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)")

        const onChange = () => setIsDesktop(mq.matches)
        onChange()

        if (mq.addEventListener) {
            mq.addEventListener("change", onChange)
            return () => mq.removeEventListener("change", onChange)
        } else {
            mq.addListener(onChange)
            return () => mq.removeListener(onChange)
        }
    }, [])

    useEffect(() => {
        if (isDesktop) return

        const el = scrollerRef.current
        if (!el) return

        const onWheel = (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault()
                el.scrollLeft += e.deltaY
            }
        }

        const update = () => {
            const { scrollLeft, scrollWidth, clientWidth } = el
            setCanLeft(scrollLeft > 4)
            setCanRight(scrollLeft < scrollWidth - clientWidth - 4)
        }

        update()
        el.addEventListener("wheel", onWheel, { passive: false })
        el.addEventListener("scroll", update, { passive: true })
        window.addEventListener("resize", update)

        return () => {
            el.removeEventListener("wheel", onWheel)
            el.removeEventListener("scroll", update)
            window.removeEventListener("resize", update)
        }
    }, [isDesktop])

    const scrollByCard = (dir) => {
        const el = scrollerRef.current
        if (!el) return
        const card = el.querySelector("article")
        if (!card) return

        const gap = 24
        const step = card.getBoundingClientRect().width + gap
        el.scrollBy({ left: dir * step, behavior: "smooth" })
    }

    return (
        <section
            id="lab"
            className="relative border-t-8 border-yellow-mellow"
            aria-labelledby="lab-heading"
        >
            <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-18 lg:px-14">
                <div className="max-w-[1440px]">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
                        SIDE BUILDS
                    </p>
                    <h2
                        id="lab-heading"
                        className="text-3xl font-bold tracking-tight md:text-4xl"
                    >
                        Rosa’s Lab
                    </h2>
                    <p className="mt-5 text-base leading-7 text-[var(--text-muted)] md:text-lg">
                        Six things I built outside of work, across AI, real-time 3D, VR, shaders, and game systems. Some grew out of curiosity. Some came from wanting to learn a stack before I'd need it. All of them finished into something playable, watchable, or deployed because I think you learn a technology by finishing one thing in it, not by reading about it.
                    </p>
                </div>

                <div className="relative mt-10">
                    <div
                        ref={scrollerRef}
                        className="
                            hide-scrollbar
                            flex gap-2 md:gap-5 overflow-x-auto overflow-y-hidden pb-2
                            snap-x snap-mandatory
                            lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0
                        "
                        aria-label="Project previews"
                        role="region"
                    >
                        {projects.projectBlurbs.map((project, i) => (
                            <article
                                key={i}
                                className="
                                    snap-start shrink-0 w-[85vw] max-w-[420px]
                                    rounded-2xl border border-[var(--border)]
                                    bg-[var(--surface)]
                                    p-4 shadow-sm
                                    lg:w-auto lg:max-w-none
                                "
                            >
                                <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                                    {project.tagline}
                                </p>

                                <h3 className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                                    {project.title}
                                </h3>

                                <div className="mt-4">
                                    <MediaPreview
                                        title={project.title}
                                        posterSrc={project.imgUrl}
                                        gifSrc={project.gifUrl}
                                        videoSrc={project.videoUrl}
                                        buttonLabel={project.buttonLabel}
                                        buttonUrl={project.buttonUrl}
                                    />
                                </div>

                                <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--text-muted)] md:text-[15px]">
                                    {project.description}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.skills?.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="
                                                inline-flex items-center whitespace-nowrap rounded-md
                                                border border-[var(--border)]
                                                bg-[var(--surface-muted)]
                                                px-2.5 py-1.5 text-xs text-[var(--text-muted)]
                                            "
                                        >
                                            <span className="material-symbols-outlined mr-1.5 text-[16px]">
                                                {skill.icon}
                                            </span>
                                            {skill.skill}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>

                    {!isDesktop && (
                        <>
                            <button
                                type="button"
                                aria-label="Scroll left"
                                onClick={() => scrollByCard(-1)}
                                disabled={!canLeft}
                                className={`hidden md:flex absolute left-0 top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm transition ${
                                    canLeft ? "opacity-100" : "pointer-events-none opacity-0"
                                }`}
                            >
                                <span className="material-symbols-outlined">chevron_backward</span>
                            </button>

                            <button
                                type="button"
                                aria-label="Scroll right"
                                onClick={() => scrollByCard(1)}
                                disabled={!canRight}
                                className={`hidden md:flex absolute right-0 top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm transition ${
                                    canRight ? "opacity-100" : "pointer-events-none opacity-0"
                                }`}
                            >
                                <span className="material-symbols-outlined">chevron_forward</span>
                            </button>
                        </>
                    )}
                </div>

            </div>
        </section>
    )
}

function MediaPreview({
    title,
    posterSrc,
    gifSrc,
    videoSrc,
    buttonUrl,
    buttonLabel,
}) {
    const [active, setActive] = useState(false)
    const videoRef = useRef(null)

    const isTouch = useMemo(
        () =>
            typeof window !== "undefined" &&
            ("ontouchstart" in window || navigator.maxTouchPoints > 0),
        []
    )

    const isExternal = /^https?:\/\//i.test(buttonUrl)

    const onEnter = () => {
        if (isTouch) return
        setActive(true)
    }

    const onLeave = () => {
        if (isTouch) return
        setActive(false)
        const v = videoRef.current
        if (v) {
            v.pause()
            v.currentTime = 0
        }
    }

    useEffect(() => {
        if (!active && !isTouch) return
        const v = videoRef.current
        if (v) v.play().catch(() => {})
    }, [active, isTouch])

    const showMotion = active || isTouch

    return (
        <div
            className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] aspect-[16/10]"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <img
                src={posterSrc}
                alt={`${title} preview`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    showMotion ? "opacity-0" : "opacity-100"
                }`}
            />

            {videoSrc ? (
                <video
                    ref={videoRef}
                    src={videoSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                        showMotion ? "opacity-100" : "opacity-0"
                    }`}
                />
            ) : (
                gifSrc && (
                    <img
                        src={gifSrc}
                        alt={`${title} preview animation`}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                            showMotion ? "opacity-100" : "opacity-0"
                        }`}
                    />
                )
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-3">
                <div className="flex justify-end md:translate-y-1 md:opacity-0 md:transition md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">

                    <Button
                        id="btn"
                        href={buttonUrl}
                        className="bg-black/45 px-4 py-2 font-medium text-white hover:text-white shadow-lg
                            backdrop-blur-sm border border-white/15"
                        aria-label={buttonLabel}
                        rightIcon="chevron_forward"
                        rightIconHover="east"
                        iconSize="md-18"
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                        {buttonLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}