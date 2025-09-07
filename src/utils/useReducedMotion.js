import { useEffect, useState } from 'react'

export default function useReducedMotion() {
    const [ reduced, setReduced ] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        setReduced(mq.matches)

        const handler = (e) => setReduced(e.matches)
        mq.addEventListener("change", handler)

        return () => mq.removeEventListener("change", handler)
    }, [])

    return reduced
}
