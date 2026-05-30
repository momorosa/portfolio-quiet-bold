import { forwardRef } from "react"
import { Link as RouterLink, useInRouterContext } from "react-router-dom"
import clsx from "clsx"

const ASSET_EXT = ["txt", "png", "jpg", "jpeg", "webp", "svg", "gif", "pdf"]
const PROTOCOL_RE = /^[a-zA-Z][a-zA-Z+.-]*:/

const getExt = (href = "") => {
    try {
        const withoutQueryHash = href.split("?")[0].split("#")[0]
        const ex = withoutQueryHash.split(".").pop()
        return (ex || "").toLowerCase()
    } catch {
        return ""
    }
}

const isRawHref = (href = "") =>
    PROTOCOL_RE.test(href) ||
    href.startsWith("#") ||
    ASSET_EXT.includes(getExt(href))

export const FancyLink = forwardRef(function FancyLink(
    { href = "", secondary = false, newTab, className, children, ...rest },
    ref
) {
    const inRouter = useInRouterContext()
    const isExternalHttp = /^https?:\/\//i.test(href)

    const classes = clsx("fancy-link", secondary && "fancy-link--secondary", className)

    if (!href) {
        console.warn("FancyLink: missing href")
        return <span className={classes}>{children}</span>
    }

    const shouldNewTab = typeof newTab === "boolean" ? newTab : isExternalHttp
    const relValue = shouldNewTab ? "noreferrer noopener" : undefined
    const target = shouldNewTab ? "_blank" : undefined

    if (isRawHref(href) || !inRouter) {
        return (
            <a
                href={href}
                ref={ref}
                rel={relValue}
                target={target}
                className={classes}
                {...rest}
            >
                {children}
            </a>
        )
    }

    return (
     <RouterLink ref={ref} to={href} className={classes} {...rest}>
        {children}
        </RouterLink>
    )
})