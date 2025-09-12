import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import React from "react"

const MONO = "M22.5352 14.5225H6.50977V16.0254H22.5352V22.5352H0V8.0127H16.0244V6.50977H0V0H22.5352V14.5225Z"

const svgVariants = {
    rest:  { rotate: 0,   scale: 1 },
    hover: { rotate: -10, scale: 1.05 },
}

const fillVariants = {
    rest:  { fill: "var(--textTitle, #ffffff)" },
    hover: { fill: "var(--accent, #CF9033)" },
}

export default function Monogram() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = React.useCallback((e) => {
        if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return
        
        e.preventDefault()

        const goTop = () => {
            window.dispatchEvent(new CustomEvent('r3f-go', { detail: { page: 0, smooth: true } }))  
        }
        if(location.pathname === '/') {
            if (location.hash) navigate('/', { replace: true })
            requestAnimationFrame(() => requestAnimationFrame(goTop))
        }else {
            navigate('/')
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    goTop()
                })
            })
        }
    }, [location.pathname, location.hash, navigate ])

    return (
        <Link 
            to="/" 
            aria-label="Home" 
            onClick={ handleClick  }
            className="flex justify-center items-center shrink-0"
        >
            <motion.svg
                className="w-[32px] h-auto"
                viewBox="0 0 23 32"
                initial="rest"
                whileHover="hover"
                variants={ svgVariants }
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >

            <motion.path
                d={ MONO }
                variants={ fillVariants }
                transition={{ duration: 0.18, ease: "easeOut" }}
            />

            {/* Circle color lags slightly */}
            <motion.circle
                cx="11.1547"
                cy="28.6198"
                r="3.38028"
                variants={ fillVariants }
                transition={{ duration: 0.18, ease: "easeOut", delay: 0.09 }}
            />
            </motion.svg>
        </Link>
    )
}
