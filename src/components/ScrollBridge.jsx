import { useEffect, useRef } from "react"
import { useScroll } from "@react-three/drei"

export default function ScrollBridge() {
    const scroll = useScroll()
    const rafRef = useRef()

    useEffect(() => {      
        const onGo = (e) => {
            const detail = e?.detail || {}
            const el = scroll?.el

            if(!el || !el.clientHeight) {
                cancelAnimationFrame(rafRef.current)
                rafRef.current = requestAnimationFrame(() => {
                    window.dispatchEvent(new CustomEvent('r3f-go', { detail }))
                })
                return
            }

            const { page = 0, smooth = true, px } = detail
            const top = typeof px === 'number' ? px : page * el.clientHeight
            el.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' })
        }
        window.addEventListener('r3f-go', onGo)
        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener('r3f-go', onGo) 
        }
    }, [ scroll ])

    useEffect(() => {
        const el = scroll?.el
        if(!el) return

        const onScroll = () => {
            const offset = 
                el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)
            window.dispatchEvent(new CustomEvent('r3f-scroll', { detail: { offset }}))
        }
        el.addEventListener('scroll', onScroll, { passive: true })
        return () => el.removeEventListener('scroll', onScroll) 
    }, [ scroll?.el ])
    return null
}   