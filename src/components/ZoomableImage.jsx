import { useEffect, useId, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import IconButton from "./IconButton"

export default function ZoomableImage({
    src,
    alt = "",
    className = "",
    imgClassName = "",
    children,
}) {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const dialogId = useId()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!open) return

        const onKey = (e) => e.key === "Escape" && setOpen(false)
        window.addEventListener("keydown", onKey)

        const original = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            window.removeEventListener("keydown", onKey)
            document.body.style.overflow = original
        }
    }, [open])

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-controls={dialogId}
                aria-label={`View ${alt || "image"} full size`}
                className={`group relative block w-full cursor-zoom-in ${className}`}
            >
                {children ?? (
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        className={`w-full ${imgClassName}`}
                    />
                )}
                <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="material-icons material-symbols-outlined text-[20px] leading-none">
                        zoom_in
                    </span>
                </span>
            </button>

            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            id={dialogId}
                            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <button
                                aria-label="Close"
                                onClick={() => setOpen(false)}
                                className="absolute inset-0 cursor-zoom-out bg-black/85 backdrop-blur-sm"
                            />

                            <motion.img
                                src={src}
                                alt={alt}
                                className="relative max-h-full max-w-full rounded-xl object-contain shadow-2xl"
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.9 }}
                            />

                            <IconButton
                                label="Close full-size image"
                                iconName="close"
                                onClick={() => setOpen(false)}
                                className="pointer-events-auto absolute right-4 top-4 sm:right-6 sm:top-6 h-10 w-10 border border-white/15 bg-black/50 text-white hover:bg-black/70"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}
