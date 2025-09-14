import React from 'react'
import { FancyLink } from '../components/FancyLink.jsx'

// Escape regex special chars
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function linkify(text = '', links = {}) {
    if (!text || typeof text !== 'string') return text

    const keys = Object.keys(links)
    if (!keys.length) return text

    // Longest-first so multi-word tokens win
    const tokens = keys.sort((a, b) => b.length - a.length).map(escapeRegExp)

    // Build a lowercase lookup once (avoid O(n) scan per part)
    const lowerToKey = new Map(keys.map((k) => [k.toLowerCase(), k]))

    // Unicode-aware "word" class: letters/numbers/underscore
    // We emulate \b with negative lookbehind / lookahead that
    // checks for non-word chars on both sides.
    let re

    try {
        const boundary = `(?<![\\p{L}\\p{N}_])(${tokens.join('|')})(?![\\p{L}\\p{N}_])`
        re = new RegExp(boundary, 'giu') // 'u' enables \p{..}
    } catch {
        // Fallback: no lookbehind (older engines). Slightly looser but robust.
        re = new RegExp(`(${tokens.join('|')})`, 'gi')
    }

    const parts = text.split(re)

    return parts.map((part, i) => {
        const key = lowerToKey.get(String(part).toLowerCase())
        if (key) {
            return (
                <FancyLink key={i} href={links[key]} secondary className="primary-link-text">
                    {part}
                </FancyLink>
            )
        }
        return <span key={i}>{part}</span>
    })
}
