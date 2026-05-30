// Inline SVG of the Phase 0 architecture with SMIL traveling-dot animations.
// Must be inline (not <img>) for SMIL animateMotion to run in all browsers.

const TOTAL_S = 12

// Each segment: the path the dot follows, and its active time window within the 6-second cycle.
const SEGMENTS = [
  // Top band — source truth
  { id: "mp0",  d: "M 213 226 L 325 226",                     t0: 0.0,  t1: 0.5  },
  { id: "mp1",  d: "M 540 226 L 656 226",                     t0: 0.5,  t1: 1.0  },
  { id: "mp2",  d: "M 871 226 L 986 226",                     t0: 1.0,  t1: 1.5  },
  // Middle band — extraction pipeline
  { id: "mp3",  d: "M 548 389 L 583 389",                     t0: 1.7,  t1: 1.95 },
  { id: "mp4",  d: "M 810 389 L 845 389",                     t0: 2.0,  t1: 2.25 },
  { id: "mp5",  d: "M 1075 389 L 1110 389",                   t0: 2.3,  t1: 2.55 },
  // Correction feedback loop
  { id: "mp6",  d: "M 1240 422 V 446 H 435 V 424",            t0: 2.6,  t1: 3.4  },
  // Promote: extraction band → action band (vertical)
  { id: "mp7",  d: "M 435 461 L 435 552",                     t0: 3.0,  t1: 3.5  },
  // Bottom band — trusted truth & action
  { id: "mp8",  d: "M 549 588 L 579 588",                     t0: 3.6,  t1: 3.8  },
  { id: "mp9",  d: "M 810 588 L 845 588",                     t0: 3.9,  t1: 4.1  },
  { id: "mp10", d: "M 1075 588 L 1110 588",                   t0: 4.2,  t1: 4.4  },
  // Provenance arc — trusted events back to documents
  { id: "mp11", d: "M 697 556 V 540 H 1400 V 226 H 1204",    t0: 4.7,  t1: 5.7  },
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
    <circle r="3.5" fill="#E8B059" filter="url(#dot-glow)">
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

export default function WorkingBrainDiagram({ className = "" }) {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/60 p-4 md:p-6 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1425 664"
        fill="none"
        role="img"
        aria-label="TomoCare Phase 0: Working Brain — end-to-end architecture diagram"
        className="min-w-[640px] w-full h-auto"
      >
        <title>TomoCare Phase 0: Working Brain</title>
        <desc>
          Three-band architecture diagram. Top band (Ingestion and Source Truth): PDFs flow through Document
          Upload to Immutable PDF storage and a Documents table. Middle band (Fact Extraction Pipeline):
          Ingestion and Parsing to Raw Text to Extraction Agent to Candidate Truth, with a Correction
          Feedback loop. Bottom band (Trusted Truth and Action): Materialization writes to Trusted Events,
          which drives idempotent Calendar Sync producing a Google Calendar reminder. A dotted provenance arc
          connects Trusted Events back to Documents.
        </desc>

        <defs>
          {/* Arrow marker */}
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="context-stroke" stroke="context-stroke" strokeWidth="1" strokeLinejoin="round" />
          </marker>

          {/* Soft glow for animated dots */}
          <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
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
        <text x="8" y="38" fill="#FFFFFF" fontFamily="Montserrat, sans-serif" fontSize="40" fontWeight="700">
          TomoCare - Phase 0: Working Brain
        </text>

        {/* Band 1: Ingestion & Source Truth */}
        <g id="band-source">
          <rect x="0" y="100" width="6" height="54" fill="#E8B059" />
          <text x="19" y="131" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Ingestion &amp; Source Truth</text>

          <rect x="0" y="190" width="208" height="71" rx="8" fill="#262626" />
          <text x="104" y="220" fill="#E8B059" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">PDFs</text>
          <text x="104" y="241" fill="#E8B059" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Receipts, labs</text>

          <line x1="213" y1="226" x2="325" y2="226" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          <rect x="330" y="190" width="208" height="71" rx="8" fill="#262626" />
          <text x="434" y="220" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Document Upload</text>
          <text x="434" y="241" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Stable storage keys</text>

          <line x1="540" y1="226" x2="656" y2="226" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          <rect x="661" y="190" width="208" height="71" rx="8" fill="#262626" />
          <text x="765" y="220" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Immutable PDF</text>
          <text x="765" y="241" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Private bucket</text>

          <line x1="871" y1="226" x2="986" y2="226" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          <rect x="991" y="190" width="208" height="71" rx="8" fill="#262626" />
          <text x="1095" y="220" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Documents</text>
          <text x="1095" y="241" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Provenance</text>
        </g>

        {/* Band 2: Fact Extraction Pipeline */}
        <g id="band-extraction">
          <rect x="0" y="318" width="6" height="54" fill="#E8B059" />
          <text x="22" y="342" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Phase 0:</text>
          <text x="22" y="359" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Fact Extraction Pipeline</text>

          <rect x="293" y="318" width="1101" height="143" rx="16" fill="#262626" fillOpacity="0.5" />

          <rect x="322" y="355" width="226" height="69" rx="8" fill="#262626" />
          <text x="435" y="394" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Ingestion &amp; Parsing</text>

          <line x1="548" y1="389" x2="583" y2="389" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          <rect x="589" y="356" width="219" height="65" rx="7" fill="none" stroke="#5A5A5A" strokeWidth="2" strokeDasharray="4 4" />
          <text x="698" y="383" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Raw Text</text>
          <text x="698" y="404" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Auditable intermediate</text>

          <line x1="810" y1="389" x2="845" y2="389" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          <rect x="850" y="355" width="224" height="67" rx="8" fill="#262626" />
          <text x="962" y="383" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Extraction Agent</text>
          <text x="962" y="404" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">ADK + Gemini</text>

          <line x1="1075" y1="389" x2="1110" y2="389" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          <rect x="1115" y="355" width="251" height="67" rx="8" fill="#262626" />
          <text x="1240" y="383" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Candidate Truth</text>
          <text x="1240" y="404" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">(JSONB)</text>

          <path d="M 1240 422 V 446 H 435 V 424" fill="none" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />
          <text x="838" y="441" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Correction Feedback</text>
        </g>

        {/* Band 3: Trusted Truth & Action */}
        <g id="band-action">
          <rect x="6" y="521" width="6" height="54" fill="#E8B059" />
          <text x="27" y="545" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Phase 0:</text>
          <text x="27" y="562" fill="#E8B059" fontFamily="Montserrat, sans-serif" fontSize="14">Trusted Truth &amp; Action</text>

          <rect x="293" y="521" width="1101" height="143" rx="16" fill="#262626" fillOpacity="0.5" />

          <line x1="435" y1="461" x2="435" y2="552" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />
          <text x="465" y="510" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12">Promote</text>

          <rect x="324" y="554" width="224" height="67" rx="8" fill="#444441" />
          <text x="436" y="582" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Materialization</text>
          <text x="436" y="603" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Rule-driven</text>

          <line x1="549" y1="588" x2="579" y2="588" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          <rect x="585" y="556" width="224" height="67" rx="8" fill="#444441" />
          <text x="697" y="584" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Trusted Events</text>
          <text x="697" y="605" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Normalized table</text>

          <line x1="810" y1="588" x2="845" y2="588" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          <rect x="850" y="558" width="224" height="67" rx="8" fill="#444441" />
          <text x="962" y="586" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Calendar Sync</text>
          <text x="962" y="607" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Idempotent upsert</text>

          <line x1="1075" y1="588" x2="1110" y2="588" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          <rect x="1115" y="558" width="251" height="67" rx="8" fill="#444441" />
          <text x="1240" y="586" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle">Google Calendar</text>
          <text x="1240" y="607" fill="#F5F5F5" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">Reminder</text>
        </g>

        {/* Provenance arc */}
        <g id="provenance-arc">
          <path d="M 697 556 V 540 H 1400 V 226 H 1204" fill="none" stroke="#CF9033" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arrow)" />
          <text x="1050" y="535" fill="#CF9033" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle">
            Provenance: every trusted row traces back to its source document
          </text>
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
