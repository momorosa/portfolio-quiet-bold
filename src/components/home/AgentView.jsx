import { agentSchema } from "../../contents/agentSchema.js"

// ─── PRIMITIVE COMPONENTS ─────────────────────────────────────────────────────

function FieldLabel({ children }) {
  return (
    <span className="font-mono text-xs text-[var(--accent)] opacity-70 select-none">
      {children}
    </span>
  )
}

function FieldValue({ children }) {
  return (
    <span className="font-mono text-sm text-[var(--text)]">
      {children}
    </span>
  )
}

function Annotation({ children }) {
  return (
    <p className="font-mono text-xs leading-relaxed text-[var(--text-soft)] italic border-l-2 border-[var(--accent)] border-opacity-30 pl-3 mt-1 mb-3">
      <span className="text-[var(--accent)] opacity-50 not-italic">// </span>
      {children}
    </p>
  )
}

function SectionHeader({ label, entity }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] opacity-60">
        {label}
      </span>
      <span className="font-mono text-xl font-semibold text-[var(--text)]">
        entity: <span className="text-[var(--accent)]">{entity}</span>
      </span>
    </div>
  )
}

function Field({ name, value, annotation, children }) {
  const renderValue = () => {
    if (children) return children
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {value.map((v, i) => (
            <span
              key={i}
              className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]"
            >
              {typeof v === "object" ? JSON.stringify(v) : String(v)}
            </span>
          ))}
        </div>
      )
    }
    if (typeof value === "object" && value !== null) {
      return (
        <div className="mt-1 pl-3 border-l border-[var(--border)] space-y-1">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <FieldLabel>{k}:</FieldLabel>
              <FieldValue>{typeof v === "object" ? JSON.stringify(v) : String(v)}</FieldValue>
            </div>
          ))}
        </div>
      )
    }
    return <FieldValue>{String(value)}</FieldValue>
  }

  return (
    <div className="mb-1">
      <div className="flex items-start gap-3 flex-wrap">
        <FieldLabel>{name}:</FieldLabel>
        {renderValue()}
      </div>
      {annotation && <Annotation>{annotation}</Annotation>}
    </div>
  )
}

function Divider() {
  return (
    <div className="my-8 border-t border-dashed border-[var(--border)] opacity-40" />
  )
}

function Prose({ label, text, annotation }) {
  return (
    <div className="mb-3">
      <FieldLabel>{label}:</FieldLabel>
      <p className="mt-2 text-sm leading-7 text-[var(--text-muted)] font-sans">
        {text}
      </p>
      {annotation && <Annotation>{annotation}</Annotation>}
    </div>
  )
}

// ─── MODE BANNER ─────────────────────────────────────────────────────────────

function ModeBanner({ onExit }) {
  return (
    <div className="sticky top-0 z-50 border-b border-[var(--accent)] border-opacity-30 bg-[var(--bg)] bg-opacity-95 backdrop-blur-sm px-6 py-3 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[920px] flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--accent)] opacity-60 uppercase tracking-widest">
            view:
          </span>
          <span className="font-mono text-sm text-[var(--accent)] font-semibold">
            agent-centered
          </span>
          <span className="font-mono text-xs text-[var(--text-soft)]">
            — quietbold.com/?view=agent
          </span>
        </div>
        <button
          onClick={onExit}
          className="font-mono text-xs text-[var(--text-soft)] hover:text-[var(--text)] transition-colors underline underline-offset-4"
        >
          ← return to human view
        </button>
      </div>
    </div>
  )
}

// ─── INTENT BLOCK ─────────────────────────────────────────────────────────────

function IntentBlock() {
  const { meta, intent } = agentSchema
  return (
    <div className="mb-14">
      {/* What + Why */}
      <div className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] opacity-60">
          proof of concept
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
          Agent-Centered Design
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--text-muted)] max-w-[680px]">
          {intent.statement}
        </p>
      </div>

      {/* Schema meta as structured fields */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2">
        <Field
          name="schemaVersion"
          value={meta.schemaVersion}
          annotation="Stable versioning lets agents detect breaking changes and decide whether to re-index. Humans don't need this. Agents do."
        />
        <Field
          name="viewType"
          value={meta.viewType}
          annotation="Explicit declaration removes ambiguity about design intent. An agent should never have to infer context."
        />
        <Field
          name="canonicalUrl"
          value={meta.canonicalUrl}
        />
        <Field
          name="agentUrl"
          value={meta.agentUrl}
          annotation="The agent view has a stable, addressable URL — not just a toggled UI state. Agents need linkable surfaces they can be directed to, bookmark, and return to reliably."
        />
        <Field
          name="lastUpdated"
          value={meta.lastUpdated}
          annotation="Month granularity, not exact date. This schema reflects a person's career state, which changes at month-scale. Over-precision implies false accuracy."
        />
        <Field
          name="audience"
          value={intent.audience}
          annotation="Honesty about audience is itself a design decision. This view is designed for human understanding of what agents need — not for direct agent consumption in production."
        />
      </div>
    </div>
  )
}

