import React from 'react'

export default function TextButton({
  children,
  href = null,       // if present, renders <a>
  onClick,
  type = 'button',   // button type when there’s no href
  className = '',
  leftIcon = null,
  rightIcon = null,
  iconSize = 'md-18',
  ...rest
}) {
    const Tag = href ? 'a' : 'button'

    const tagProps = {
      className: `inline-flex items-center justify-center gap-2 text-yellow-mellow hover:bg-warm-gray-dark hover:scale-105 transition-all duration-300 ease-in-out delay-150 ${className}`,
      onClick,
      ...(href
        ? { href, target: rest.target, rel: rest.rel }
        : { type }),
      ...rest,
    }

    const renderMaterialIcon = (iconName) => (
      <span className={`material-icons ${iconSize}`}>{iconName}</ span>
    )

    return (
      <Tag {...tagProps}>
        {leftIcon && renderMaterialIcon(leftIcon)}
        {children}
        {rightIcon && renderMaterialIcon(rightIcon)}
      </Tag>
    )
}
