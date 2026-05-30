import { create } from "zustand"
import { MathUtils, Vector3 } from "three"

export const spells = [
    {
        name: "void",
        emoji: "🪄",
        duration: 1000,
        damage: 50,
        colors: ["#d1beff", "white"],
    },
    {
        name: "ice",
        emoji: "❄️",
        duration: 500,
        damage: 40,
        colors: ["skyblue", "white"],
    },
    {
        name: "fire",
        emoji: "🔥",
        duration: 500,
        damage: 40,
        colors: ["orange", "red"],
    },
]

const generateOrc = (i) => ({
    id: `orc-${i}`,
    health: 100,
    position: new Vector3(MathUtils.randFloatSpread(2), 0, MathUtils.randFloat(-30, -20)),
    speed: MathUtils.randFloat(0.9, 2.4),
    animation: "CharacterArmature|Walk",
    lastAttack: 0,
    lockedUntil: 0,
})

export const useMagic = create((set, get) => {

    let castingTimeout

    return {
        // pacing knobs
        spawnIntervalMs: 4000,
        maxOrcs: 30,
        baseSpeed: 0.7,
        difficultyRamp: 0.0,

        // State
        isCasting: false,
        spell: spells[0],
        casts: [],
        gameStatus: "idle",         // "idle" | "playing" | "gameover" | "win"
        kills: 0,
        health: 100,
        orcs: [],
        lastSpawn: 0,

        // Actions
        setSpell: (spell) => set({ spell }),

        addSpell: (payload) => {
            const id = `${Date.now()}-${MathUtils.randInt(0, 100)}-${get().casts.length}`
            const cast = {
                id,
                time: Date.now(),
                ...payload,
            }
            set((state) => ({ 
                isCasting: true,
                casts: [ ...state.casts, cast ]
            }))

            // remove VFX after it lingers
            const linger = 4000
            setTimeout(() => {
                set((state) => ({
                    casts: state.casts.filter((cast) => cast.id !== id)
                }))
            }, (payload?.duration ?? 0) + linger)

            // apply damage when the cast compeltes
            const dmg = payload?.damage ?? 40
            setTimeout(() => {
                get().orcs.forEach((orc) => {
                    if (orc.health <= 0) return
                    if (orc.position.distanceTo(payload.position) < 1 && orc.health > 0) {
                        orc.health = Math.max(0, orc.health - dmg)
                        orc.animation = "CharacterArmature|HitReact"
                        orc.lockedUntil = Date.now() + 800
                        if (orc.health === 0) {
                            set((state) => {
                                const newKills = state.kills + 1
                                const didWin = newKills >= state.maxOrcs

                                return {
                                    kills: newKills,
                                    gameStatus: didWin ? "win" : state.gameStatus,
                                }
                            })
                            orc.animation = "CharacterArmature|Death"
                            orc.health = 0

                            setTimeout(() => {
                                if(get().gameStatus !== "win") {
                                    orc.position.z = MathUtils.randFloat(-30, -20)
                                }
                            }, 1000)
                        }
                    }
                })
            }, payload?.duration ?? 0)

            clearTimeout(castingTimeout)
            castingTimeout = setTimeout(() => {
                set(() => ({
                    isCasting: false,
                }))
            }, payload?.duration ?? 0)
        },

        start: () => {
            set((state) =>({
                orcs: [],
                gameStatus: "playing",
                health: 100,
                kills: 0,
                lastSpawn: Date.now() - state.spawnIntervalMs,
                difficultyRamp: 0,
            }))
        },
        update: (delta) => {
            if (get().gameStatus !== "playing") return

            if (get().health <= 0) {
                set(() => ({
                    gameStatus: "gameover",
                    orcs:[],
                }))
                return
            }

            // ramp with kills
            const ramp = Math.min(1, get().kills * 0.02)
            if (ramp !== get().difficultyRamp) set({ difficultyRamp: ramp })
            

            //  spawn slower & fewer
            const now = Date.now()
            if (get().lastSpawn < now - get().spawnIntervalMs && get().orcs.length < get().maxOrcs) {
                set((state) => ({
                    orcs: [...state.orcs, generateOrc(state.orcs.length)],
                    lastSpawn: now,
                }))
            }

            const { baseSpeed, difficultyRamp } = get()
            get().orcs.forEach((orc) => {
                if (orc.health <= 0) return

                // respect hit-lock
                if (orc.lockedUntil > now) return
                orc.animation = "CharacterArmature|Walk"

                // start attacking when close enough
                const WIZARD_Z = 4
                const ATTACK_RADIUS = 0.4
                const CREEP_RADIUS = 1.5
                const attackZ = WIZARD_Z - ATTACK_RADIUS
                const creepZ = WIZARD_Z - CREEP_RADIUS
                
                // far to normal walk
                if (orc.position.z < creepZ) {
                    const v = delta * baseSpeed * orc.speed * (1 + difficultyRamp)
                    orc.position.z += v
                    orc.lastAttack = now
                } else if (orc.position.z < attackZ) {
                    // creep the last meters even slower
                    const v = delta * baseSpeed * 0.4 * (1 + difficultyRamp)
                    orc.position.z += v
                } else {
                    // attack cadence
                    orc.position.z = attackZ
                    orc.animation = "CharacterArmature|Weapon"
                    if (orc.lastAttack < now - 1200) {
                        orc.lastAttack = now
                        set((state) => ({
                            health: Math.max(0, state.health - 10)
                        }))
                    }
                }
            })
        }
    }
})