// ─── IDENTITY SECTION ─────────────────────────────────────────────────────────

function IdentitySection() {
  const { fields } = agentSchema.identity

  return (
    <section className="mb-14">
      <SectionHeader label="section_01" entity="Person" />

      <div className="space-y-1">
        <Field name="name" value={fields.name} />
        <Field
          name="role"
          value={fields.role}
          annotation='Normalized label for cross-context matching. Job titles vary wildly by company. "role" signals the semantic category — what this person does — not what one org decided to call it.'
        />
        <Field
          name="location"
          value={fields.location}
          annotation='"San Francisco, CA" as a string fails on comma-split parsers. Discrete fields are unambiguous and directly queryable.'
        />
        <Field
          name="availability"
          value={fields.availability}
          annotation={`Agents cannot infer availability from tone. A human reads "Let's Connect" and infers openness. An agent needs: availability: "open".`}
        />
        <Field name="contact" value={fields.contact}>
          <div className="mt-1 pl-3 border-l border-[var(--border)] space-y-1 w-full">
            <div className="flex gap-2 flex-wrap">
              <FieldLabel>email:</FieldLabel>
              <a
                href={`mailto:${fields.contact.email}`}
                className="font-mono text-sm text-[var(--accent)] hover:underline"
              >
                {fields.contact.email}
              </a>
            </div>
            {Object.entries(fields.contact.links).map(([k, v]) => (
              <div key={k} className="flex gap-2 flex-wrap">
                <FieldLabel>{k}:</FieldLabel>
                <a
                  href={v}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[var(--accent)] hover:underline break-all"
                >
                  {v}
                </a>
              </div>
            ))}
            <Annotation>
              Named keys not array — an array of link objects requires parsing a "label" field to find the right URL. Named keys let agents retrieve github: directly without iteration or label matching.
            </Annotation>
          </div>
        </Field>

        <Field
          name="domains"
          value={fields.domains}
          annotation="Discrete tokens are directly matchable against job descriptions and retrieval embeddings. Prose embeds these concepts but degrades retrieval precision — an agent may miss a term buried in a paragraph, but will reliably match it as a discrete array element."
        />

        <Field
          name="signals"
          value={fields.signals}
          annotation='"signals" not "tagline" — tagline implies marketing copy. These three lines are extractable intent statements, each encoding a distinct professional value. Renaming the field is honest about their function.'
        />

        <Divider />

        <Prose
          label="source_narrative"
          text={fields.source_narrative}
          annotation="Preserved, not deleted. This prose is the ORIGIN of the structured fields above (domains[], signals[], role). Showing both demonstrates the extraction relationship — this is what a human wrote; those structured fields are what an agent retains and indexes."
        />

        <Divider />

        <Field name="enterprise_work" value={null}>
          <div className="mt-1 pl-3 border-l border-[var(--border)] space-y-1 w-full">
            {Object.entries(fields.enterprise_work)
              .filter(([k]) => k !== "note")
              .map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <FieldLabel>{k}:</FieldLabel>
                  <FieldValue>{String(v)}</FieldValue>
                </div>
              ))}
            <Annotation>
              In human view this reads as a polite disclaimer. In agent view it becomes a provenance signal — enterprise evidence EXISTS but is access-gated, not absent. An agent evaluating a candidate needs to know the difference between "no evidence" and "evidence available on request."
            </Annotation>
          </div>
        </Field>

        <Field
          name="confidence"
          value={fields.confidence}
        />
        <Field
          name="source"
          value={fields.source}
          annotation='"self-declared" is honest. It tells an agent: this has not been third-party verified. Weight accordingly. Every claim carries its confidence level and origin — the same pattern applied in TomoCare.'
        />
      </div>
    </section>
  )
}

// ─── FEATURED PROJECT SECTION ─────────────────────────────────────────────────

