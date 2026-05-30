export function SectionMarker() {
    return <div className="w-10 h-[3px] bg-yellow-mellow mb-6" />
}

export function CaseStudySection({
    title,
    children,
    className = "",
    narrow = true,
    id,
}) {
    return (
        <section id={id} className={`border-b border-white/10 ${className}`}>
            <div
                className={`mx-auto px-6 md:px-8 py-14 md:py-20 ${
                  narrow ? "max-w-[760px]" : "max-w-[1120px]"
                }`}
            >
                <SectionMarker />
                {title ? (
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8">
                    {title}
                  </h2>
                ) : null}
                <div className="space-y-6">{children}</div>
            </div>
        </section>
    )
}

export function CaseStudyBody({ children, className = "" }) {
    return (
        <p className={`text-[1.0625rem] md:text-[1.15rem] leading-8 text-zinc-300 ${className}`}>
            {children}
        </p>
    )
}

export function CaseStudyEyebrow({ children, className = "" }) {
    return (
        <p className={`text-[0.78rem] uppercase tracking-[0.18em] text-zinc-400 mb-3 ${className}`}>
            {children}
        </p>
    )
}

export function CaseStudyList({ items, className = "" }) {
    return (
        <ul className={`space-y-3 pl-5 marker:text-yellow-mellow list-disc ${className}`}>
            {items.map((item, index) => (
                <li
                    key={index}
                    className="text-[1.0625rem] md:text-[1.15rem] leading-8 text-zinc-300 pl-1"
                >
                    {item}
                </li>
            ))}
        </ul>
    )
}

export function CaseStudyCard({ children, className = "" }) {
    return (
        <div className={`rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 ${className}`}>
            {children}
        </div>
    )
}

export function CaseStudyCallout({ children, className = "" }) {
    return (
        <blockquote
            className={`mt-10 border-l-2 border-yellow-mellow bg-white/5 px-6 md:px-8 py-6 md:py-8 ${className}`}
        >
            <p className="text-[1.125rem] md:text-[1.25rem] leading-9 italic text-yellow-mellow-light">
                {children}
            </p>
        </blockquote>
    )
}

export function CaseStudyMediaFrame({ children, className = "" }) {
    return (
        <div className={`overflow-hidden rounded-3xl border border-white/15 bg-black/30 shadow-2xl ${className}`}>
            {children}
        </div>
    )
}

export function CaseStudyMetaList({ items }) {
    return (
        <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {items.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-start gap-2 py-4">
                    <div className="md:w-[220px] shrink-0 text-zinc-400 font-medium">
                        {item.title}
                    </div>
                    <div className="text-zinc-200 leading-7">{item.content}</div>
                </div>
            ))}
        </div>
    )
}

export function CaseStudyGrid({ children, className = "" }) {
    return <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 ${className}`}>{children}</div>
}