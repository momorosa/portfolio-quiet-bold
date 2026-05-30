import { createContext, useContext, useEffect, useMemo, useState } from "react"

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("theme")
        if (saved === "light" || saved === "dark") return saved
        
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        return prefersDark ? "dark" : "light"
    })

    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const root = document.documentElement
        root.dataset.theme = theme
        root.classList.toggle("dark", theme === "dark")
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setIsTransitioning(true)
        setTheme((prev) => (prev === "dark" ? "light" : "dark"))
        window.setTimeout(() => setIsTransitioning(false), 420)
    }

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