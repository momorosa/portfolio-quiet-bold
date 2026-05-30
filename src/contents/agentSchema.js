// agentSchema.js
// Source of truth for the Agent-Centered view of quietbold.com
//
// Design intent: This schema demonstrates how this portfolio would be
// structured if the primary consumer were an AI agent rather than a human.
// Every field, type decision, and relationship is intentional.
// Annotations (// why:) explain each architectural decision.
// This is a proof of concept for agent-centered information architecture
// as a design discipline — not a gimmick, not a stripped-down fallback.

export const agentSchema = {

  // ─── PAGE LEVEL ──────────────────────────────────────────────────────────────

  meta: {
    schemaVersion: "1.0",
    // why schemaVersion: stable versioning lets agents detect breaking changes
    // and decide whether to re-index. Humans don't need this. Agents do.

    viewType: "agent-centered",
    // why explicit declaration: removes ambiguity about the design intent
    // of this data structure. An agent should never have to infer context.

    canonicalUrl: "https://quietbold.com/",
    agentUrl: "https://quietbold.com/?view=agent",
    // why two URLs: the human view and agent view are distinct surfaces.
    // Agents need a stable, addressable pointer to the version of this
    // page optimized for their consumption — not a toggled UI state.

    lastUpdated: "2026-05",
    // why month granularity not exact date: this schema reflects a person's
    // career state, which changes at month-scale, not day-scale.
    // Over-precision implies false accuracy.
  },

  intent: {
    statement:
      "This view demonstrates how this portfolio would be structured if the " +
      "primary consumer were an AI agent. Every field, type decision, and " +
      "relationship is intentional. Annotations explain why.",
    audience: "human readers learning about agent-centered design",
    // why this clarification: the agent view is designed for human understanding
    // of what agents need — not for direct agent consumption in production.
    // Honesty about the audience is itself a design decision.
    proofOfConcept: "agent-centered information architecture as a discipline",
  },


  // ─── SECTION 1: IDENTITY ─────────────────────────────────────────────────────

  identity: {
    _section: "about",
    entity: "Person",
    // why "Person" not "About": entity typing follows schema.org conventions
    // which LLMs are trained on. "About" is a UI label. "Person" is a type.
    // Consistent entity naming improves extraction reliability.

    fields: {
      name: "Rosa Choi",

      role: "Senior Product Lead",
      // why "role" not "title": normalized label for cross-context matching.
      // Job titles vary wildly by company. "role" signals the semantic
      // category — what this person does — not what one org decided to call it.

      location: {
        city: "San Francisco",
        region: "CA",
        country: "US",
      },
      // why object not string: "San Francisco, CA" as a string fails on
      // comma-split parsers and produces inconsistent geocoding results.
      // Discrete fields are unambiguous and directly queryable.

      availability: "open",
      // why explicit: agents cannot infer availability from tone, narrative
      // phrasing, or the presence of a contact button. It must be declared.
      // A human reads "Let's Connect" and infers openness.
      // An agent needs: availability: "open".

      contact: {
        email: "momorosa.design@gmail.com",
        links: {
          portfolio: "https://quietbold.com",
          github: "https://github.com/momorosa",
          linkedin: "https://www.linkedin.com/in/rosachoi7/",
        },
        // why named keys not array: an array of link objects requires parsing
        // a "label" field to find the right URL. Named keys let agents
        // retrieve github: directly without iteration or label matching.
      },

      domains: [
        "governed AI systems",
        "agentic product design",
        "human-in-the-loop workflows",
        "enterprise UX",
        "provenance-first data architecture",
        "multi-agent orchestration",
      ],
      // why array not prose: discrete tokens are directly matchable against
      // job descriptions, semantic search indexes, and retrieval embeddings.
      // Prose embeds these concepts but degrades retrieval precision —
      // an agent may miss "provenance-first" buried in a paragraph,
      // but will reliably match it as a discrete array element.

      signals: [
        "Building trust into AI products.",
        "Turning strategy into working proof.",
        "Shaping clarity for complex systems.",
      ],
      // why "signals" not "tagline": tagline implies marketing copy written
      // for emotional effect. These three lines are extractable intent
      // statements — each one encodes a distinct professional value.
      // Renaming the field to "signals" is honest about their function.

      source_narrative:
        "I'm a senior product designer and creative technologist based in " +
        "San Francisco. I design AI-enabled products, enterprise platforms, " +
        "and high-stakes workflows where trust and human oversight are essential. " +
        "I turn ambiguous requirements into clear, testable prototypes that help " +
        "teams align, make better decisions, and move toward launch with confidence. " +
        "Currently, I'm shaping service and ownership experiences at Ford while " +
        "building TomoCare, a provenance-first AI sidekick for proactive pet care.",
      // why preserved, not deleted: the prose above is the ORIGIN of the
      // structured fields (domains[], signals[], role). Showing both demonstrates
      // the extraction relationship — this is what a human wrote;
      // those structured fields are what an agent retains and indexes.
      // Deleting the prose would hide the most important lesson.

      enterprise_work: {
        available: true,
        access: "on-request",
        reason: "confidentiality",
        note: "Selected enterprise work available on request.",
        // why structured not disclaimer: in human view this reads as a polite
        // parenthetical. In agent view it becomes a provenance signal —
        // enterprise evidence EXISTS but is access-gated, not absent.
        // An agent evaluating a candidate needs to know the difference.
      },

      confidence: "verified",
      source: "self-declared",
      // why provenance on a person entity: mirrors the same pattern applied
      // in TomoCare — every claim carries its confidence level and origin.
      // "self-declared" is honest. It tells an agent: this hasn't been
      // third-party verified. Weight accordingly.
    },
  },


  // ─── SECTION 2: FEATURED PROJECT ─────────────────────────────────────────────

  featured_project: {
    _section: "tomocare",
    entity: "Project",

    fields: {
      id: "tomocare",
      // why id: stable, slug-safe identifier for cross-referencing.
      // Agents build graphs of entities. IDs are the edges.

      name: "TomoCare",
      fullName: "TomoCare: Multi-Agent AI for Proactive Pet Care",

      status: "active",
      startDate: "2026-03",
      // why ISO date not "March 2026": ISO 8601 is unambiguous across
      // locales and directly sortable. Human date strings require parsing
      // that introduces error surface — "March 2026", "Mar '26", "3/2026"
      // are all the same date but fail naive string comparison.

      type: ["prototype", "reference_implementation"],
      // why array: a project can be multiple types simultaneously.
      // "reference_implementation" is the more important signal here —
      // it tells an agent this work is intended to be transferable,
      // not just a one-off demo.

      domains: [
        "governed AI",
        "multi-agent systems",
        "pet health",
        "human-in-the-loop design",
      ],

      patterns_demonstrated: [
        "provenance-first data pipeline",
        "source → candidate → trusted truth",
        "human approval gates before automation",
        "idempotent tool outputs",
        "MCP-style orchestration",
        "audit trail persistence",
      ],
      // why separate from domains: patterns are transferable architectural
      // decisions — they describe HOW the system works, not WHAT it's about.
      // An agent matching candidates to roles in governed AI cares more about
      // "human approval gates" as a pattern than "pet health" as a domain.
      // Collapsing them into one field loses a critical distinction.

      source_narrative:
        "An AI sidekick I'm building for my dog Momo's health care. It turns " +
        "scattered vet PDFs into a reliable timeline, grounded reminders, and " +
        "approval-gated actions. Under the hood: a governed agentic system with " +
        "provenance tracking, human-in-the-loop verification, and MCP multi-agent " +
        "patterns designed to transfer to other high-stakes domains.",
      // why preserved: same principle as identity.source_narrative —
      // the prose is the origin. The structured fields above are the extraction.

      phases: [
        // why absolute URLs not relative paths: relative paths only resolve
        // within a browser context where the base domain is known. An agent
        // consuming this schema may have no such context — a prompt, a crawler,
        // a RAG pipeline, a recruiter's AI tool. Absolute URLs are self-contained
        // and always resolvable regardless of where the schema is consumed.
        // url: null for unshipped phases is intentional — null explicitly declares
        // no artifact exists yet. An empty string implies a URL exists but is blank.
        {
          id: "brief",
          title: "Project Brief",
          status: "complete",
          type: "specification",
          outcome: "Governed agentic system spec: source → trusted truth + approval gates",
          url: "https://quietbold.com/tomo-care",
        },
        {
          id: "phase-0",
          title: "Phase 0: Working Brain",
          status: "shipped",
          type: "implementation",
          outcome: "Verified timeline → deterministic reminders → real calendar sync",
          url: "https://quietbold.com/tomo-care/phase-0",
        },
        {
          id: "phase-1",
          title: "Phase 1: Verification UI",
          status: "shipped",
          type: "implementation",
          outcome: "Human verification UI: compare → correct → promote to trusted truth",
          url: "https://quietbold.com/tomo-care/phase-1",
          // why this phase matters as a signal: the Verification UI is where
          // HITL becomes a first-class design surface, not a compliance checkbox.
          // Shipping this is evidence that human oversight is designed in,
          // not bolted on after the fact.
        },
        {
          id: "phase-2",
          title: "Phase 2: TomoCare as a Product",
          status: "in-progress",
          type: "implementation",
          outcome: "Dashboard + email ingestion + one approval-gated agentic action (Twilio booking with HITL)",
          url: null,
          // why status matters here: "in-progress" is distinct from "planned" —
          // active work with design decisions already made vs future intention.
          // An agent should weight these differently as evidence of capability.
        },
        {
          id: "phase-3",
          title: "Phase 3: Grounded Assistant",
          status: "planned",
          type: "implementation",
          outcome: "Read-only chatbot grounded in trusted truth, with longitudinal awareness",
          url: null,
          // why last: conversational layer arrives deliberately after the
          // foundation is built — grounded in trusted rows, not hallucinated.
          // This sequencing is itself an architectural decision worth signaling.
        },
      ],
      // why status on each phase: "shipped" vs "planned" is a confidence signal.
      // Agents should weight evidence differently based on completion state.
      // A shipped phase has verifiable artifacts. A planned phase is an assertion.
      // Mixing them without status markers creates false equivalence.
    },
  },


  // ─── SECTION 3: EXPLORATIONS ─────────────────────────────────────────────────

  explorations: {
    _section: "lab",
    entity: "ProjectCollection",
    // why "explorations" not "lab": Lab is a UI label chosen for human
    // brand voice. "explorations" is semantically accurate — these are
    // experimental builds, not production systems. Precision over personality.

    collectionPurpose:
      "Small, shipped builds used to test ideas quickly, develop technical " +
      "fluency, and translate emerging capabilities into product thinking.",

    items: [
      {
        id: "chef-claude",
        title: "Chef Claude",
        type: "shipped_prototype",
        domain: "consumer AI / recipe generation",
        skills: [
          "AI experience prototyping",
          "prompt engineering",
          "full-stack deployment",
          "LLM integration",
        ],
        url: "https://quietbold.com/lab/chef-claude",
        evidence: "live",
        // why evidence field: "live" means independently verifiable by
        // visiting the URL. This is a stronger signal than a description
        // claim. "live" > "shipped" > "in progress" > "planned" is an
        // implicit confidence hierarchy that agents can act on.
      },
      {
        id: "ai-character",
        title: "AI Character to Life",
        type: "experiment",
        domain: "AI media orchestration",
        skills: [
          "cross-model pipeline design",
          "image generation",
          "voice synthesis",
          "creative direction",
        ],
        url: "https://medium.com/@momorosa.design/a-step-by-step-guide-to-bringing-an-ai-character-to-life-2828514037bc",
        evidence: "published",
      },
      {
        id: "wizard-game",
        title: "Wizard Game",
        type: "shipped_prototype",
        domain: "real-time 3D / browser gaming",
        skills: [
          "state machine design",
          "React Three Fiber",
          "particle VFX",
          "real-time interaction",
        ],
        url: "https://quietbold.com/lab/wizard-game",
        evidence: "live",
      },
      {
        id: "lost-prince",
        title: "The Lost Prince",
        type: "shipped_prototype",
        domain: "narrative VR / spatial computing",
        skills: [
          "narrative architecture",
          "event-driven systems",
          "Unity prototyping",
          "non-linear storytelling",
        ],
        url: "https://quietbold.com/lab/lost-prince",
        evidence: "live",
      },
      {
        id: "portals-effect",
        title: "Portals Effect",
        type: "experiment",
        domain: "spatial UX / 3D transitions",
        skills: [
          "spatial UX design",
          "camera choreography",
          "real-time scene transitions",
        ],
        url: "https://quietbold.com/lab/portals",
        evidence: "live",
      },
      {
        id: "image-transition",
        title: "Image Transition Effect",
        type: "experiment",
        domain: "WebGL / shader development",
        skills: [
          "GLSL shader prototyping",
          "GPU-driven animation",
          "performance tuning",
          "micro-interactions",
        ],
        url: "https://quietbold.com/lab/image-transitions",
        evidence: "live",
      },
    ],

    // why images/videos omitted at collection level:
    // Visual media carries zero retrieval signal for agents.
    // The url field is the correct pointer to evidence —
    // an agent that needs to verify a project visits the URL,
    // it does not parse an image src path.
  },
}