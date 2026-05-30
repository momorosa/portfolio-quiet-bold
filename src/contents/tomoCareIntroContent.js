export const tomoCareIntroContent = {
    headline: "Featured project",
    title: "Governed multi-agent AI for proactive pet care | TomoCare",
    descriptionA:
        "An AI sidekick I'm building for my dog Momo's health care. It turns scattered vet PDFs into a reliable timeline, grounded reminders, and approval-gated actions.",
    descriptionB:"Under the hood: a governed agentic system with provenance tracking, human-in-the-loop verification, and MCP multi-agent patterns designed to transfer to other high-stakes domains.",
    phases: [
        {
            title: "Project Brief",
            metaIcon: "strategy",
            keyOutcomesTitle: "Blueprint:",
            keyOutcomes: "Source → trusted truth + approval gates",
            description:
                "A concise spec for a governed agentic system: what TomoCare is and isn't, how candidate facts become trusted truth, and where human approval is required.",
            buttonProps: { label: "Read brief", href: "/tomo-care" },
            mediaType: "image",
            mediaSrc: "../../src/assets/tomoCare-system-diagram.png",
            mediaAlt: "TomoCare project brief overview",
        },
        {
            title: "Phase 0: Working Brain",
            metaIcon: "rocket_launch",
            keyOutcomesTitle: "Shipped:",
            keyOutcomes:
                "Verified timeline → deterministic reminders → real calendar sync",
            description:
                "Built the provenance-first pipeline: private document storage, auditable raw text, JSONB extraction, and a trusted events table. Added deterministic Librela scheduling and closed-loop Google Calendar upsert with persisted external refs.",
            buttonProps: { label: "Read case study", href: "/tomo-care/phase-0" },
            mediaType: "image",
            mediaSrc: "../../src/assets/tomocare-img.jpg",
            mediaPoster: "../../src/assets/tomocare-img.jpg",
            mediaAlt: "TomoCare Phase 0 working system preview",
        },
        {
            title: "Phase 1: Verification UI",
            metaIcon: "rocket_launch",
            keyOutcomesTitle: "Shipped:",
            keyOutcomes:
                "Human verification UI (compare → correct → promote)",
            description:
                "Introduces the user-facing trust surface. Upload a document, inspect extracted candidates alongside the source, and explicitly approve or edit before anything becomes automation-ready. This is the bridge from scripts to a real governed product experience.",
            buttonProps: { label: "Read case study", href: "/tomo-care/phase-1" },
            mediaAlt: "TomoCare Phase 1 verification UI preview",
        },
        {
            title: "Phase 2: TomoCare as a Product",
            metaIcon: "code_blocks",
            keyOutcomesTitle: "In-Progress:",
            keyOutcomes:
                "Dashboard + email ingestion + one approval-gated agentic action (Twilio booking with HITL)",
            description:
                "Turns the working brain into a destination. The dashboard becomes a place you visit — receipts arrive on their own through a dedicated Gmail inbox, what's coming up is surfaced from trusted events, and one real external action runs end-to-end with explicit approval: draft the SMS, I approve, it sends, parses the reply, and writes the appointment back to the calendar. Built with a live + mock mode so the agentic flow is demo-able without real-world side effects.",
            buttonProps: { label: "Coming soon", href: "" },
            isComingSoon: true,      
        },
        {
            title: "Phase 3: Grounded Assistant",
            metaIcon: "calendar_clock",
            keyOutcomesTitle: "Planned:",
            keyOutcomes:
                "Read-only chatbot grounded in trusted truth, with longitudinal awareness folded in",
            description:
                "The conversational layer arrives last, deliberately. Most AI products start with a chatbot; I started with the foundation underneath so the assistant has something durable to read from. Phase 3 answers questions grounded in trusted rows only — when's Momo's next appointment, what's her weight trending toward, how much have I spent on Librela this year — and cites the source documents behind each answer. Trend signals are framed as 'worth discussing with your vet,' never as diagnosis. Action requests get routed back through the Phase 2 approval gate, not handled in chat.",
            buttonProps: { label: "Coming soon", href: "" },
            isComingSoon: true,
        },

    ],
}