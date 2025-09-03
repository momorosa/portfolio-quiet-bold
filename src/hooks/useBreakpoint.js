import { object } from 'framer-motion/client'
import { useEffect, useMemo, useState } from 'react'

const QUERIES = {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
}

export default function useBreakpoint() {
    const [ matches, setMatches ] = useState({
        sm: false,
        md: false,
        lg: false,
        xl: false,
        "2xl": false,
        width: 0,
    })

    useEffect(() => {
        if (typeof window === "undefined") return

        const mql = Object.fromEntries(
            Object.entries(QUERIES).map(([ k, q ]) => [ k, window.matchMedia(q)])
        )

        const getState = () => ({
            sm: mql.sm.matches,
            md: mql.md.matches,
            lg: mql.lg.matches,
            xl: mql.xl.matches,
            "2xl": mql["2xl"].matches,
            width: window.innerWidth,
        })

        setMatches(getState())

        const handler = () => setMatches(getState())

        Object.values(mql).forEach((mq) => mq.addEventListener?.("change", handler))

        window.addEventListener("resize", handler)

        return () => {
            Object.values(mql).forEach((mq) => mq.removeEventListener?.("change", handler))
            window.removeEventListener("resize", handler)
        }
    }, [])

    const api = useMemo(() => {
        const isMobile = !matches.md
        const isTablet = matches.md && !matches.lg
        const isDesktop = matches.lg
        
        return {
            ...matches,
            isMobile,
            isTablet,
            isDesktop,
            current:
                matches["2xl"] ? "2xl" :
                matches.xl ? "xl" :
                matches.lg ? "lg" :
                matches.md ? "md" :
                matches.sm ? "sm" : "xs",
        }
    }, [matches])

    return api
}