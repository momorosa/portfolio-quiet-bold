export const tomoCarePhase1Content = {
    title: "TomoCare Phase 1: Verification UI",
    description:
        "Phase 1 makes trust visible. After building the working brain underneath TomoCare, I designed and built a review interface where candidate truth can be compared against the source, corrected by a human, and promoted into trusted, materialized records only after approval.",
    backgroundImage: "../../src/assets/rainydaywithmypup.jpg",

    phaseNav: [
        {
            title: "Project Brief",
            pageUrl: "/tomo-care",
            status: "Overview",
        },
        {
            title: "Phase 0: Working Brain",
            pageUrl: "/tomo-care/phase-0",
            status: "Shipped",
        },
        {
            title: "Phase 1: Verification UI",
            pageUrl: "/tomo-care/phase-1",
            status: "You are here",
            current: true,
        },
        {
            title: "Phase 2: TomoCare as a Product",
            pageUrl: "",
            status: "Planned",
            disabled: true,
        },
        {
            title: "Phase 3: Grounded Assistant",
            pageUrl: "",
            status: "Planned",
            disabled: true,
        },
    ],

    intro: {
        eyebrow: "Phase 1 · Verification UI",
        body: [
            "Phase 0 gave TomoCare a working brain: private documents, raw text, structured extraction, materialized events, and deterministic reminder logic. But it still needed a trust surface. Candidate truth is useful, but it should not quietly become system truth just because a model produced it.",
            "So Phase 1 focuses on the moment that matters most: the handoff between AI extraction and trusted operational data. An AI reviewer does a first pass over its own extraction and flags what needs a human — high-stakes fields, low-confidence values, anything it could not read cleanly. The human reviews the source, confirms or corrects what was surfaced, and explicitly promotes the record into verified truth.",
        ],
        callout:
            "This phase is where TomoCare stops being a hidden pipeline and becomes a governed product. The interface is not just for viewing data. It is the checkpoint that decides what the system is allowed to trust.",
    },

    outcome: {
        title: "What shipped",
        summary:
            "A complete verification workflow where an AI reviewer triages its own extraction and a human confirms, corrects, and promotes only what truly needs judgment.",
        highlights: [
            "Three-panel review flow: queue, source document, and working panel",
            "AI reviewer scores each extracted field and flags high-stakes, low-confidence, or unreadable items with a written reason",
            "Confident fields auto-confirm; flagged fields are surfaced first so review effort scales with risk, not document size",
            "Document detail fetched on demand so the review queue stays lightweight and responsive",
            "Tabbed working panel for key fields, raw text, and extracted JSON",
            "Edit mode for correcting candidate truth before promotion",
            "Save draft and Save & verify actions wired into the approval flow",
            "Approve materializes verified rows into normalized tables, with the full triage result persisted on the document as a queryable audit record",
        ],
        imgUrl: "../../src/assets/verify-save.png",
        caption:
            "The verification UI in action: the review queue on the left, source PDF in the middle, and the working panel on the right. This is the trust surface where candidate truth becomes trusted truth only after review.",
    },

    problem: {
        title: "The problem",
        context:
            "Phase 0 could extract and materialize structured data, but without an explicit review step the system was still missing a durable answer to a critical question: what does TomoCare actually trust enough to use downstream?",
        items: [
            "AI extraction is useful, but it is still probabilistic and occasionally wrong",
            "Important differences between source truth and extracted truth were not yet visible in the product",
            "A purely back-end pipeline made it hard to inspect or correct candidate records before promotion",
            "Future automation like reminders and tool actions needed a stronger approval gate",
        ],
        hmw:
            "How might I turn candidate truth into something a human can inspect, correct, and explicitly approve before the system uses it as trusted truth?",
    },

    bet: {
        title: "The bet I made",
        body: [
            "I did not want TomoCare to become another AI product that feels impressive in a demo but becomes fragile the moment the data is slightly wrong. The real product problem was not extraction alone. It was governance. If a human could not easily compare the extraction to the original source, then every downstream reminder, timeline entry, or agent action would be built on shaky ground.",
            "So the bet behind Phase 1 was that trust should be designed as a visible workflow, not buried in back-end logic. The UI had to make provenance legible, surface the extracted candidate truth, and give the human a clean path to either correct it, save it as draft, or promote it into verified rows.",
            "This made the product slower in the short term and much stronger in the long term. A system that can be reviewed, corrected, and audited is the one that can eventually support automation with confidence.",
        ],
    },

    approach: {
        title: "What I built",
        architectureNarrative:
            "Phase 1 sits directly on top of the Phase 0 pipeline. The left panel loads a lightweight review queue from the documents table. Selecting a document fetches full detail and a signed PDF URL on demand. The middle panel keeps the source visible at all times. The right panel acts as the working surface for candidate truth, with tabbed access to key fields, raw text, and extracted JSON. From there, a reviewer can enter edit mode, correct extracted values, save a draft back to documents.text_extracted, or save and verify to promote the approved record into trusted materialized tables.",
        toolingNote:
            "This phase shifted the work from back-end trust infrastructure into product UX. I built the React verification interface and Express review endpoints together so the interaction model and data model stayed aligned.",
        steps: [
            {
                title: "Review queue built for action",
                imgOrientation: "landscape",
                description:
                    "I designed the left panel as an operational queue rather than a generic file list. Documents needing review surface first, while verified records can move into a secondary archive state. The queue fetches only lightweight metadata so the interface stays responsive as more records are added.",
                imgUrl: "../../src/assets/review-queue.png",
                caption:
                    "The review queue keeps active work visible and avoids loading heavy extracted payloads until a document is selected.",
            },
            {
                title: "Source-first review flow",
                imgOrientation: "landscape",
                description:
                    "The middle panel shows the original PDF through a signed Supabase URL so the source document stays visible during review. This was a deliberate design choice. I did not want editing to happen in isolation from evidence.",
                imgUrl: "../../src/assets/source-doc.png",
                caption:
                    "The source PDF stays visible while reviewing extracted output, reinforcing provenance at the moment of decision.",
            },
            {
                title: "Working panel as the trust surface",
                imgOrientation: "portrait",
                description:
                    "The right panel became the heart of the phase. I added tabs for key fields, raw text, and JSON so the reviewer can move between a distilled view and the underlying evidence. This keeps the UI useful for both quick confirmation and deeper debugging.",
                imgUrl: "../../src/assets/working-panel-rawText.png",
                caption:
                    "The working panel balances clarity and inspectability with tabbed access to key fields, raw text, and structured JSON.",
            },
            {
                title: "AI reviewer triages before the human",
                imgOrientation: "landscape",
                description:
                    "Before the working panel renders, an AI reviewer scores the existing extraction field by field and assigns each one a state: auto-confirmed when it is confident, needs-confirmation when the value is uncertain or the field is high-stakes, and unreadable-source when the document itself is unclear. Every flag carries a written reason. The reviewer scores the existing extraction — it does not re-extract. It surfaces and ranks; it never auto-approves.",
                imgUrl: "../../src/assets/triage.png",
                caption:
                    "The AI reviewer's per-field output: needs-confirmation items sorted to the top with the reasoning that escalated them. Here it caught a genuine multi-date ambiguity on the date fields and auto-confirmed the fields it was sure about.",
            },  
            {
                title: "Correction before promotion",
                imgOrientation: "landscape",
                description:
                    "I added an explicit edit mode so humans can correct candidate truth before it becomes trusted truth. For receipts and visits, this includes editable invoice IDs, events, descriptions, dates, and cost items. Draft changes can be saved without verification, which preserves work without prematurely promoting the record.",
                imgUrl: "../../src/assets/working-panel-correction.png",
                caption:
                    "Edit mode allows candidate truth to be corrected before it is promoted into trusted rows.",
            },
            {
                title: "Approve and materialize",
                imgOrientation: "landscape",
                description:
                    "When the reviewer chooses Save & verify or Approve, the document status moves to verified and the extracted record is materialized into normalized tables such as events and cost_items. The full AI triage result is persisted on the document — the model used, per-field state, and the reasoning behind every escalation — so the system can always explain exactly what the AI flagged, what the human confirmed, and why.",
                imgUrl: "../../src/assets/path1.png",
                caption:
                    "The verification loop closes in the database: the document is marked verified and the full triage result is persisted, so every promotion can be traced to what the AI flagged and what the human confirmed,"
            },
        ],
    },
    principles: {
        title: "Design principles",
        intro:
            "These are the decisions that shaped Phase 1. They made the UI less flashy and more dependable, which was exactly the point.",
        items: [
            {
                title: "Trust must be visible",
                body:
                    "The verification step is not a back-end state change disguised as UX. It is the product moment where a human compares source evidence against extracted output and decides what the system is allowed to trust.",
                imgUrl: "../../src/assets/comparison.png",
                caption:
                    "Keeping the source and the extraction visible side by side makes trust legible instead of implicit.",
            },
            {
                title: "The AI triages, the human decides",
                body:
                    "The reviewer scores and ranks; it never auto-approves. Every promotion to trusted truth is an explicit human action. This is the line that keeps the governance claim honest — Phase 1 speeds up human judgment, it does not replace it.",
            },
            {
                title: "Candidate truth should be editable before approval",
                body:
                    "A review flow that only allows approve or reject is too blunt. Real records are often close, not perfect. Edit mode lets the human correct the candidate truth directly and keep moving without breaking the workflow.",
            },
            {
                title: "Approval gates operational truth",
                body:
                    "Nothing downstream should quietly treat extracted JSON as verified fact. Promotion to trusted truth happens only through explicit approval, which then controls what gets materialized and what remains draft or pending review.",
            },
            {
                title: "Different document types need different review depth",
                body:
                    "Receipts and injection records work well with field-level editing. Lab reports are denser and need a summary-first review model. The right pattern is not one universal form. It is a document-aware trust surface that lets humans focus on what matters most.",
            },
        ],
    },

    reliability: {
        title: "Reliability work",
        body:
            "Phase 1 was not just UI assembly. I also tightened the system behavior underneath so the verification experience would remain stable as the number and complexity of documents grows.",
        items: [
            "Separated list and detail retrieval so the review queue does not load raw_text or extracted JSON for every row",
            "Fetched full document detail and signed PDF preview only when a document is selected",
            "Added validation for editable extracted fields before saving or verifying",
            "Cleared validation errors as users make corrections so the edit flow feels responsive",
            "Kept approval materialization idempotent by deleting and re-inserting verified rows for the current doc_id during the PoC",
            "Persisted the full AI triage result on the document so every verified record has a queryable audit trail of what was flagged and why",
        ],
    },

    learning: {
        title: "What I learned",
        items: [
            "Trust surfaces are product design, not just compliance plumbing. The most important work in this phase was deciding what a human actually needs to see and control before the system promotes a record.",
            "Side-by-side evidence changes the quality of review. Keeping the source PDF visible made it much easier to reason about extracted fields and catch mismatches quickly.",
            "Edit mode matters more than I expected. In practice, many records are almost right. Letting the user correct them in place is much better than forcing a binary approve-or-reject decision.",
            "Not every document should be reviewed the same way. The mismatch became especially obvious with lab reports, which pushed the design toward document-type-aware review instead of one generic key-fields layout.",
        ],
    },

    next: {
        title: "What comes next",
        items: [
            "Make the working panel document-type aware so receipts, visits, and lab reports each get the right review model",
            "Introduce summary-first verification for lab reports, with abnormal findings and clinically important fields surfaced first",
            "Refine the queue into active review and verified archive states so the system scales beyond a small personal dataset",
            "Carry verified records into Phase 2, where TomoCare becomes a destination — dashboard, email ingestion, and approval-gated agentic action like Twilio booking",
        ],
    },

    closing: {
        title: "A note on why this phase matters",
        body:
            "This phase changed TomoCare from a capable pipeline into a more believable product. The extraction layer was already useful, but the verification UI is what makes the system governable. It is the point where provenance, review, correction, and auditability come together in one workflow. That is what gives the later agentic layers permission to exist.",
    },
}