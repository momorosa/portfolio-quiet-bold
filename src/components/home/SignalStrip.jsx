export default function SignalStrip() {
    const domains = [
        "LLM Integration",
        "Agentic Workflows",
        "MCP Patterns",
        "Human-in-the-Loop",
        "AI Governance",
        "Interactive 3D",
    ]

    const stack = [
        "React",
        "Python",
        "Supabase",
        "Three.js / R3F",
        "GLSL",
        "Google ADK",
        "Claude API",
        "OpenAI API",
        "Vercel",
    ]

    const separator = (
        <span
            aria-hidden="true"
            className="text-[var(--border)]"
        >
            ·
        </span>
    )

    const Row = ({ items }) => (
        <p className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            {items.map((item, i) => (
                <span key={item} className="inline-flex items-center gap-3">
                    {i > 0 && separator}
                    <span>{item}</span>
                </span>
            ))}
        </p>
    )

    return (
        <div
            className="
                bg-[var(--bg)] px-6 py-6
                text-primary text-sm tracking-wide text-[var(--text-soft)]
                md:px-10 md:py-8
                lg:px-14
            "
            aria-label="Skills and technologies"
        >
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3">
                <Row items={domains} />
                <Row items={stack} />
            </div>
        </div>
    )
}