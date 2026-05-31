import { createContext, useContext, useEffect, useMemo, useState } from "react"
// Theme is locked to dark — toggleTheme is a no-op kept for API compatibility

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
    const [theme] = useState("dark")

    const isTransitioning = false

    useEffect(() => {
        const root = document.documentElement
        root.dataset.theme = "dark"
        root.classList.add("dark")
    }, [])

    const toggleTheme = () => {}

    const value = useMemo(
        () => ({
            theme,
            isDark: theme === "dark",
            isTransitioning,
            toggleTheme,
        }),
        [theme, isTransitioning]
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider")
    return ctx
}