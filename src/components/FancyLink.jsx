import { forwardRef } from 'react'
import { Link as RouterLink, useInRouterContext } from 'react-router-dom'
import clsx from 'clsx'

const ASSET_EXT = ['txt', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'pdf']

const getExt =(href = '') => {
    try {
        const withoutQueryHasbh = href.split('?')[0].split('#')[0]
        const ex = withoutQueryHasbh.split('.').pop()
        return (ex || '').toLowerCase() 
    } catch {
        return ''
    }
}

/**
 * props:
 * - href   → "/work/ford"  | "https://..." | "#section"
 * - secondary (boolean)    → darker text color
 * - className              → extra Tailwind / CSS classes
 * * - ...rest     → any <a> / <RouterLink> props (title, aria-label, etc.)
 */

const PROTOCOL_RE = /^[a-zA-Z][a-zA-Z+.-]*:/

const isRawHref = (href = '') => 
    PROTOCOL_RE.test(href) || // has protocol (http:, mailto:, tel:, etc.)
    href.startsWith('#') ||   // in-page anchor
    ASSET_EXT.includes(getExt(href)) // asset link (pdf, image, txt, etc.)  

export const FancyLink = forwardRef( function FancyLink (
    { href = '', secondary = false, className, children, ...rest }, ref
){
        const inRouter = useInRouterContext()
        const isExternalHttp = /^https?:\/\//i.test(href)
        const relValue = isExternalHttp ? 'noreferrer noopener' : undefined
        const target = isExternalHttp ? '_blank' : undefined
        const classes = clsx(
            'fancy-link',
            secondary && 'fancy-link--secondary',
            className
        )
        if (!href) {
            console.warn('FancyLink: missing href')
            return <span className={classes}>{ children }</span>
        }



        // raw anchor for external, in-page, or assets
        if (isRawHref(href) || !inRouter) {
            return(
                <a
                    href={ href }
                    ref={ ref }
                    rel={ relValue }
                    target={ target }
                    className={ classes }
                    {...rest}
                >
                    { children }
                </a>
            )
        }

        // internal React-Router link
        return(
            <RouterLink ref={ ref } to={ href } className={ classes } {...rest}>
                { children }
            </RouterLink>
        )
    }
)
