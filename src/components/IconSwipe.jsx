import { motion, useReducedMotion } from "framer-motion"
import { useId } from "react"

export function IconWipe({
    size = 24,
    base = "#747474",
    active = "#F5D565",
    direction = "bt",        // "bt" | "tb" | "lr" | "rl"
    mask = "scale",          // "scale" | "slide"
    d,
    paths,
    circles = [],
    viewBox = "0 0 24 24",
    className = "",
    duration = 0.45,         
    skew = 6,                
}) {
    const mid = useId()
    const prefersReduced = useReducedMotion()

    const [, , vwStr, vhStr] = viewBox.split(" ")
    const vw = Number(vwStr) || 24
    const vh = Number(vhStr) || 24
    const shapeDs = paths?.length ? paths : d ? [d] : []

    const renderShapes = (fill) => (
        <>
            {shapeDs.map((sd, i) => <path key={`p-${i}`} d={sd} fill={fill} />)}
            {circles.map(({ cx, cy, r }, i) => (
                <circle key={`c-${i}`} cx={cx} cy={cy} r={r} fill={fill} />
            ))}
        </>
    )

    // --- MASK VARIANTS ---
    // slide: move a full-size rect (safe & linear)
    const slideInit = {
        bt: { x: 0, y: vh },
        tb: { x: 0, y: -vh },
        lr: { x: -vw, y: 0 },
        rl: { x: vw, y: 0 },
    }[direction]
    const slideHover = { x: 0, y: 0 }

    // scale: scale a full-size rect from an edge (organic)
    const scaleAxes = ["bt", "tb"].includes(direction) ? "y" : "x"
    const origins = {
        bt: { originX: 0.5, originY: 1 },   // bottom
        tb: { originX: 0.5, originY: 0 },   // top
        lr: { originX: 0,   originY: 0.5 }, // left
        rl: { originX: 1,   originY: 0.5 }, // right
    }[direction]

    const scaleInit = {
        scaleX: scaleAxes === "x" ? 0 : 1,
        scaleY: scaleAxes === "y" ? 0 : 1,
        skewX: scaleAxes === "y" ? skew : 0, // skew along the sweep edge
        skewY: scaleAxes === "x" ? skew : 0,
        ...origins,
    }

    const scaleHover = {
        scaleX: 2,
        scaleY: 2,
        skewX: 0,
        skewY: 0,
        ...origins,            
    }

    const easing = prefersReduced ? "linear" : [0.2, 0.0, 0, 1] // fast-out, slow-in

    return (
        <motion.svg
            className={ className }
            width={ size }
            height={ size }
            viewBox={ viewBox }
            initial="rest"
            whileHover="hover"
            style={{ display: "block" }}
        >
            {/* Base layer */}
            { renderShapes(base) }

            {/* Masked highlight */}
            <mask id={ mid }>
                {mask === "slide" ? (
                    <motion.rect
                        x={0} y={0} width={vw} height={vh} fill="white"
                        variants={{ rest: slideInit, hover: slideHover }}
                        transition={{ duration, ease: easing }}
                    />
                ) : (
                    <motion.rect
                        x={0} y={0} width={vw} height={vh} fill="white"
                        // SVG needs transform-box to respect origin
                        style={{ transformBox: "fill-box" }}
                        variants={{ rest: scaleInit, hover: scaleHover }}
                        transition={{
                            duration,
                            // ease: easing,
                            type: "spring", stiffness: 250, damping: 26, bounce: 0.15
                        }}
                    />
                )}
            </mask>

            <motion.g
                mask={`url(#${mid})`}
                initial={{ opacity: prefersReduced ? 1 : 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: prefersReduced ? 0 : 0.1, delay: prefersReduced ? 0 : duration * 0.6 }}
            >
                {renderShapes(active)}
            </motion.g>
        </motion.svg>
    )
}
