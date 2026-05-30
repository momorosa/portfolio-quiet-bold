export const chefClaudeContent = {
    title: "Chef Claude_: An AI-Powered Recipe Creator",
    description: "Cook smarter, not harder. An AI sous-chef that turns “what’s in my fridge?” into dinner you’ll actually make.",
    overview: "A solo, end-to-end build: a recipe assistant that takes the ingredients you actually have and returns a usable recipe with a generated hero image. I shipped it in about a few weeks (concept through deployed app) to work through what it really takes to design and ship a small AI product. The prompt craft, the production-side error handling, and the small UX choices that decide whether something feels finished.",
    roles:[
        "Product Design",
        "Front-End Development",
        "AI Integration",
        "Motion & Interaction Design",
        "LLM Prompt Design"
    ],
    buttonLabel: "Try Chef Claude_",
    buttonUrl: "https://claudeinary.vercel.app/",
    ctaCaption:"Live demo. Claude Haiku 4.5 + DALL·E 3. Real recipes, not a mockup.",
    backgroundImage:"/assets/recipe-bg.jpg",
    heroImage:"/assets/overview-img.jpg",
    context: {
        sectionTitle: "The Challenge",
        challenge: "Most people waste ingredients because they don’t know what to cook with what they already have. I wanted a small, honest product to answer that, and a chance to sit with the real questions of shipping an AI app. How do you keep the model’s output reliable enough to render? What happens when the API misbehaves? What does a hosted AI product actually cost you to maintain over time?",
    },
    stack:{
        sectionTitle: "Tech Stack",
        stack: [
            {
                icon: "devices",
                name: "UI",
                techStack: "React, Tailwind CSS, React Three Fiber + Drei (3D scene), Framer Motion (animations)",
                svg:"/assets/uiLogos.svg",
            },
            {
                icon: "memory",
                name: "AI Layer",
                techStack: "Anthropic Claude Haiku 4.5 (recipe generation, structured JSON) + OpenAI DALL·E 3 (hero images)",
                svg:"/assets/aiLogos.svg",
            },
            {
                icon: "web",
                name: "Data Handling",
                techStack: "localStorage (favorites persistence, no backend, no auth)",
                svg:"/assets/browser-logos.svg",
            },
            {
                icon: "rocket_launch",
                name: "Deployment",
                techStack: "Vercel (Git-based CI/CD, serverless API routes)",
                svg:"/assets/deployment.svg",
            },           
        ],
    },
    designChallenges: {
        sectionTitle: "Design Highlights",
        challenges: [
            {
                subTitle: "Designing with AI",
                decisions: [
                   {
                        "name": "A system prompt that returns something you can render",
                        "content": "I wrote Claude’s system prompt as a friendly, slightly cheeky sous-chef and constrained the output to a fixed JSON shape (title, ingredients, steps, description, image_prompt). The prompt explicitly forbids markdown and extra keys, but in practice models still wrap JSON in code fences sometimes, so the API route strips fences defensively before parsing. That belt-and-suspenders pattern is the difference between a demo that works on stage and one that works on a Tuesday."
                   },
                   {
                        "name": "Choosing a model tier on purpose, then adapting when it changed",
                        "content": "Claude Haiku 4.5 is the cheap, fast tier, which is appropriate for a constrained recipe task that doesn't need deeper reasoning. The image model story is messier. I originally chose DALL·E 3 over GPT-Image-1 because it returned a URL, which fit the no-backend architecture and let users save unlimited favorites in localStorage cheaply. When OpenAI deprecated DALL·E 3 in May 2026, the replacement (gpt-image-2) returns base64, which would have blown out localStorage after about five saves. I moved image hosting to Vercel Blob so the API still returns a URL and the favorites architecture stays intact. The lesson: decisions that lean on a vendor's response format can fail without notice."
},
                   {
                        "name": "Playful error handling for inedible inputs",
                        "content": "If someone types something absurd like “rubber duck” or “car keys,” the prompt tells Claude to acknowledge it with a bit of humor and still return a valid recipe using only the edible items. The model handles the edge case in voice, the JSON contract stays intact."
                   },
                   {
                        "name": "Graceful degradation for expired image URLs",
                        "content": "DALL·E URLs expire after about a day, which would otherwise make saved favorites look broken. The favorite cards fall back to a placeholder image on load failure, and the UI honestly tells the user images are cached for ~24h. Better to communicate the constraint than pretend it isn’t there."
                   },
                ],
                gif: "/assets/systemPrompt.png",
            },
            {
                subTitle: "Building Delight",
                decisions: [
                   {
                        "name": "A unique 3D landing experience",
                        "content": "A floating cheese scene built in React Three Fiber sets the tone before the user types anything. The choice was less about showing off WebGL and more about signalling that this isn’t another chatbot wrapper."
                   },
                   {
                        "name": "Witty loading states",
                        "content": "Phrases like “Whisking together the data sauce…” turn a moment of waiting into a small moment of personality."
                   },
                   {
                        "name": "Zero-friction input",
                        "content": "The ingredient box auto-focuses on load so users start typing immediately, no extra click."
                   },
                   {
                        "name": "Accessibility and keyboard support",
                        "content": "The ingredients list uses aria-live so screen readers announce additions. Interactive controls have aria-labels. The favorite-toggle is keyboard-operable, and the recipe modal supports Escape to close and click-outside dismissal. None of this is visible, which is the point."
                   },
                   {
                        "name": "Micro-interactions",
                        "content": "Subtle Framer Motion animations on the favorite cards and transitions give the app a finished feel without getting in the way."
                   },
                ],
                gif:"/previews/chefClaude-low.gif",
            },
            {
                subTitle: "MVP Architecture Choices",
                decisions: [
                    {
                        "name": "localStorage for favorites, no backend",
                        "content": "Favorites persist locally, which is good enough for a single-device prototype. No auth flow to design, no database to operate. The right answer for proving the AI loop works."
                    },
                    {
                        "name": "Scoping out what didn’t need to exist yet",
                        "content": "I deliberately left out user accounts, cloud sync, a real database, and image caching infrastructure. The goal was to prove the AI loop and the UX, not to build a SaaS. Naming what isn’t in scope is part of designing for a deadline."
                    },
                    {
                        "name": "Serverless API routes as the boundary",
                        "content": "The Claude and DALL·E calls live in Vercel serverless functions, not the client, so API keys stay server-side. The endpoints return clean HTTP status codes (400 for bad input, 502 if the upstream model returns nothing usable, the original status code passed through when OpenAI errors) so the front end can fail visibly instead of silently."
                    },
                ],
                gif:"/assets/local-storage.jpg",
            }       
        ]
    },
    uxFlow: {
        sectionTitle: "How It Works",
        steps: [
            {
                stepTitle: "01 Start typing",
                icon: "keyboard",
                step: "The input auto-focuses so you can begin immediately, no extra clicks needed.",
            },
            {
                stepTitle: "02 Get your recipe",
                icon: "restaurant",
                step: "Ingredients go to Claude, which returns a structured recipe plus a short image prompt. That image prompt feeds DALL·E 3, and both come back as a single recipe object the UI can render.",
            },
            {
                stepTitle: "03 Save to favorites",
                icon: "favorite",
                step: "Recipes persist locally as interactive cards, with graceful fallbacks for the inevitable day the cached image URL expires.",   
            }
        ],
        vid:"",
    },    
    outcome: {
        sectionTitle: "Outcome & Early Validation",
        outcomes: [
            {
                icon:"rocket_launch",
                title: "Live",
                description:"A deployed app that turns pantry inputs into a recipe and a hero image in seconds, with the production-side details actually wired up. Not a Figma flow pretending to work.",
            },
            {
                icon:"thumb_up_alt",
                title: "Tried by real people",
                description:"A handful of friends and family used it over its first week. The witty loading states and the model’s handling of absurd ingredients (the rubber duck case) were the moments that consistently got a reaction. Useful signal that voice and edge-case behavior matter as much as the core flow.",
            },
            {
                icon:"build",
                title: "Maintenance is part of the work",
                description:"Hosted AI apps aren't set-and-forget. DALL·E 3 was deprecated in May 2026, which broke the URL-based storage I'd designed around. I migrated to gpt-image-2 and added Vercel Blob to keep the favorites architecture working. A separate platform security incident also meant rotating API keys. Maintaining a small live AI product is itself a useful lesson for anyone building bigger ones.",
        },
            {   
                icon:"route",
                title: "End-to-end, intentionally small",
                description:"The point wasn’t to build something ambitious. It was to go from idea to deployed app alone, learn where the real friction sits in a small AI product, and have something live I can keep tending.",
            },
        ],
    },
    closing: {
        sectionTitle: "Why It Matters",
        lessons: [
            "Chef Claude_ is a small product, and on purpose. The interesting part isn’t the recipes. It’s everything around them: a constrained system prompt, defensive parsing for when the model ignores instructions, honest UI about the constraints of free-tier image hosting, and a build scoped tight enough to actually ship.",
            "More people can build prototypes like this now, and that’s the point. The skill that still matters is judgment. What to leave out, what to be honest about, where to spend the extra hour. That’s what I was practicing here."
        ]
    }      
}