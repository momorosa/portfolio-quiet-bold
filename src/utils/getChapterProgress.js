export const RANGES = [
  { key: "xr",     start: 0.25, end: 0.46, mesh: "VR_Headset" },
  { key: "design", start: 0.46, end: 0.67, mesh: "Headphones" },
  { key: "dev",    start: 0.67, end: 0.88, mesh: "Rocket003" },
  { key: "ai",     start: 0.88, end: 1.00, mesh: "Notebook"  },
]

// Returns current chapter + normalized progress t within that chapter [0..1]
export function getChapterProgress(progress) {
  const p = Math.min(1, Math.max(0, progress ?? 0))
  for (let i = 0; i < RANGES.length; i++) {
    const r = RANGES[i]
    if (p >= r.start && p < r.end) {
      const t = (p - r.start) / (r.end - r.start)
      return { index: i, key: r.key, mesh: r.mesh, t }
    }
  }
  const last = RANGES[RANGES.length - 1]
  return { index: RANGES.length - 1, key: last.key, mesh: last.mesh, t: 1 }
}
