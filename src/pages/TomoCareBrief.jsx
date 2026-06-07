import ProjectHeading from "../components/ProjectHeading.jsx"
import QuietBoldHomeLink from "../components/QuietBoldHomeLink.jsx"
import { tomoCareBriefContent as content } from "../contents/tomoCareProjectBrief.js"
import {
  CaseStudySection,
  CaseStudyBody,
  CaseStudyEyebrow,
  CaseStudyList,
  CaseStudyCard,
  CaseStudyCallout,
} from "../components/CaseStudy.jsx"
import PhaseDiagram from "../components/Phasediagram.jsx"
import WorkingBrainDiagram from "../components/WorkingBrainDiagram.jsx"
import VerificationUIDiagram from "../components/VerificationUIDiagram.jsx"
import Footer from "../components/Footer.jsx"

// Phases with dedicated diagram components — these replace the generic PhaseDiagram.
// Sections that have a custom diagram render at narrow={false} (max-w-[1120px]) so the
// diagram has room; their text blocks are constrained to max-w-[760px] separately.
const customDiagrams = {
  "Phase 0: Working Brain":   <WorkingBrainDiagram />,
  "Phase 1: Verification UI": <VerificationUIDiagram />,
}

const phaseDiagrams = {
  "Phase 2: MCP Orchestrator": {
    phaseLabel: "Phase 2",
    phaseTitle: "Agentic Operations & Tools",
    inputLabel: "From trusted truth",
    nodes: [
      { title: "Central Orchestrator", subtitle: "Intent routing + policy enforcement", variant: "accent" },
      { title: "Proposed Actions", subtitle: "proposed_action object" },
      { title: "HITL Approval Gate", subtitle: "Explicit user confirmation", highlight: true },
      { title: "External Tools API", subtitle: "Execute approved actions" },
    ],
    outputNodes: [
      { title: "Calendaring Tool API", subtitle: "Synced, idempotent" },
      { title: "Messaging Tool API", subtitle: "Drafted, gated" },
    ],
  },

  "Phase 3: Preventative Intelligence": {
    phaseLabel: "Phase 3",
    phaseTitle: "Longitudinal Signals & Prep",
    inputLabel: "From trusted truth",
    nodes: [
      { title: "Longitudinal Analysis", subtitle: "Trends across time" },
      { title: "Preventative Signal Flags", subtitle: "Evidence-based, non-diagnostic", highlight: true },
      { title: "Vet Discussion Prep", subtitle: "Questions + evidence bundle" },
    ],
  },
}

