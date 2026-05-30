export const lostPrinceContent = {
    title: "The Search for The Lost Prince: Classic Literature as a VR Puzzle Adventure",
    overview:
        "A VR puzzle adventure that reimagines The Little Prince as an immersive XR experience, blending narrative, puzzles, and atmosphere to spark curiosity and reflection in young adults.",
    roles: [
        "Game & Narrative Designer",
        "XR Interaction Designer",
        "Technical Artist & Level Designer",
        "Unity Developer (C#)"
    ],
    backgroundImage: "/assets/lost-prince/lostPrince-img01.jpg",
    video: "/previews/lost-prince.mp4",
    quote: {
        text: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
        author: "Antoine de Saint-Exupéry"
    },
    context: {
        sectionTitle: "Overview",
        items:[
            {
                title: "My Role",
                content: "Solo Developer & Designer (End-to-End)"
            },
            {
                title: "Project Duration",
                content: "3 months (Concept → Playable Prototype)"
            },
            {
                title: "Platform",
                content: "VR / Extended Reality (XR)"
            },
            {
                title: "Engine",
                content: "Unity / C#"
            },
            {
                title: "Genre",
                content: "Narrative Puzzle Adventure"
            },
            {
                title: "Target Audience",
                content: "Young Adults, Narrative Enthusiasts, Educators"
            },
            {
                title: "Focus",
                content:
                "Non-linear storytelling, environmental storytelling, and experiential learning"
            }
        ]
    },
    challenge: {
        sectionTitle: "The Challenge",
        challenge:
            "Transform a quiet, reflective classic into an emotionally resonant, interactive XR experience, keeping its philosophical depth while giving players agency through exploration and puzzles."
    },
    contribution: {
        sectionTitle: "My Contributions",
        description:
            "This was a solo lab project. I owned the full pipeline from early sketches to a working VR prototype, combining design, art direction, and engineering.",
        keyResponsibilities: [
            {
                icon: "lightbulb",
                name: "Concept & Design",
                responsibilities:
                    "Defined the core experience, mapped non-linear story flows, sketched puzzle interactions, and iterated     on moment-to-moment gameplay."
            },
            {
                icon: "palette",
                name: "Art Direction & Atmosphere",
                responsibilities:
                    "Selected and composed 3D environments, crafted lighting and staging, and curated soundscapes to create     a cohesive, dreamlike tone."
            },
            {
                icon: "head_mounted_device",
                name: "Engineering",
                responsibilities:
                    "Built the prototype in Unity with custom systems for interactive storytelling, magical scene       transitions, and state-driven narrative events."
            }
        ]
    },
    images: [
        {
            src: "/assets/lost-prince/Conceptualization.jpg",
            caption: "Initial ideation combining narrative mapping, environment planning, and interaction design. Each sketch captures how literary moments from The Little Prince evolve into VR scenes, puzzle objectives, and player-driven pathways."
        },
        {
            src: "/assets/lost-prince/MoodBoard.jpg",
            caption: "A visual foundation blending Saint-Exupéry’s original illustrations with warm, whimsical world-building references. This mood board defined the project’s artistic direction—anchoring color, lighting, and environment design in a balance of nostalgia and modern XR storytelling."
        },
        {
            src: "/assets/lost-prince/lostPrince-img01.jpg",
            caption: "The Aviator’s Study built in Unity: a fully hand-assembled environment combining curated low-poly assets, custom lighting, and narrative-driven props. The space introduces players to the world through environmental storytelling rather than text or UI."
        },
        {
            src: "/assets/lost-prince/lostPrince-img02.jpg",
            caption: "A closer look at the interactive workspace where objects, notes, and framed illustrations signal puzzle cues and story context. Every prop is intentionally placed to support narrative discovery and guide player attention through subtle environmental hints."
        },
        {
            src: "/assets/lost-prince/AsteroidB612.jpg",
            caption: "A stylized floating island built to reinterpret the Prince’s tiny planet as an explorable VR environment. Modular geometry, atmospheric VFX, and layered skyboxes work together to create a sense of scale and solitude while maintaining the story’s dream-like tone."
        },
        {
            src: "/assets/lost-prince/Instruction.jpg",
            caption: "Diegetic onboarding designed directly into the environment. Instead of overlay UI, interaction tips are presented as an in-world reference sheet, teaching movement and actions through narrative-friendly props. This approach keeps immersion intact while giving players the guidance they need inside the Aviator’s Study."
        },
        {
            src: "/assets/lost-prince/LostPrince-S01.jpg",
            caption: "The title screen is staged as part of the story: the Aviator’s crashed plane in the Sahara desert, the moment he first meets the Little Prince. Instead of a flat menu, the start space becomes a narrative entry point—grounding players in the world and setting the tone for a seamless transition from story to experience."
        },

    ],
    systems: {
        sectionTitle: "Key Systems & Technical Highlights",
        description:
            "Under the hood, a set of custom systems ties narrative beats, player state, and visuals into one cohesive XR experience.",
        systemDesign: [
            {
                subTitle: "Orchestrating Interactive Storytelling with AI & Unity",
                description:
                    "A lightweight narrative system coordinates branching story moments with the player’s progress, letting exploration and choice drive pacing.",
                decisions: [
                    {
                        name: "Narrative System:",
                        description:
                            "Used C# scripts and Unity Timeline to chain multi-step sequences—dialogue, camera moves, and environmental changes—into reusable narrative blocks."
                    },
                    {
                        name: "State-Driven Events:",
                        description:
                            "Tracked player state (puzzles solved, key objects inspected) to trigger the right Timeline clips, ensuring the story responds gracefully to different play orders."
                    }
                ],
                results:
                    "Multiple ‘forks in the road’ lead into shared narrative moments, keeping the story flexible without    losing structure.",
                vid: ""
            },
            {
                subTitle: "Crafting Seamless Magical Transitions",
                description:
                    "To preserve the dreamlike flow, I built a reusable transition system that hides technical scene loading behind narrative-friendly visuals.",
                decisions: [
                    {
                        name: "Custom Transition Method:",
                        description:
                            "Created a public C# method to initiate scene transitions, coordinating fade effects, Timeline events, and scene loading in one call."
                    },
                    {
                        name: "Visual & Audio Cues:",
                        description:
                            "Layered custom VFX and SFX (light flashes, object motion, ambient swells) so environments feel       like they transform around the player instead of hard-cutting to a new scene."
                    }
                ],
                results:
                  "Scene changes feel like part of the story’s magic rather than a technical interruption.",
                vid: ""
            },
            {
                subTitle: "Environmental Narratology",
                description:
                    "The environment acts as a narrative surface—every meaningful object is tied to story context, not just interaction for interaction’s sake.",
                decisions: [
                    {
                        name: "Narrative Blueprint:",
                        description:
                            "Designed a ‘story layer’ where objects and hotspots change relevance based on player progress, encouraging slow exploration and discovery instead of waypoint chasing."
                    }
                ],
                results:
                    "Exploration becomes the primary way players uncover the themes and emotional beats of the story.",
                vid: ""
            }
        ],
    },
    future: {
        sectionTitle: "Future Improvements",
        description:
            "If given more time, I would expand this prototype into a fully playable game. Players would explore a series of planets, meeting characters like the King, the Lamplighter, the Businessman, and the Drunkard. Each world would offer a unique challenge and a meaningful clue that brings them one step closer to finding the Little Prince. I’d deepen the branching structure, introduce richer diegetic UI, and enhance AI-driven behaviors so puzzles, dialogue, and narrative pacing adapt fluidly to each player’s journey."
    }
}
