// import React, { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// export default function Button({
//   children,
//   href = null,
//   onClick,
//   copyValue = null,
//   type = "button",
//   className = "",
//   leftIcon = null,
//   rightIcon = null,
//   rightIconHover = null,
//   leftIconHover = null,
//   iconSize = "md-18",
//   ...rest
// }) {
//   const [hovered, setHovered] = useState(false)
//   const [copied, setCopied] = useState(false)

//   const Tag = href ? motion.a : motion.button

//   const handleAction = async (e) => {
//     if (copyValue) {
//       try {
//         await navigator.clipboard.writeText(copyValue)
//         setCopied(true)
//         window.setTimeout(() => setCopied(false), 2000)
//       } catch {
//         // no-op
//       }
//     }

//     if (onClick) onClick(e)
//   }

//   const renderMaterialIcon = (iconName) => (
//     <span className={`material-icons material-symbols-outlined ${iconSize}`}>
//       {iconName}
//     </span>
//   )

//   const currentRight = copied
//     ? "check"
//     : hovered && rightIconHover
//       ? rightIconHover
//       : rightIcon

//   const currentLeft = hovered && leftIconHover ? leftIconHover : leftIcon

//   const baseClassName = `
//     inline-flex items-center justify-center gap-2 rounded-full
//     border px-4 py-2.5 font-light backdrop-blur-md
//     transition-all duration-300 ease-out
//     focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-mellow/60
//     text-[var(--text)] border-[var(--border)]
//     bg-[color:color-mix(in_srgb,var(--surface)_78%,transparent)]
//     hover:border-[var(--border-strong)]
//     hover:bg-[color:color-mix(in_srgb,var(--surface)_88%,transparent)]
//     shadow-[0_1px_2px_rgba(0,0,0,0.04)]
//   `

//   const copiedClassName = copied
//     ? `
//       border-emerald-500/50
//       text-emerald-600 dark:text-emerald-400
//       bg-[color:color-mix(in_srgb,white_85%,transparent)]
//       dark:bg-[color:color-mix(in_srgb,#1f2937_70%,transparent)]
//     `
//     : ""

//   const tagProps = {
//     className: `${baseClassName} ${copiedClassName} ${className}`,
//     onMouseEnter: () => setHovered(true),
//     onMouseLeave: () => setHovered(false),
//     onFocus: () => setHovered(true),
//     onBlur: () => setHovered(false),
//     ...(href
//       ? { href, target: rest.target, rel: rest.rel }
//       : { type }),
//     ...rest,
//     onClick: handleAction,
//   }

//   return (
//     <Tag {...tagProps}>
//       {(leftIcon || leftIconHover) && (
//         <span className="relative inline-flex items-center justify-center">
//           <AnimatePresence mode="wait" initial={false}>
//             <motion.span
//               key={currentLeft}
//               initial={{ opacity: 0, x: 3 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -3 }}
//               transition={{ duration: 0.2, ease: "easeInOut" }}
//               className="inline-flex"
//             >
//               {renderMaterialIcon(currentLeft)}
//             </motion.span>
//           </AnimatePresence>
//         </span>
//       )}

//       <span>{children}</span>

//       {(rightIcon || rightIconHover || copied) && (
//         <span className="relative inline-flex items-center justify-center">
//           <AnimatePresence mode="wait" initial={false}>
//             <motion.span
//               key={currentRight}
//               initial={{ opacity: 0.2, x: 2 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0.2, x: -2 }}
//               transition={{ duration: 0.15, ease: "easeInOut", delay: 0.1 }}
//               className="inline-flex"
//             >
//               {renderMaterialIcon(currentRight)}
//             </motion.span>
//           </AnimatePresence>
//         </span>
//       )}
//     </Tag>
//   )
// }

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Button({
  children,
  href = null,
  onClick,
  copyValue = null,
  type = "button",
  className = "",
  leftIcon = null,
  rightIcon = null,
  rightIconHover = null,
  leftIconHover = null,
  iconSize = "md-18",
  ...rest
}) {
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const Tag = href ? motion.a : motion.button

  const handleAction = async (e) => {
    if (copyValue) {
      try {
        await navigator.clipboard.writeText(copyValue)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      } catch {
        // no-op
      }
    }

    if (onClick) onClick(e)
  }

  const renderMaterialIcon = (iconName) => (
    <span className={`material-icons material-symbols-outlined ${iconSize}`}>
      {iconName}
    </span>
  )

  const currentRight = copied
    ? "check"
    : hovered && rightIconHover
      ? rightIconHover
      : rightIcon

  const currentLeft = hovered && leftIconHover ? leftIconHover : leftIcon

  const baseClassName = `
    inline-flex items-center justify-center gap-2 rounded-full
    border px-4 py-2.5 font-light backdrop-blur-md
    transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-mellow/60
    bg-gradient-to-br from-gray-500/10 to-amber-300/10 
    hover:bg-gradient-to-l
    text-[var(--text)] border-[var(--glass-border)]
    shadow-[0_1px_2px_rgba(0,0,0,0.04)]

    bg-[linear-gradient(135deg,
      color-mix(in_srgb,var(--surface)_72%,white_14%)_0%,
      color-mix(in_srgb,var(--surface)_82%,var(--accent)_8%)_55%,
      color-mix(in_srgb,var(--surface)_74%,var(--accent)_14%)_100%
    )]

    hover:border-[color:color-mix(in_srgb,var(--border-strong)_72%,var(--accent)_28%)]
    hover:bg-[linear-gradient(135deg,
      color-mix(in_srgb,var(--surface)_68%,white_18%)_0%,
      color-mix(in_srgb,var(--surface)_78%,var(--accent)_12%)_55%,
      color-mix(in_srgb,var(--surface)_68%,var(--accent)_20%)_100%
    )]

    supports-[backdrop-filter]:bg-[linear-gradient(135deg,
      color-mix(in_srgb,var(--surface)_58%,transparent)_0%,
      color-mix(in_srgb,var(--surface)_70%,var(--accent)_10%)_55%,
      color-mix(in_srgb,var(--surface)_60%,var(--accent)_16%)_100%
    )]
  `

  const copiedClassName = copied
    ? `
      border-emerald-500/50
      text-emerald-600 dark:text-emerald-400
      bg-[color:color-mix(in_srgb,white_85%,transparent)]
      dark:bg-[color:color-mix(in_srgb,#1f2937_70%,transparent)]
    `
    : ""

  const tagProps = {
    className: `${baseClassName} ${copiedClassName} ${className}`,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
    ...(href
      ? { href, target: rest.target, rel: rest.rel }
      : { type }),
    ...rest,
    onClick: handleAction,
  }

  return (
    <Tag {...tagProps}>
      {(leftIcon || leftIconHover) && (
        <span className="relative inline-flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentLeft}
              initial={{ opacity: 0, x: 3 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -3 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="inline-flex"
            >
              {renderMaterialIcon(currentLeft)}
            </motion.span>
          </AnimatePresence>
        </span>
      )}

      <span>{children}</span>

      {(rightIcon || rightIconHover || copied) && (
        <span className="relative inline-flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentRight}
              initial={{ opacity: 0.2, x: 2 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.2, x: -2 }}
              transition={{ duration: 0.15, ease: "easeInOut", delay: 0.1 }}
              className="inline-flex"
            >
              {renderMaterialIcon(currentRight)}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </Tag>
  )
}