import { useEffect, useId, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import IconButton from "./IconButton"
import { FancyLink } from "./FancyLink"


export default function LabProjectOverlay({
    title,
    date,
    disclaimer = "Best on laptop/desktop.",
    homeLink = "/",
    tech = [],            
    credits = [],         
    className = "",
    showIconsOnMobile = true,
}) {

    const navigate = useNavigate()

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
        return () => window.removeEventListener("keydown", onKey)
    }, [open])

    return (
        <div className={`absolute inset-x-0 top-0 z-10 pointer-events-none ${className}`}>
            {/* Top bar */}
            <div className="flex items-start justify-between p-4 sm:p-6 text-zinc-300 select-none">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-white/80">{title}</h3>
                  <div className="text-xs sm:text-sm">
                    {date && <p className="opacity-70 py-1">{date}</p>}
                    {disclaimer && <p className="text-amber-200/70">* {disclaimer}</p>}
                  </div>
                </div>

            {/* Right controls: icon buttons on mobile, text on ≥sm */}
            <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
                {showIconsOnMobile ? (
                    <>
                        {/* Mobile icons (hidden on ≥sm) */}
                        <div className="flex sm:hidden items-center gap-2">
                            <IconButton
                                label="Home"
                                iconName="home"
                                onClick={() => (window.location.href = homeLink)}
                                className="w-9 h-9"
                            />
                            <IconButton
                                label="Technologies & credits"
                                iconName="info"
                                hasPopup
                                onClick={() => setOpen(true)}
                                className="w-9 h-9"
                            />
                        </div>
                        {/* Text buttons on ≥sm */}
                        <div className="hidden sm:flex items-center gap-3 cursor-pointer">
                            <FancyLink
                                href="/" 
                                aria-label="Home"
                                className="text-sm hover:text-amber-400/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 transition"
                            >
                                Back to Quiet Bold
                            </FancyLink>

                            <button
                              type="button"
                              aria-haspopup="dialog"
                              aria-controls={dialogId}
                              onClick={() => setOpen(true)}
                              className="ml-1 rounded-full px-3 py-1 text-xs sm:text-sm border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
                            >
                                Tech
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <IconButton
                            label="Back to Home"
                            iconName="home"
                            onClick={() => navigate(homeLink)}
                            className="w-9 h-9"
                        />
                        
                        <button
                            type="button"
                            aria-haspopup="dialog"
                            aria-controls={dialogId}
                            onClick={() => setOpen(true)}
                            className="ml-1 rounded-full px-3 py-1 text-xs sm:text-sm border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 transition"
                        >
                            Tech
                        </button>
                    </>
                )}
            </div>
        </div>

        {/* Overlay panel */}
        { mounted && createPortal(
            <AnimatePresence>
            {open && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    id={dialogId}
                    className="fixed inset-0 z-[60] shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <button 
                        aria-label="Close"
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm material-symbols-outlined"
                    />
                    <motion.div
                        className="pointer-events-auto absolute right-4 top-4 sm:right-6 sm:top-6 w-[92vw] max-w-md rounded-2xl border border-white/10 bg-zinc-900/30 text-zinc-200 shadow-2xl"
                        initial={{ opacity: 0, y: -12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.9 }}
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                            <h4 className="text-sm font-semibold">Technologies & Credits</h4>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 text-zinc-300/50 hover:cursor-pointer hover:text-zinc-300 material-symbols-outlined tansition-all ease-in-out duration-200"
                            >
                                Close
                            </button>
                        </div>

                        <div className="p-4 space-y-5">
                            {!!tech?.length && (
                                <div>
                                    <div className="text-xs uppercase tracking-wide opacity-70 mb-2">Stack</div>
                                    <ul className="flex flex-wrap gap-2">
                                        {tech.map((t) => (
                                            <li
                                                key={t}
                                                className="text-xs rounded-full border border-white/10 bg-white/5 px-2.5 py-1"
                                            >
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {!!credits?.length && ( 
                                <div>
                                    <div className="text-xs uppercase tracking-wide opacity-70 mb-2">Credits</div>
                                    <ul className="space-y-1.5">
                                        {credits.map((c, i) => (
                                            <li key={i} className="text-sm">
                                                {c.href ? (
                                                    <FancyLink
                                                        href={c.href}
                                                        className="underline decoration-white/20 hover:decoration-amber-400/60"
                                                        title={c.label}
                                                        aria-label={c.label}
                                                    >
                                                        {c.label}
                                                    </FancyLink>
                                                ) : (
                                                    c.label
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>,
            document.body
            )}
        </div>
    )
}
