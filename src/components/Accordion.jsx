import { useState, useRef, useEffect } from 'react'
import TextButton from './TextButton.jsx'
import { FancyLink } from './FancyLink.jsx'

const base = "p-4 border-b border-warm-gray-medium"

export default function Accordion({ 
    title,                      // String - Required 
    meta = null,                // String - Optional
    metaIcon = "bar_chart",     // Material icon anme (default "bar_chart")
    githubUrl = null,           // String - Optional - FancyLink
    children, 
    defaultOpen = false,        // Boolean - Optional
    buttonProps = null,         // Object - Optional - TextButton
    className = ""              // Extra Tailwind classes
}) {

    const [ open, setOpen ] = useState(defaultOpen)
    const content = useRef(null)
    const [ maxHeight, setMaxHeight ] = useState("0px")

    // Measure description height whenever its content changes
    useEffect(() => {
        if(content.current) {
            setMaxHeight(open? `${content.current.scrollHeight}px` : "0px")
        }
    }, [ open, children ])

    const toggle = () => setOpen((prev) => !prev)

    return(
        <div className={`${base} ${className} relative group transition-colors duration-200`}>
        {/* Header – title + toggle icon */}
            <button
                onClick={toggle}
                className="w-full flex justify-between items-center py-1 focus:outline-none"
                aria-expanded={open}
            >
                <h3 className="font-medium text-lg ">{title}</h3>

                {/* Material “add” icon rotates to form an “×” when open */}
                <span className={`material-icons text-yellow-mellow p-2 transform transition-transform duration-300 ease-in-out group-hover:cursor-pointer group-hover:text-yellow-mellow-light group-hover:scale-120 ${
                    open ? "rotate-45" : "rotate-0"}`}>
                    add
                </span>
            </button>

            {/* Always‑visible meta line */}
            { meta && (
                <p className="text-yellow-mellow-light py-2 flex items-center">
                    <span className="material-icons">{ metaIcon }t</span>
                    { meta }
                </p>
            )}

            {/* Optional GitHub link using FancyLink */}
            { githubUrl && (
                <FancyLink
                    href={ githubUrl }
                    id="primary-link-text"
                    secondary
                    className="inline-flex items-center gap-2 text-yellow-mellow hover:text-white py-2 transiaiotn-colors mb-2"
                >
                    <span className="material-icons md-18">
                        code
                    </span>
                    GitHub
                </FancyLink>
            )}

        {/* Expandable area */}
            <div
                ref={content}
                style={{ maxHeight }}
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
            >
                {/* Fade‑in description */}
                <div className={`transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-gray-400 leading-relaxed">{children}</p>
                </div>
                {/* optional button */}
                { buttonProps && (
                    <TextButton
                        {...buttonProps}
                        className={`font-medium px-6 py-3 mt-4 ${buttonProps.className ?? ""}`}
                        rightIcon="east"
                        iconSize="md-18"
                    >
                        { buttonProps.label }
                    </TextButton>
                )}
            </div>
        </div>

    )
}