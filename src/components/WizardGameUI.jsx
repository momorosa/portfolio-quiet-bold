import { spells, useMagic } from "../hooks/useMagic.js"
import LabProjectOverlay from "./LabProjectOverlay.jsx"

export default function WizardGameUI() {
    const selected = useMagic((s) => s.spell)
    const setSpell = useMagic((s) => s.setSpell)
    const health   = useMagic((s) => s.health)
    const kills    = useMagic((s) => s.kills)
    const start    = useMagic((s) => s.start)
    const gameStatus = useMagic((s) => s.gameStatus)

    const isPlaying = gameStatus === "playing"
    const isOver = gameStatus === "gameover"
    const isWin = gameStatus === "win"

    return (
        <>
            {/* Header overlay (already absolute inside component) */}
            <LabProjectOverlay
                title="Wizard Game"
                date="October 2025"
                disclaimer="Best on laptop/desktop."
                homeLink="/"
                tech={["React","Three.js","R3F","drei","react-three/postprocessing","Vite","Tailwind","Zustand"]}
                credits={[
                    { label: "wawa-vfx from wawa sensei", href: "https://github.com/wass08/wawa-vfx" },
                    { label: "models (Wizard, Orc) from Quaternius", href: "https://quaternius.com/index.html" },
                    { label: "models (Archways) from Poly.Pizza", href: "https://poly.pizza/m/d6lqRR2TU0i" },
                    { label: "audio files from SoundEffectLab", href: "https://soundeffect-lab.info/sound/battle/" },
                ]}
            />

            {/* HUD */}
            <section className="fixed bottom-4 left-4 right-4 z-20 flex flex-col gap-4 max-w-4xl mx-auto font-primary">
                { isOver && (
                    <h1 className="text-4xl text-white text-center">💀 Game Over</h1>
                )}

                { isWin && (
                    <h1 className="text-4xl text-white text-center">🏆 You Win!</h1>
                )}

                {!isPlaying ? (
                    <button
                        onClick={start}
                        className="px-12 py-4 w-full rounded-lg cursor-pointer capitalize text-white bg-black/20 hover:bg-white/10 transition-colors"
                    >
                        { isOver || isWin ? "Play again" : "Play" }
                    </button>
                ) : (
                    <p className="text-3xl text-white">💀 {kills}</p>
                )}

                <div className="bg-white/30 rounded-lg overflow-hidden p-4 relative">
                    <div
                        className="absolute top-0 left-0 bottom-0 bg-red-600/90"
                        style={{ width: `${health}%` }}
                    />
                </div>

                <div className="w-full flex items-center justify-stretch gap-4">
                    {spells.map((s) => {
                        const isActive = selected?.name === s.name
                        return (
                            <button
                                key={s.name}
                                onClick={() => setSpell(s)}
                                title={s.name}
                                className={`p-4 w-full rounded-lg cursor-pointer capitalize text-white transition-colors ${
                                    isActive ? "bg-white/20" : "bg-black/20 hover:bg-white/10"
                                }`}
                            >
                                <span className="mr-2">{s.emoji}</span>
                                {s.name}
                            </button>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
