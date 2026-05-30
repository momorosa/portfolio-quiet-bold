// Inline SVG of the Phase 1 architecture with SMIL traveling-dot animations.
// Must be inline (not <img>) for SMIL animateMotion to run in all browsers.
// Sibling component to WorkingBrainDiagram.jsx — same SEGMENTS / PipelineDot pattern.

const TOTAL_S = 14

// Each segment: the path the dot follows, and its active time window within the cycle.
const SEGMENTS = [
  // Phase 0 context band (faded) — extraction pipeline
  { id: "p1mp0",  d: "M 560 167 L 598 167",                        t0: 0.0,  t1: 0.4  },
  { id: "p1mp1",  d: "M 827 167 L 863 167",                        t0: 0.4,  t1: 0.8  },
  { id: "p1mp2",  d: "M 1100 167 L 1136 167",                      t0: 0.8,  t1: 1.2  },
  // Candidate Truth → AI Reviewer (cross-band)
  { id: "p1mp3",  d: "M 1296 224 V 252 H 445 V 300",               t0: 1.3,  t1: 2.2  },
  // AI Reviewer → Triage Results → chips
  { id: "p1mp4",  d: "M 580 365 L 620 365",                        t0: 2.3,  t1: 2.55 },
  { id: "p1mp5",  d: "M 875 365 L 910 365",                        t0: 2.6,  t1: 2.85 },
  // Triage chips → field outcomes (the core mapping)
  { id: "p1mp6",  d: "M 1125 336 H 1410 V 692 H 545",              t0: 3.0,  t1: 4.0  },
  { id: "p1mp7",  d: "M 1125 369 H 1380 V 612 H 545",              t0: 3.3,  t1: 4.3  },
  { id: "p1mp8",  d: "M 1125 402 H 1350 V 636 H 545",              t0: 3.6,  t1: 4.6  },
  // Verification UI internal flow
  { id: "p1mp9",  d: "M 540 626 L 578 626",                        t0: 4.8,  t1: 5.05 },
  { id: "p1mp10", d: "M 793 626 L 828 626",                        t0: 5.1,  t1: 5.35 },
  // Accept/Edit → Approve → Materialize
  { id: "p1mp11", d: "M 983 606 H 1255 V 880 H 445 V 850",         t0: 5.5,  t1: 6.6  },
  // Trusted truth output
  { id: "p1mp12", d: "M 560 863 L 598 863",                        t0: 6.7,  t1: 6.95 },
  // Reject → correction feedback back to AI Reviewer
  { id: "p1mp13", d: "M 908 684 V 790 H 250 V 365 H 330",          t0: 7.1,  t1: 8.2  },
]

function f(n) { return n.toFixed(4) }
const EPS = 0.001

