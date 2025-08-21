import { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'

const ASSET_EXT = ['txt', 'png', 'jpg', 'pdf']

const isRawHref = (href = '') =>
  href.startsWith('http') ||
  href.startsWith('#') ||
  ASSET_EXT.includes(href.split('.').pop())


/**
 * props:
 * - href   → "/work/ford"  | "https://..." | "#section"
 * - secondary (boolean)    → darker text color
 * - className              → extra Tailwind / CSS classes
 */

export const FancyLink = forwardRef(
    ({ href, secondary = false, className, children, ...rest }, ref) => {
        const isExternal = href.startsWith('http')
        const relValue = isExternal ? 'noreferrer noopener' : undefined
        const target = isExternal ? '_blank' : undefined

        const classes = clsx(
            'fancy-link',
            secondary && 'fancy-link--secondary',
            className
        )

        // raw anchor for external, in-page, or assets
        if (isRawHref(href)) {
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