function FeaturedProjectSection() {
  const { fields } = agentSchema.featured_project

  return (
    <section className="mb-14">
      <SectionHeader label="section_02" entity="Project" />

      <div className="space-y-1">
        <Field
          name="id"
          value={fields.id}
          annotation="Stable, slug-safe identifier for cross-referencing. Agents build graphs of entities. IDs are the edges."
        />
        <Field name="name" value={fields.name} />
        <Field name="status" value={fields.status} />
        <Field
          name="startDate"
          value={fields.startDate}
          annotation='ISO 8601 not "March 2026" — unambiguous across locales and directly sortable. Human date strings require parsing that introduces error surface.'
        />
        <Field
          name="type"
          value={fields.type}
          annotation='"reference_implementation" is the more important signal here — it tells an agent this work is intended to be transferable, not just a one-off demo. An array allows a project to be multiple types simultaneously without forcing false categorization.'
        />
        <Field name="domains" value={fields.domains} />
        <Field
          name="patterns_demonstrated"
          value={fields.patterns_demonstrated}
          annotation="Separate from domains — patterns are transferable architectural decisions describing HOW the system works, not WHAT it is about. An agent matching candidates to governed AI roles cares more about 'human approval gates' as a pattern than 'pet health' as a domain. Collapsing them loses a critical distinction."
        />

        <Divider />

        <Prose
          label="source_narrative"
          text={fields.source_narrative}
          annotation="Same principle as identity.source_narrative — the prose is the origin. The structured fields above are the extraction. Showing both is the lesson."
        />

        <Divider />

        <Field name="phases" value={null}>
          <div className="mt-2 w-full space-y-3">
            {fields.phases.map((phase) => (
              <div
                key={phase.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 space-y-1"
              >
                {Object.entries(phase).map(([k, v]) => {
                  if (k === "url" && !v) return null
                  return (
                    <div key={k} className="flex gap-2 flex-wrap">
                      <FieldLabel>{k}:</FieldLabel>
                      {k === "url" ? (
                        <a
                          href={v}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm text-[var(--accent)] hover:underline break-all"
                        >
                          {v}
                        </a>
                      ) : (
                        <FieldValue>{v}</FieldValue>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
            <Annotation>
              status on each phase is a confidence signal — "shipped" has verifiable artifacts, "planned" is an assertion. Mixing them without explicit status creates false equivalence between evidence and intention.
            </Annotation>
          </div>
        </Field>
      </div>
    </section>
  )
}

// ─── EXPLORATIONS SECTION ─────────────────────────────────────────────────────

function ExplorationsSection() {
  const { items, collectionPurpose } = agentSchema.explorations

  return (
    <section className="mb-14">
      <SectionHeader label="section_03" entity="ProjectCollection" />

      <div className="mb-4 space-y-1">
        <Field
          name="entity"
          value="ProjectCollection"
          annotation='"explorations" not "lab" — Lab is a UI label chosen for human brand voice. "explorations" is semantically accurate: experimental builds, not production systems. Precision over personality in the schema.'
        />
        <Field name="collectionPurpose" value={collectionPurpose} />
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <FieldLabel>id:</FieldLabel>
                <FieldValue>{item.id}</FieldValue>
                <span className="text-[var(--border)]">·</span>
                <FieldLabel>type:</FieldLabel>
                <FieldValue>{item.type}</FieldValue>
                <span className="text-[var(--border)]">·</span>
                <FieldLabel>evidence:</FieldLabel>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded border ${
                    item.evidence === "live"
                      ? "border-green-500/30 text-green-400 bg-green-500/10"
                      : "border-[var(--border)] text-[var(--text-muted)] bg-[var(--surface-muted)]"
                  }`}
                >
                  {item.evidence}
                </span>
              </div>

              <div className="flex gap-2">
                <FieldLabel>title:</FieldLabel>
                <FieldValue>{item.title}</FieldValue>
              </div>

              <div className="flex gap-2">
                <FieldLabel>domain:</FieldLabel>
                <FieldValue>{item.domain}</FieldValue>
              </div>

              <div className="flex items-start gap-2 flex-wrap">
                <FieldLabel>skills:</FieldLabel>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((s, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-muted)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {item.url && (
                <div className="flex gap-2">
                  <FieldLabel>url:</FieldLabel>
                  <a
                    href={item.url}
                    target={item.url.startsWith("http") ? "_blank" : undefined}
                    rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-mono text-sm text-[var(--accent)] hover:underline break-all"
                  >
                    {item.url}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Annotation>
          Images, videos, and hover states are omitted at the collection level. Visual media carries zero retrieval signal for agents. The url field is the correct pointer to evidence — an agent that needs to verify a project visits the URL. It does not parse an image src path.
        </Annotation>
      </div>
    </section>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function AgentView({ onExit }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <ModeBanner onExit={onExit} />

      <main className="mx-auto max-w-[920px] px-6 py-12 md:px-10 lg:px-14">
        <IntentBlock />

        <div className="border-t-4 border-[var(--accent)] border-opacity-20 pt-10">
          <IdentitySection />
          <div className="border-t-2 border-dashed border-[var(--border)] opacity-30 mb-10" />
          <FeaturedProjectSection />
          <div className="border-t-2 border-dashed border-[var(--border)] opacity-30 mb-10" />
          <ExplorationsSection />
        </div>

        {/* Footer note */}
        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <p className="font-mono text-xs text-[var(--text-soft)] leading-relaxed">
            <span className="text-[var(--accent)] opacity-60">// </span>
            This view is a design artifact, not a production API. It demonstrates
            intentional information architecture decisions for agent-centered design.
            For the human view:{" "}
            <a
              href="https://quietbold.com"
              className="text-[var(--accent)] hover:underline"
            >
              quietbold.com
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