function PipelineDot({ segId, t0, t1 }) {
  const f0 = t0 / TOTAL_S
  const f1 = t1 / TOTAL_S
  const dur = `${TOTAL_S}s`

  // Motion: stay at path start until active window, then travel to end and hold.
  const isFirst = f0 < EPS
  const motionKP = isFirst ? "0;1;1"   : "0;0;1;1"
  const motionKT = isFirst
    ? `0;${f(f1)};1`
    : `0;${f(f0)};${f(f1)};1`

  // Opacity: invisible outside the active window, visible during it.
  const opValues = isFirst ? "1;1;0;0" : "0;0;1;1;0;0"
  const opKT = isFirst
    ? `0;${f(f1)};${f(f1 + EPS)};1`
    : `0;${f(Math.max(0, f0 - EPS))};${f(f0 + EPS)};${f(f1)};${f(f1 + EPS)};1`

  return (
    <circle r="3.5" fill="#E8B059" filter="url(#p1-dot-glow)">
      <animateMotion
        dur={dur}
        repeatCount="indefinite"
        keyPoints={motionKP}
        keyTimes={motionKT}
        calcMode="linear"
      >
        <mpath href={`#${segId}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        dur={dur}
        repeatCount="indefinite"
        values={opValues}
        keyTimes={opKT}
      />
    </circle>
  )
}

export default function VerificationUIDiagram({ className = "" }) {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/60 p-4 md:p-6 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1500 980"
        fill="none"
        role="img"
        aria-label="TomoCare Phase 1: Verification UI — architecture diagram"
        className="min-w-[640px] w-full h-auto"
      >
        <title>TomoCare Phase 1: Verification UI</title>
        <desc>
          Architecture diagram. A faded Phase 0 Fact Extraction Pipeline band at top provides context,
          ending at Candidate Truth. Phase 1 AI Reviewer scores the existing extraction and produces
          per-field triage states: Auto-confirmed maps to Confirmed Fields (collapsed); Needs confirmation
          and Unreadable source map to Flagged Fields (surfaced first). In the Verification UI the human
          reviews flagged fields against the source PDF and chooses Accept, Edit, or Reject. The AI never
          auto-approves. Approved records are materialized into Trusted Events with audit metadata. Reject
          sends correction feedback back to the AI Reviewer.
        </desc>

        <defs>
          {/* Arrow marker */}
          <marker id="p1-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="context-stroke" stroke="context-stroke" strokeWidth="1" strokeLinejoin="round" />
          </marker>

          {/* Soft glow for animated dots */}
          <filter id="p1-dot-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Motion path definitions — invisible, referenced by <mpath> */}
          {SEGMENTS.map(({ id, d }) => (
            <path key={id} id={id} d={d} />
          ))}
        </defs>

        {/* Title */}
        <text x="8" y="50" fill="#FFFFFF" fontFamily="Montserrat, sans-serif" fontSize="40" fontWeight="700">
          TomoCare - Phase 1: Verification UI
        </text>

        {/* Phase 0 context band (faded) */}
        <g id="p1-band-phase0" opacity="0.3">
          <rect x="0" y="110" width="6" height="54" fill="#E8B059" />
          <text x="22" y="134" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Phase 0:</text>
          <text x="22" y="151" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Fact Extraction Pipeline</text>

          <rect x="300" y="108" width="1180" height="116" rx="16" fill="#262626" fillOpacity="0.5" />

          <rect x="330" y="138" width="230" height="58" rx="8" fill="#262626" />
          <text x="445" y="172" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Ingestion &amp; Parsing</text>

          <line x1="560" y1="167" x2="598" y2="167" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#p1-arrow)" />

          <rect x="603" y="139" width="222" height="56" rx="7" fill="none" stroke="#5A5A5A" strokeWidth="2" strokeDasharray="4 4" />
          <text x="714" y="162" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Raw Text</text>
          <text x="714" y="181" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Auditable intermediate</text>

          <line x1="827" y1="167" x2="863" y2="167" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#p1-arrow)" />

          <rect x="868" y="138" width="230" height="58" rx="8" fill="#262626" />
          <text x="983" y="162" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Extraction Agent</text>
          <text x="983" y="181" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">ADK + Gemini</text>

          <line x1="1100" y1="167" x2="1136" y2="167" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#p1-arrow)" />

          <rect x="1141" y="138" width="310" height="58" rx="8" fill="#262626" />
          <text x="1296" y="162" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Candidate Truth</text>
          <text x="1296" y="181" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">(JSONB)</text>
        </g>

        {/* Candidate Truth → AI Reviewer */}
        <path d="M 1296 224 V 252 H 445 V 300" fill="none" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#p1-arrow)" />

        {/* Phase 1: AI Reviewer + Triage */}
        <g id="p1-band-reviewer">
          <rect x="0" y="300" width="6" height="54" fill="#E8B059" />
          <text x="22" y="324" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Phase 1:</text>
          <text x="22" y="341" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">AI Reviewer + Triage</text>

          <rect x="300" y="300" width="1180" height="180" rx="16" fill="#262626" fillOpacity="0.5" />

          <rect x="330" y="330" width="250" height="70" rx="8" fill="#262626" />
          <text x="455" y="360" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">AI Reviewer</text>
          <text x="455" y="381" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Scores existing extraction</text>

          <text x="455" y="428" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="11" textAnchor="middle">Does not re-extract · per-field confidence + reason</text>

          <line x1="580" y1="365" x2="620" y2="365" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#p1-arrow)" />

          <rect x="625" y="330" width="250" height="70" rx="8" fill="#262626" />
          <text x="750" y="360" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Triage Results</text>
          <text x="750" y="381" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Per-field state · documents table</text>

          <line x1="875" y1="365" x2="910" y2="365" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#p1-arrow)" />

          {/* triage state chips */}
          <rect x="915" y="322" width="210" height="28" rx="14" fill="none" stroke="#4E7D3A" strokeWidth="1.5" />
          <text x="1020" y="340" fill="#7FB85C" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Auto-confirmed</text>

          <rect x="915" y="355" width="210" height="28" rx="14" fill="none" stroke="#B5862E" strokeWidth="1.5" />
          <text x="1020" y="373" fill="#E8B059" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Needs confirmation</text>

          <rect x="915" y="388" width="210" height="28" rx="14" fill="none" stroke="#A33B3B" strokeWidth="1.5" />
          <text x="1020" y="406" fill="#D86B6B" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Unreadable source</text>

          <text x="1155" y="356" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="11">Fail-safe: if triage fails,</text>
          <text x="1155" y="372" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="11">field defaults to needs-confirm</text>
        </g>

        {/* explicit mapping: chips → field outcomes (right-side rails, no crossing) */}
        <path d="M 1125 336 H 1410 V 692 H 545" fill="none" stroke="#4E7D3A" strokeWidth="1.25" strokeDasharray="3 3" markerEnd="url(#p1-arrow)" />
        <text x="1418" y="520" fill="#7FB85C" fontFamily="Inter, sans-serif" fontSize="11" transform="rotate(90 1418 520)">auto → collapsed</text>

        <path d="M 1125 369 H 1380 V 612 H 545" fill="none" stroke="#B5862E" strokeWidth="1.25" strokeDasharray="3 3" markerEnd="url(#p1-arrow)" />

        <path d="M 1125 402 H 1350 V 636 H 545" fill="none" stroke="#A33B3B" strokeWidth="1.25" strokeDasharray="3 3" markerEnd="url(#p1-arrow)" />
        <text x="1388" y="520" fill="#E8B059" fontFamily="Inter, sans-serif" fontSize="11" transform="rotate(90 1388 520)">flagged → surfaced</text>

        {/* Phase 1: Verification UI */}
        <g id="p1-band-verify">
          <rect x="0" y="560" width="6" height="54" fill="#E8B059" />
          <text x="22" y="584" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Phase 1:</text>
          <text x="22" y="601" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Verification UI</text>

          <rect x="300" y="555" width="900" height="190" rx="16" fill="none" stroke="#5A5A5A" strokeWidth="1.5" strokeDasharray="5 4" />
          <text x="320" y="580" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="12">Verification UI · source PDF shown alongside</text>

          <rect x="330" y="595" width="210" height="62" rx="8" fill="#262626" />
          <text x="435" y="621" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Flagged Fields</text>
          <text x="435" y="641" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Surfaced first</text>

          <rect x="330" y="667" width="210" height="50" rx="8" fill="#262626" fillOpacity="0.5" />
          <text x="435" y="688" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="13" textAnchor="middle">Confirmed Fields</text>
          <text x="435" y="705" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="11" textAnchor="middle">Collapsed summary</text>

          <line x1="540" y1="626" x2="578" y2="626" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#p1-arrow)" />

          <rect x="583" y="595" width="210" height="62" rx="8" fill="#262626" />
          <text x="688" y="621" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Human reviews</text>
          <text x="688" y="641" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Compares vs. source</text>

          <line x1="793" y1="626" x2="828" y2="626" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#p1-arrow)" />

          {/* decision buttons */}
          <rect x="833" y="592" width="150" height="28" rx="14" fill="none" stroke="#4E7D3A" strokeWidth="1.5" />
          <text x="908" y="610" fill="#7FB85C" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Accept</text>

          <rect x="833" y="624" width="150" height="28" rx="14" fill="none" stroke="#B5862E" strokeWidth="1.5" />
          <text x="908" y="642" fill="#E8B059" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Edit</text>

          <rect x="833" y="656" width="150" height="28" rx="14" fill="none" stroke="#A33B3B" strokeWidth="1.5" />
          <text x="908" y="674" fill="#D86B6B" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Reject</text>

          <text x="1010" y="624" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="11">Human decides every promotion.</text>
          <text x="1010" y="640" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="11">AI never auto-approves.</text>
        </g>

        {/* Reject → correction feedback back to AI Reviewer */}
        <path d="M 908 684 V 790 H 250 V 365 H 330" fill="none" stroke="#CF9033" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#p1-arrow)" />
        <text x="320" y="784" fill="#CF9033" fontFamily="Inter, sans-serif" fontSize="11">Correction feedback → improves future review</text>

        {/* Accept/Edit → Approve → Materialize */}
        <path d="M 983 606 H 1255 V 880 H 445 V 850" fill="none" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#p1-arrow)" />
        <text x="1263" y="745" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12">Approve</text>

        {/* Phase 1: Trusted Truth Output */}
        <g id="p1-band-output">
          <rect x="0" y="800" width="6" height="54" fill="#E8B059" />
          <text x="22" y="824" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Phase 1:</text>
          <text x="22" y="841" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Trusted Truth Output</text>

          <rect x="300" y="800" width="900" height="120" rx="16" fill="#262626" fillOpacity="0.5" />

          <rect x="330" y="832" width="230" height="62" rx="8" fill="#444441" />
          <text x="445" y="858" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Materialize</text>
          <text x="445" y="878" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Delete + re-insert (idempotent)</text>

          <line x1="560" y1="863" x2="598" y2="863" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#p1-arrow)" />

          <rect x="603" y="832" width="230" height="62" rx="8" fill="#444441" />
          <text x="718" y="858" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Trusted Events</text>
          <text x="718" y="878" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Normalized table</text>

          <text x="868" y="850" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="11">verified_by</text>
          <text x="868" y="865" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="11">timestamp</text>
          <text x="868" y="880" fill="#9A9A9A" fontFamily="Inter, sans-serif" fontSize="11">doc_id provenance</text>
        </g>

        {/* Animated pipeline dots — hidden from assistive tech */}
        <g aria-hidden="true">
          {SEGMENTS.map(({ id, t0, t1 }) => (
            <PipelineDot key={id} segId={id} t0={t0} t1={t1} />
          ))}
        </g>
      </svg>
    </div>
  )
}
