import clsx from "clsx"

/**
 * PhaseDiagram — Reusable, data-driven pipeline flow diagram.
 *
 * Features:
 *   - Linear flow (nodes left → right)
 *   - Branching (vertical fan-out from main flow)
 *   - Output nodes (endpoint fan-out, e.g. tool APIs)
 *   - Feedback loop arrow
 *   - Full-width breakout from narrow text containers
 */

function ArrowSvg({ className = "" }) {
  return (
    <svg
      viewBox="0 0 32 12"
      fill="none"
      className={clsx("shrink-0", className)}
      aria-hidden="true"
    >
      <line
        x1="0" y1="6" x2="26" y2="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <polygon points="26,2 32,6 26,10" fill="currentColor" />
    </svg>
  )
}

function ArrowDown({ className = "" }) {
  return (
    <svg
      viewBox="0 0 12 28"
      fill="none"
      className={clsx("shrink-0", className)}
      aria-hidden="true"
    >
      <line
        x1="6" y1="0" x2="6" y2="22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <polygon points="2,22 6,28 10,22" fill="currentColor" />
    </svg>
  )
}

function DiagramNode({ title, subtitle, highlight = false, variant = "default", icon }) {
  const variants = {
    default: highlight
      ? "border-yellow-mellow/50 bg-yellow-mellow/8"
      : "border-white/15 bg-white/5",
    success: "border-emerald-400/30 bg-emerald-400/8",
    warning: "border-yellow-mellow/30 bg-yellow-mellow/8",
    danger: "border-red-400/30 bg-red-400/8",
    accent: "border-yellow-mellow/50 bg-yellow-mellow/10",
  }

  return (
    <div
      className={clsx(
        "flex flex-col justify-center rounded-lg border px-4 py-3 md:px-5 md:py-4 text-center min-w-[130px] md:min-w-[160px]",
        variants[variant] || variants.default
      )}
    >
      {icon && (
        <span className="text-base mb-1">{icon}</span>
      )}
      <p className="text-sm md:text-[0.9375rem] font-medium text-white leading-snug">
        {title}
      </p>
      {subtitle && (
        <p className="text-xs md:text-[0.8125rem] text-zinc-400 mt-1 leading-snug">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default function PhaseDiagram({
  phaseLabel,
  phaseTitle,
  nodes = [],
  branches,
  feedbackLoop,
  inputLabel,
  outputLabel,
  outputNodes,
  fullWidth = true,
  className = "",
}) {
  return (
    <div
      className={clsx(
        fullWidth && "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-6 md:px-10",
        className
      )}
    >
      <div
        className={clsx(
          "mx-auto rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8 lg:p-10 overflow-x-auto",
          fullWidth ? "max-w-[1120px]" : ""
        )}
        role="img"
        aria-label={`${phaseLabel}: ${phaseTitle} pipeline diagram`}
      >
        {/* Phase label */}
        <div className="flex items-start gap-3 mb-6 md:mb-8">
          <div className="w-[3px] h-10 bg-yellow-mellow rounded-full shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-mellow tracking-wide">{phaseLabel}</p>
            <p className="text-base md:text-lg text-white font-medium">{phaseTitle}</p>
          </div>
        </div>

        {/* Pipeline flow */}
        <div className="flex items-center gap-2 md:gap-3 min-w-max">
          {inputLabel && (
            <>
              <p className="text-xs text-zinc-500 max-w-[80px] text-center leading-tight shrink-0">
                {inputLabel}
              </p>
              <ArrowSvg className="w-7 md:w-8 text-zinc-500" />
            </>
          )}

          {nodes.map((node, i) => (
            <div key={i} className="flex items-center gap-2 md:gap-3">
              {i > 0 && <ArrowSvg className="w-7 md:w-8 text-zinc-500" />}
              <DiagramNode
                title={node.title}
                subtitle={node.subtitle}
                highlight={node.highlight}
                variant={node.variant}
                icon={node.icon}
              />
            </div>
          ))}

          {outputLabel && (
            <>
              <ArrowSvg className="w-7 md:w-8 text-zinc-500" />
              <p className="text-xs text-zinc-500 max-w-[80px] text-center leading-tight shrink-0">
                {outputLabel}
              </p>
            </>
          )}
        </div>

        {/* Branching — vertical fan-out from main flow */}
        {branches && (
          <div className="mt-4 flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <ArrowDown className="w-3 h-6 text-zinc-500" />
              <div className="flex gap-3 md:gap-4">
                {branches.map((branch, i) => (
                  <DiagramNode
                    key={i}
                    title={branch.title}
                    subtitle={branch.subtitle}
                    variant={branch.variant}
                    icon={branch.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Output nodes — endpoint fan-out (e.g. external tool APIs) */}
        {outputNodes && (
          <div className="mt-4 flex justify-end pr-4">
            <div className="flex flex-col gap-2">
              {outputNodes.map((node, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <ArrowSvg className="w-7 md:w-8 text-zinc-500" />
                  <DiagramNode
                    title={node.title}
                    subtitle={node.subtitle}
                    variant={node.variant}
                    icon={node.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback loop */}
        {feedbackLoop && (
          <div className="mt-3 md:mt-4 flex justify-center">
            <div className="flex items-center gap-2 text-zinc-500">
              <svg viewBox="0 0 200 24" fill="none" className="w-40 md:w-52" aria-hidden="true">
                <path
                  d="M 10 4 L 190 4 L 190 18 L 10 18"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                  fill="none"
                />
                <polygon points="10,14 4,18 10,22" fill="currentColor" />
              </svg>
              <span className="text-xs whitespace-nowrap">{feedbackLoop.label}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}