export default function TomoCareBrief() {
  return (
    <main className="relative min-h-screen bg-warm-gray-dark/50 text-white font-primary overflow-x-hidden">
      <QuietBoldHomeLink
        className="absolute top-4 left-4 z-20"
        size="1.5em"
      />

      <ProjectHeading
        backgroundImage={content.backgroundImage}
        tintClass="bg-black/60"
        title={content.title}
        description={content.description}
        navItems={content.phaseNav.map((phase, index) => ({
            label: phase.title,
            key: index,
            href: phase.pageUrl,
            meta: phase.status,
            disabled: phase.disabled || !phase.pageUrl,
            newTab: false,
        }))}
        heroImage={{
          src: content.diagramImage || "/assets/tomoCare-system-diagram.png",
          alt: "TomoCare system architecture: ingestion, governance, orchestration, and tool execution across all phases",
          className: "rounded-2xl border border-white/10",
          zoomable: true,
        }}
      />

      {/* Extra top padding on first section to clear the overlapping diagram */}
      <article className="">

        {/* Governance model — the most differentiating content, leads the page */}
        <CaseStudySection
          title={content.governanceModel.title}
          className="bg-black pt-50 md:pt-60 lg:pt-80"
        >
          <div className="space-y-6">
            {content.governanceModel.tiers.map((tier, index) => (
              <CaseStudyCard key={index}>
                <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                  {tier.name}
                </h3>
                <CaseStudyBody>{tier.description}</CaseStudyBody>
              </CaseStudyCard>
            ))}
          </div>

          <div className="pt-4">
            <CaseStudyEyebrow>Guardrails</CaseStudyEyebrow>
            <CaseStudyList items={content.governanceModel.guardrails} />
          </div>
        </CaseStudySection>

        {/* Product objectives */}
        <CaseStudySection title={content.objectives.title}>
          <div className="space-y-10">
            <div>
              <CaseStudyEyebrow>Primary</CaseStudyEyebrow>
              <CaseStudyList items={content.objectives.primary} />
            </div>

            <div>
              <CaseStudyEyebrow>Secondary</CaseStudyEyebrow>
              <CaseStudyList items={content.objectives.secondary} />
            </div>
          </div>
        </CaseStudySection>

        {/* What TomoCare is not — shows discipline and restraint */}
        <CaseStudySection title={content.not.title}>
          <CaseStudyList items={content.not.items} />
        </CaseStudySection>

        {/* Phase roadmap */}
        {content.phases?.map((phase, index) => {
          const customDiagram = customDiagrams[phase.title]
          // Wide sections let the diagram breathe; text blocks are re-constrained below.
          const narrow = !customDiagram
          const textCls = customDiagram ? "max-w-[760px] space-y-6" : "space-y-6"

          return (
            <CaseStudySection
              key={index}
              id={phase.pageUrl}
              title={phase.title}
              className="bg-warm-gray-dark/35"
              narrow={narrow}
            >
              {/* Status badge + goal — constrained when section is wide */}
              <div className={textCls}>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-[0.14em] border",
                      phase.status === "Shipped"
                        ? "border-emerald-400/30 text-emerald-300 bg-emerald-400/10"
                        : phase.status === "In progress"
                        ? "border-yellow-mellow/30 text-yellow-mellow-light bg-yellow-mellow/10"
                        : "border-white/10 text-zinc-300 bg-white/5",
                    ].join(" ")}
                  >
                    {phase.status}
                  </span>
                </div>

                <CaseStudyBody>
                  <span className="text-zinc-100 font-medium">Goal:</span>{" "}
                  {phase.goal}
                </CaseStudyBody>
              </div>

              {/* Diagram — custom component (1120px wide) or generic PhaseDiagram */}
              {customDiagram ?? (
                phaseDiagrams[phase.title] && (
                  <PhaseDiagram {...phaseDiagrams[phase.title]} />
                )
              )}

              {/* Scope + supplemental detail — constrained when section is wide */}
              <div className={textCls}>
                <div>
                  <CaseStudyEyebrow>Scope</CaseStudyEyebrow>
                  <CaseStudyList items={phase.scope} />
                </div>

                {phase.uiComponents?.length ? (
                  <div>
                    <CaseStudyEyebrow>Key UI components</CaseStudyEyebrow>
                    <CaseStudyList items={phase.uiComponents} />
                  </div>
                ) : null}

                {phase.hitl?.length ? (
                  <div>
                    <CaseStudyEyebrow>Human in the loop</CaseStudyEyebrow>
                    <CaseStudyList items={phase.hitl} />
                  </div>
                ) : null}

                {phase.successMetrics?.length ? (
                  <div>
                    <CaseStudyEyebrow>Success metrics</CaseStudyEyebrow>
                    <CaseStudyList items={phase.successMetrics} />
                  </div>
                ) : null}
              </div>
            </CaseStudySection>
          )
        })}

        {/* Metrics — strong closer, shows product thinking */}
        <CaseStudySection title={content.metrics.title}>
          <CaseStudyBody>{content.metrics.note}</CaseStudyBody>

          <div className="space-y-8">
            {content.metrics.measures.map((measure, index) => (
              <div
                key={index}
                className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0"
              >
                <h3 className="text-lg md:text-xl font-medium text-white mb-3">
                  {measure.name}
                </h3>
                <CaseStudyBody>
                  <span className="text-zinc-100 font-medium">How:</span>{" "}
                  {measure.how}
                </CaseStudyBody>
                <CaseStudyBody>
                  <span className="text-zinc-100 font-medium">Example:</span>{" "}
                  {measure.example}
                </CaseStudyBody>
              </div>
            ))}
          </div>
        </CaseStudySection>
      </article>
      <Footer />
    </main>
  )
}