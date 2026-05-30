import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import clsx from "clsx"
import { useTheme } from "../theme/ThemeProvider.jsx"

export default function QuietBoldLogo({ className = "", size = "1em", onOClick }) {
  const prefersReduced = useReducedMotion()
  const { isDark, toggleTheme } = useTheme()

  const handleClick = onOClick ?? toggleTheme
  const label = onOClick
    ? "Enter Agent-Centered View"
    : `Switch to ${isDark ? "light" : "dark"} mode`

  return (
    <span
      className={clsx("inline-flex items-baseline select-none", className)}
      style={{ fontSize: size, lineHeight: 1 }}
    >
      <span>Quiet B</span>

      {/* Tooltip wrapper — only active when onOClick is wired */}
      <span className="relative group/logo">
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label={label}
          className="
            relative inline-flex h-[0.7em] w-[0.7em] items-center justify-center
            m-0 border-0 bg-transparent p-0
            text-yellow-mellow cursor-pointer rounded-[0.2em]
            align-baseline leading-none
            focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-mellow/60
          "
          style={{
            fontSize: size,
            lineHeight: 1,
            transformOrigin: "50% 50%",
          }}
          whileHover={!prefersReduced ? { scale: 0.94, rotate: -8 } : {}}
          whileTap={!prefersReduced ? { scale: 0.86, rotate: -14 } : {}}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="o"
                initial={prefersReduced ? false : { opacity: 0, rotate: -40, scale: 0.7 }}
                animate={prefersReduced ? {} : { opacity: 1, rotate: 0, scale: 1 }}
                exit={prefersReduced ? {} : { opacity: 0, rotate: 40, scale: 0.7 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute inset-0 inline-flex items-center justify-center"
                style={{
                  lineHeight: 1,
                  textShadow: "0 0 10px rgba(232,176,89,0.16)",
                }}
              >
                o
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={prefersReduced ? false : { opacity: 0, rotate: 40, scale: 0.7 }}
                animate={prefersReduced ? {} : { opacity: 1, rotate: 0, scale: 1 }}
                exit={prefersReduced ? {} : { opacity: 0, rotate: -40, scale: 0.7 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute inset-0 inline-flex items-center justify-center"
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "0.86em",
                    lineHeight: 1,
                    fontVariationSettings:
                      '"FILL" 1, "wght" 500, "GRAD" 0, "opsz" 24',
                    textShadow: "0 0 10px rgba(232,176,89,0.12)",
                  }}
                  aria-hidden="true"
                >
                  dark_mode
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {onOClick && (
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)]
              z-50 whitespace-nowrap
              rounded-lg border border-white/10 bg-zinc-900 px-2.5 py-1.5
              text-xs font-medium text-zinc-100 shadow-lg
              opacity-0 group-hover/logo:opacity-100
              transition-opacity duration-200
            "
          >
            Enter Agent-Centered View
          </span>
        )}
      </span>

      <span>ld.</span>
    </span>
  )
}