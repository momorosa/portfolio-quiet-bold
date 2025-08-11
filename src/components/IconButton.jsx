import { forwardRef } from 'react'
import { motion } from 'framer-motion'

export default forwardRef (function IconButton(
    {   
        type = "button",
        label,
        onClick,
        iconName,
        icon,
        expanded,
        hasPopup,
        disabled = false,
        variant = "ghost",
        className="",
    }, 
    ref
) {
    const variantClasses = 
        variant === "solid"
        ? "bg-zinc-800 text-white hover:bg-zinc-700"
        : "text-zinc-400 hover:text-white" 
    return(
        <motion.button
            type={ type }
            ref={ ref }
            type="button"
            aria-label={ label }
            aria-haspopup={ hasPopup ? "menu" : undefined }
            aria-expanded={ typeof expanded === "boolean" ? expanded : undefined }
            disabled={ disabled }
            onClick={ onClick }
            className={[
                "inline-flex items-center justify-center rounded-lg cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70",
                "transition-colors", 
                variantClasses,
                disabled ? "opacity-50 pointer-events-none" : "",
                className,
            ].join(" ")}
            whileHover={ disabled ? {} : { scale: 1.06 } }
            whileTap={ disabled ? {} : { scale: 0.98 } }
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
        >
            { icon ? (
                <span className="leading-none">{ icon }</span>
            ) : (
                <span className="material-icons leading-none">{ iconName }</span>
            )}
        </motion.button>
    )
})