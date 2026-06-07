import { Link } from "react-router-dom"
import { useEffect, useMemo, useRef, useState } from "react"
import { projects } from "../contents/projects.js"

export default function RelatedLabProjects({
  currentProjectUrl,
  title = "More from the Lab",
}) {
  const scrollerRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  const relatedProjects = useMemo(() => {
    return projects.projectBlurbs.filter(
      (project) => project.buttonUrl !== currentProjectUrl
    )
  }, [currentProjectUrl])

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

  return (
    <section
      aria-labelledby="related-lab-projects"
      className="border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 lg:px-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
              Explore more
            </p>
            <h2
              id="related-lab-projects"
              className="text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl"
            >
              {title}
            </h2>
          </div>

          <Link
            to="/#lab"
            className="hidden text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)] md:inline-flex"
          >
            Back to Lab
          </Link>
        </div>

        <div
          ref={scrollerRef}
          className="
            hide-scrollbar
            flex gap-4 overflow-x-auto overflow-y-hidden pb-2
            snap-x snap-mandatory
            lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:pb-0
          "
        >
          {relatedProjects.map((project) => {
            const isExternal = /^https?:\/\//i.test(project.buttonUrl)

            const CardTag = isExternal ? "a" : Link
            const cardProps = isExternal
              ? {
                  href: project.buttonUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {
                  to: project.buttonUrl,
                }

            return (
              <CardTag
                key={project.buttonUrl}
                {...cardProps}
                className="
                  group snap-start shrink-0 w-[72vw] max-w-[280px]
                  rounded-2xl border border-[var(--border)]
                  bg-[var(--surface)] p-3
                  transition-transform duration-300 hover:-translate-y-0.5
                  lg:w-auto lg:max-w-none
                "
              >
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                  {project.tagline}
                </p>

                <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-[var(--text)]">
                  {project.title}
                </h3>

                <div className="mt-3">
                  <CompactMediaPreview
                    title={project.title}
                    posterSrc={project.imgUrl}
                    gifSrc={project.gifUrl}
                    videoSrc={project.videoUrl}
                  />
                </div>
              </CardTag>
            )
          })}
        </div>

        <Link
          to="/#lab"
          className="mt-5 inline-flex text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)] md:hidden"
        >
          Back to Lab
        </Link>
      </div>
    </section>
  )
}

function CompactMediaPreview({ title, posterSrc, gifSrc, videoSrc }) {
  const [active, setActive] = useState(false)
  const videoRef = useRef(null)

  const isTouch = useMemo(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    []
  )

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
      className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]"
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
    </div>
  )
}