import { Link, useLocation } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import clsx from "clsx"

export default function QuietBoldHomeLink({
    className = "",
    size = "1em",
    mobile = false,
}) {
    const prefersReduced = useReducedMotion()
    const location = useLocation()

    const handleClick = (e) => {
        if (location.pathname === "/") {
            e.preventDefault()
            window.scrollTo({
                top: 0,
                behavior: prefersReduced ? "auto" : "smooth",
            })
            window.history.replaceState(null, "", "#top")
        }
    }

    return (
        <Link
            to="/"
            onClick={handleClick}
            aria-label={mobile ? "Go to top of homepage" : "Go to homepage"}
            className={clsx(
              "inline-flex items-center rounded-sm text-[var(--text)] focus:outline-none      focus-visible:ring-2 focus-visible:ring-yellow-mellow/50",
              className
            )}
            style={{ fontSize: size, lineHeight: 1 }}
        >
            {mobile ? (
                <motion.span
                    whileHover={!prefersReduced ? { scale: 1.06 } : {}}
                    whileTap={!prefersReduced ? { scale: 0.94 } : {}}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="inline-flex items-center justify-center"
                >
                    <span className="material-symbols-outlined text-[22px] text-[var(--text)]">
                        home
                    </span>
                </motion.span>
            ) : (
                <>
                    <span>Quiet B</span>
                    <motion.span
                      className="inline-block text-yellow-mellow"
                      style={{ fontSize: size, lineHeight: 1 }}
                      whileHover={!prefersReduced ? { scale: 0.88, opacity: 0.9 } : {}}
                      whileFocus={!prefersReduced ? { scale: 0.88, opacity: 0.9 } : {}}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        o
                    </motion.span>
                    <span>ld.</span>
                </>
            )}
        </Link>
    )
}