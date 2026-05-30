export const tomoCarePhase0Content = {
    title: "TomoCare Phase 0: Working Brain",
    description:
        "Phase 0 is the trust foundation behind TomoCare. Before any chatbot or assistant layer, I built a provenance first pipeline that turns scattered pet care PDFs into auditable records, structured extractions, trusted events, and a real Google Calendar reminder for my dog Momo's next Librela shot.",
    backgroundImage: "../../src/assets/girl-and-dog01.jpg",
    heroVideo:"",

    phaseNav: [
    {
        title: "Project Brief",
        pageUrl: "/tomo-care",
        status: "Overview",
    },
    {
        title: "Phase 0: Working Brain",
        pageUrl: "/tomo-care/phase-0",
        status: "You are here",
        current: true,
    },
    {
        title: "Phase 1: Verification UI",
        pageUrl: "/tomo-care/phase-1",
        status: "Shipped",
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
        eyebrow: "Phase 0 · Working Brain",
        body: [
            "TomoCare started with a simple problem: my dog Momo's medical history lives across receipts, lab reports, invoices, and calendar memory in my head. Basic questions like when her next Librela shot is due, or what happened at her last visit, take more effort than they should.",
            "The default approach for an AI pet care assistant in 2026 would be to start with a chatbot. I deliberately didn't. Phase 0 is the working brain underneath: a system that ingests real documents, preserves provenance, produces structured outputs, and drives a real action in the world.",
        ],
        callout:
            "Phase 0 is not the visible product. It is the system underneath. The piece that has to be right before any conversational layer can be trusted to act on its own.",
        diagramSvg:"../../src/assets/phase0-working-brain.svg"
    },

    outcome: {
        title: "What shipped",
        summary:
            "A complete vertical slice from private PDF ingestion to calendar automation, built solo from architecture through deployment.",
        highlights: [
            "7 Librela receipts ingested, parsed, and materialized into normalized event rows",
            "Next dose calculated from history using a versioned reminder rule",
            "Reminder scheduled one week before the due date, with full provenance metadata",
            "Google Calendar sync designed to update existing events rather than create duplicates",
        ],
        imgUrl: "../../src/assets/img06-actual-google-cal-reminder-autocreated-byAIAgent.png",
        caption:
            "The end of the pipeline: a real Google Calendar reminder for Momo's next Librela dose, with rule version, due date, last completed injection, and a TomoCare event ID embedded in the description for traceability.",
    },

    problem: {
        title: "The problem",
        context:
            "Pet care records are fragmented and hard to act on. Important information is buried in PDFs that are easy to store but difficult to query, compare, or use for follow through.",
        items: [
            "Medical receipts and lab reports live in separate files with no shared structure",
            "Useful facts like visit dates, medications, and costs are trapped in unstructured text",
            "Recurring care tasks depend on memory and manual calendar entry",
            "Even simple follow up actions become easy to miss over time",
        ],
        hmw:
            "How might I turn scattered pet care PDFs into a working brain that supports grounded reminders and future agent workflows, without relying on fragile chat context?",
    },

    bet: {
        title: "The bet I made",
        body: [
            "Most AI products in production fail not because the model is wrong, but because the underlying memory is fragile. The model gets blamed; the data layer is the real problem. If TomoCare couldn't tell me which receipt a fact came from, the AI sidekick above it would never be trustworthy enough to act on its own.",
            "So I started at the bottom of the stack instead of the top. Provenance first. Deterministic logic for known workflows. Idempotent automation that can be safely re-run. Trust before polish.",
            "The bet is that this is the harder part. Once the working brain is durable and inspectable, the conversational and agentic layers above it become much easier to build well. A chatbot on top of a fragile system breaks in production. A chatbot on top of a defensible foundation can be trusted with action.",
        ],
    },

    approach: {
        title: "What I built",
        architectureNarrative:
            "PDFs land in private storage as source truth. A documents row tracks each one. Raw text is extracted and stored verbatim before any model call. An ADK agent reads the raw text, calls Gemini, and writes structured candidate truth back as JSONB. A materialization step converts that JSON into normalized event rows. A calendar tool creates or updates the reminder and writes the external event reference back to the events table for idempotency.",
        toolingNote:
            "For this phase I used Google ADK Web as a fast agent workbench rather than building UI. Correctness and system shape were the real risks. Presentation could come later.",
        steps: [
            {
                title: "Private source storage",
                description:
                    "Original PDFs are stored in a private Supabase Storage bucket using stable storage keys. The database stores the file reference, not a temporary signed URL. This matters because temporary URLs expire; stable references survive. This is the source truth layer — immutable original documents.",
                imgUrl: "../../src/assets/img12-supabase-tomoDocs-bucket.png",
                caption:
                    "Source PDFs in private Supabase Storage, organized by document date.",
            },
            {
                title: "Normalized documents layer",
                description:
                    "Each file is linked to a row in the `documents` table, which becomes the source record for everything derived later. Receipts and lab reports are normalized into the same table with consistent metadata.",
                imgUrl: "../../src/assets/img11-supabase-ingested-docs-in-table.png",
                caption:
                    "The documents table — every PDF gets a row that becomes the source record for everything derived from it.",
            },
            {
                title: "Auditable text layer",
                description:
                    "A Python pipeline extracts PDF text and stores it in `documents.raw_text` so I can inspect what the system actually read before sending anything to a model. This is the audit checkpoint that makes everything downstream debuggable.",
                imgUrl: "../../src/assets/img09-rawtext-preview-redact.png",
                caption:
                    "Raw extracted text stored verbatim before any model call. The auditable foundation for everything downstream.",
            },
            {
                title: "Structured extraction (candidate truth)",
                description:
                    "An ADK agent reads `raw_text`, calls Gemini, and stores structured output in `documents.text_extracted` as JSONB. This is candidate truth — probabilistic AI output, stored for inspection and debugging, not yet promoted to anything automation can act on.",
                imgUrl: "../../src/assets/googleADK.jpg",
                caption:
                    "The extraction agent in Google ADK Web. Root agent orchestrates extract_document and supporting tools; structured output flows back to the database as JSONB.",
            },
            {
                title: "Deterministic materialization (trusted truth)",
                description:
                    "Structured extraction results are converted into normalized event rows including completed Librela injections and a planned reminder event. This is the promotion from candidate truth to trusted truth — the rows automation can safely act on. Materialization is rule-driven and idempotent, so it can be re-run safely.",
            },
            {
                title: "Calendar automation",
                description:
                    "A Google Calendar tool creates or updates the next reminder. The external event reference is written back to the database so subsequent runs update the existing event rather than creating duplicates.",
            },
        ],
    },

    principles: {
        title: "Design principles",
        intro:
            "These are the four decisions I held onto throughout Phase 0. Each one made the system harder to build but easier to trust.",
        items: [
            {
                title: "Provenance first",
                body:
                    "Every derived record points back to a source document through `doc_id`. That makes the system inspectable, debuggable, and trustworthy. If a fact looks wrong, I can trace it to the original receipt in one query.",
                imgUrl: "../../src/assets/img05-Supabase-last-planned-event.png",
                caption:
                    "Every event row points back to its source document via doc_id. The provenance principle made concrete.",
            },
            {
                title: "Deterministic before agentic",
                body:
                    "Known workflows like reminder timing are handled with explicit rules, not model inference. The system does not invent scheduling logic behind the scenes. Determinism is auditable and predictable in ways that matter for high stakes domains.",
            },
            {
                title: "Idempotent automation",
                body:
                    "Materialization avoids duplicate event rows, and calendar sync updates an existing reminder when a stored Google event reference already exists. Anything that can be re-run safely will eventually need to be.",
            },
            {
                title: "Trust before polish",
                body:
                    "The goal of Phase 0 was not a polished app. It was a durable, inspectable foundation that can support a better interface later. Polish on top of a fragile system is a liability, not a feature.",
            },
        ],
    },

    reliability: {
        title: "Reliability work",
        body:
            "Real documents fail in messy ways, so I added a few practical guardrails early rather than treating extraction as a happy path problem.",
        items: [
            "Stored raw text as an intermediate checkpoint for inspection before any model call",
            "Checked text length to catch low-text or likely-scanned PDFs early",
            "Handled truncated or malformed model output with fallback paths",
            "Split large multi-panel lab reports into smaller extraction units",
            "Applied deterministic cleanup like normalizing categorical lab values and labeling discounts correctly in receipt line items",
        ],
    },

    learning: {
        title: "What I learned",
        items: [
            "Trust comes from inspectability, not from accuracy. The system feels reliable not because Gemini is always right, but because every derived fact points back to a source I can audit. That matters more than I expected.",
            "Building the working brain before the interface forced me to confront the actual hard problems early. Most AI products fail because the underlying memory is fragile, not because the UI is bad. Working bottom-up is harder, but it's how you end up with something defensible.",
            "Determinism is a feature, not a fallback. Choosing rule-based scheduling over agentic scheduling wasn't a limitation. It was the right call. Deterministic logic is auditable and testable in ways that matter for high stakes domains.",
            "Writing tool outputs back into the database is essential for repeatable automation. Without persisted external references, every run risks duplicating work in the real world.",
        ],
    },

    next: {
        title: "What comes next",
        items: [
            "Phase 1 (Verification UI): make trust legible with a user-facing review workflow that promotes candidate truth into trusted truth — compare, correct, promote.",
            "Phase 2 (TomoCare as a Product): turn the working brain into a destination — dashboard, email ingestion through a dedicated Gmail inbox, calendar surface, and one real agentic action (Twilio appointment booking with HITL approval).",
            "Phase 3 (Grounded Assistant): a bounded conversational layer that reads from trusted truth only, cites its sources, and folds in longitudinal awareness like weight trends and lab directionality. The deferred reward of getting the foundation right.",
            "Across all phases: routing between read-only query flows and approval-gated action flows, all grounded in provenance.",
        ],
    },

    closing: {
        title: "A note on why I built this",
        body:
            "TomoCare is a personal project. I built it on evenings and weekends, partly because Momo deserves the help, and partly because building is how I think. The patterns I'm working out here — provenance, governed action, human-in-the-loop verification, idempotent sync — are the same patterns I want to see more of in the enterprise AI work I do during the day. The fastest way to figure out what works is to build it.",
    },
}