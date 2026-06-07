import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ZoomableImage from "./ZoomableImage.jsx"

export default function ImageCarousel({ items, autoDelay = 15000, reduceMotion }) {
    const [index, setIndex] = useState(0)

    const hasItems = items && items.length > 0
    if (!hasItems) return null

    const next = () => setIndex((prev) => (prev + 1) % items.length)
    const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length)

    // Auto-play every 15s (disabled if prefers-reduced-motion)
    useEffect(() => {
        if (reduceMotion) return
        const id = setInterval(next, autoDelay)
        return () => clearInterval(id)
    }, [autoDelay, reduceMotion, items.length])

    const current = items[index]

    return (
        <div className="relative w-full overflow-hidden rounded-3xl bg-black/40 border border-white/10">
            {/* Image area */}
             <div className="aspect-[16/9] w-full overflow-hidden">
                <ZoomableImage
                    src={current.src}
                    alt={current.caption || "Project image"}
                    className="h-full"
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={current.src}
                            src={current.src}
                            alt={current.caption || "Project image"}
                            className="h-full w-full object-cover"
                            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
                            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                            transition={
                                reduceMotion
                                ? { duration: 0 }
                                : { duration: 0.6, ease: "easeInOut" }
                            }
                            loading="eager"
                            decoding="async"
                        />
                    </AnimatePresence>
                </ZoomableImage>

                {/* Left / right arrows */}
                <button
                    type="button"
                    onClick={prev}
                    className="group absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 size-12
                    flex items-center justify-center backdrop-blur hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-mellow/60"
                >
                    <span className="material-icons material-symbols-outlined text-white">
                        chevron_left
                    </span>
                </button>
                <button
                    type="button"
                    onClick={next}
                    className="group absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 size-12
                    flex items-center justify-center backdrop-blur hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-mellow/60"
                >
                    <span className="material-icons material-symbols-outlined text-white text-xl">
                        chevron_right
                    </span>
                </button>
            </div>

            {/* Caption + dots */}
            <div className="flex items-start justify-between gap-4 px-6 py-4">
                <p className="text-zinc-300 leading-relaxed md:text-base">
                    {current.caption}
                </p>
                <div className="flex shrink-0 gap-1">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setIndex(i)}
                            className={`h-2 w-2 rounded-full transition-opacity ${
                              i === index ? "bg-yellow-mellow opacity-100" : "bg-zinc-500 opacity-40"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                </div>
            </div>
        </div>
    )
}
