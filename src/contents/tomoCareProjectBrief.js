export const tomoCareBriefContent = {
    title: "TomoCare: System Design for a Governed AI Sidekick",
    description: "How TomoCare turns scattered documents into trusted, actionable records without cutting the human out of the loop.",
    backgroundImage: "/assets/tomocare-img.jpg",
    heroImage: "/assets/tomoCare-system-diagram.png",

    phaseNav: [
        { title: "Phase 0: Working Brain", stats: "Shipped", pageUrl: "/tomo-care/phase-0" },
        { title: "Phase 1: Verification UI", stats: "Shipped", pageUrl: "/tomo-care/phase-1" },
        { title: "Phase 2: TomoCare as a Product", stats: "Planned", pageUrl: "", disabled: true, },
        { title: "Phase 3: Grounded Assistant", stats: "Planned", pageUrl: "", disabled: true, },
    ],

    governanceModel: {
        title: "Governance model",
        tiers: [
            {
                name: "Source truth",
                description: "Immutable original documents + metadata (PDFs in private storage).",
            },
            {
                name: "Candidate truth",
                description: "AI-extracted structured JSON (probabilistic), stored for inspection and debugging.",
            },
            {
                name: "Trusted truth",
                description: "Materialized database rows used for deterministic logic and automation; promoted via verification.",
            },
        ],
        guardrails: [
            "Every materialized record links back to a source doc (provenance).",
            "Candidate truth cannot trigger external actions without verification.",
            "Any external tool action (messaging, booking) requires explicit approval.",
        ],
    },

    objectives: {
        title: "Product objectives",
        primary: [
            "Persistent memory in the database (truth is stored, not in chat history)",
            "Grounded reasoning over real records with provenance",
            "Explicit human-in-the-loop checkpoints for promotion to trusted truth",
            "Clear boundaries between assistance and autonomy",
            "End-to-end tool use with audit trails",
        ],
        secondary: [
            "A hands-on platform for learning MCP + multi-agent orchestration",
            "A transferable pattern for enterprise service domains (high-stakes workflows)",
        ],
    },

    not: {
        title: "What TomoCare is not",
        items: [
            "Not a diagnostic tool or a veterinary replacement",
            "Not an autonomous black-box agent",
            "Not a polished consumer app (correctness + governance first)",
        ],
    },

    phases: [
        {
            title: "Phase 0: Working Brain",
            status: "Shipped",
            goal: "Trustworthy memory and grounded extraction.",
            scope: [
                "Upload and store documents with provenance",
                "Extract candidate facts (events/costs/labs) into JSONB",
                "Persist raw_text as an auditable intermediate",
                "Materialize appropriate facts into normalized tables (e.g., events)",
                "Grounded Q&A over stored records with citations",
                "Deterministic scheduling for Librela (+7 weeks; remind -1 week)",
                "Closed-loop calendar sync with external refs persisted for idempotency",
            ],
            hitl: [
                "Define verification checkpoint before candidate truth becomes trusted truth",
                "Receipts may be auto-approved (low risk); labs/clinical notes require review",
            ],
            successMetrics: [
                "Repeatable extraction across sessions (DB truth, not chat history)",
                "Materialized events always trace back to source documents",
                "Idempotent calendar updates (no duplicates) via persisted external refs",
            ],
            pageUrl: "/tomo-care/phase-0",
        },

        {
            title: "Phase 1: Verification UI",
            status: "Shipped",
            goal: "Make trust legible: a user-facing review workflow to promote candidate truth into trusted truth.",
            scope: [
                "Document upload + ingestion status (queued/processed/needs review)",
                "Review queue grouped by document (new extractions awaiting verification)",
                "Side-by-side view: source PDF ↔ extracted candidates (raw_text / fields)",
                "Highlight low-confidence or missing fields for fast correction",
                "Approve / edit / reject actions that write verification state",
                "Materialize-on-approve: only verified candidates become automation-ready rows",
                "Capture corrections as structured feedback (for prompt + normalization refinement)",
            ],
            uiComponents: [
                "Review Inbox (documents awaiting verification)",
                "Split View (PDF viewer + extracted fields panel)",
                "Field-level edit controls + ‘mark as correct’ affordance",
                "Provenance breadcrumbs (doc_id, extracted timestamp, model version)",
                "Action bar: Approve → Materialize, Edit, Reject (needs review)",
            ],
            hitl: [
                "Verification state recorded per document and/or per extracted item",
                "Explicit confirmation before automation is enabled for a given record set",
            ],
            successMetrics: [
                "Time-to-verify per document decreases over iterations",
                "Field-level extraction accuracy improves based on captured corrections",
                "Clear audit trail: who verified what, when, and from which source doc",
            ],
            pageUrl: "/tomo-care/phase-1",
        },

        {
            title: "Phase 2: TomoCare as a Product",
            status: "Planned",
            goal: "Turn the working brain into a destination — a dashboard that ingests on its own, surfaces what's coming up, and takes one real action with explicit approval.",
            scope: [
                "Dashboard / homepage: TomoCare becomes a place you visit, not just a verification queue",
                "Direct upload from the dashboard (no separate workbench step)",
                "Email ingestion via a dedicated Gmail account (highest-leverage feature — receipts and lab reports flow in without manual upload)",
                "Calendar reminder section surfaced in-product (what's coming up and why, sourced from trusted events)",
                "One agentic action demo: appointment booking via Twilio with HITL approval (draft SMS → user approves → send → parse response → create calendar event)",
                "Live + mock mode for demos: real Twilio when needed, deterministic mock mode for hiring-manager walkthroughs",
                "Audit trail of proposed actions, approvals, and tool outputs (no surprise actions, no duplicate sends)",
            ],
            hitl: [
                "Approval checkpoint for any external action beyond calendar entry (SMS, booking confirmations, replies)",
                "Orchestrator emits a proposed_action object: preview + rationale + required confirmation before any tool call",
                "Tool outputs persisted back to the DB so subsequent runs update rather than duplicate",
            ],
            successMetrics: [
                "Time from receipt arrival → calendar reminder drops to near-zero (email-driven)",
                "Zero unapproved external actions across the demo set",
                "One end-to-end agentic flow (booking) demonstrably reliable in both live and mock mode",
                "Reliable tool-state persistence: updates vs duplicates verified across repeated runs",
            ],
            pageUrl: "",
        },

        {
            title: "Phase 3: Grounded Assistant",
            status: "Planned",
            goal: "A bounded conversational layer that answers questions grounded in trusted truth — the deferred reward of getting the foundation right.",
            scope: [
                "Read-only Q&A first: 'when is Momo's next appointment?', 'what was her last weight?', 'how much have I spent on Librela this year?'",
                "Answers cite the source documents and trusted rows they're grounded in",
                "Longitudinal awareness folded in as a capability, not a separate phase (e.g., 'her BUN has been trending up over the last three labs')",
                "Bounded scope: the assistant answers questions, it doesn't take actions without going through the Phase 2 approval gate",
                "Refusal behavior when the question can't be grounded (no hallucinated facts, no diagnostic claims)",
            ],
            hitl: [
                "Action requests routed back through the Phase 2 proposed_action + approval gate, not handled in-chat",
                "User feedback on answer quality stored as preferences (not retraining) — controls future surfacing behavior",
                "Trend flags framed as 'worth discussing with your vet' — never as diagnosis",
            ],
            successMetrics: [
                "Every assistant answer traces back to a source document or trusted row",
                "Zero out-of-scope actions taken from chat (all routed to approval gate)",
                "Useful longitudinal answers on real data (weight trends, lab directionality, spend over time)",
            ],
            pageUrl: "",
        },
    ],

    futureRoadmap: {
        title: "Future roadmap",
        intro: "Items deliberately scoped out of the build plan — kept visible because scope discipline is part of the system design.",
        items: [
            {
                name: "Insurance claim drafting",
                note: "Sounds impressive but isn't differentiating, and the per-insurer complexity is high. Worth doing later, not before the foundation earns it.",
            },
            {
                name: "Multi-pet support",
                note: "Schema is ready for it; UI and verification flows aren't. Defer until single-pet is genuinely useful.",
            },
            {
                name: "Broader vet system integrations",
                note: "Direct integrations with vet practice management systems. High value, high vendor cost — out of scope for a solo build.",
            },
            {
                name: "Productized version for other pet owners",
                note: "TomoCare is currently local-only and single-user by design. A productized version would require auth, multi-tenant data isolation, and a real onboarding story.",
            },
        ],
    },

    metrics: {
        title: "How I'll measure impact (even as a single user)",
        note: "Metrics are designed to be lightweight and auditable. The goal is to demonstrate usefulness and reliability, not vanity numbers.",
        measures: [
            {
                name: "Extraction accuracy (field-level)",
                how: "For each receipt/lab, compare extracted fields vs verified fields (Phase 1 edits). Track % correct at first pass and after correction.",
                example: "Target: ≥95% correct for receipts; track error hotspots (dates, line items, provider).",
            },
            {
                name: "Verification effort (time-to-verify)",
                how: "Measure time spent reviewing a document from upload → verified → materialized.",
                example: "Baseline: manual review + calendar entry; Goal: reduce verification + scheduling to <2 minutes per receipt.",
            },
            {
                name: "Time-to-act (task completion latency)",
                how: "Time from receiving a doc to having the next due/reminder scheduled (or message drafted).",
                example: "Goal: same-day scheduling with 1-click approval vs ‘remember later’.",
            },
            {
                name: "Idempotency / duplicate prevention",
                how: "Count duplicate calendar events created for the same reminder across repeated runs.",
                example: "Goal: 0 duplicates; prove via stored external refs + update behavior.",
            },
            {
                name: "Reliability (run success rate)",
                how: "Track pipeline runs: ingestion → extraction → materialization → tool call. Log failures + reasons (OAuth, parsing, truncation).",
                example: "Goal: ≥99% successful Phase 0 runs on known receipt formats; visibly reducing failure modes over time.",
            },
            {
                name: "Cognitive load reduction (self-reported, structured)",
                how: "A tiny monthly check-in rating: confidence in ‘what’s due and why’ (1–5) + perceived effort (1–5).",
                example: "Goal: increase confidence and reduce effort without adding notification fatigue.",
            },
        ],
    },
}