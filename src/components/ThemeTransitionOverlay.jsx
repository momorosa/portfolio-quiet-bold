import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "../theme/ThemeProvider.jsx"

export default function ThemeTransitionOverlay() {
    const { isTransitioning, isDark } = useTheme()

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    key={isDark ? "dark" : "light"}
                    className="pointer-events-none fixed inset-0 z-[999]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.08 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{
                        background: isDark
                        ? "radial-gradient(circle at 50% 18%, rgba(245,245,245,0.12),     transparent     48%)  "
                        : "radial-gradient(circle at 50% 18%, rgba(32,32,32,0.10), transparent    48%)   ",
                    }}
                />
            )}
        </AnimatePresence>
    )
}