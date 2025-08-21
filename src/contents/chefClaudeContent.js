export const chefClaudeContent = {
    title: "Chef Claude_ AI-Powered Recipe Creator",
    description: "Cook smarter, not harder: an AI sous-chef that turns “what’s in my fridge?” into dinner you’ll actually make.",
    overview: "I designed and built a high-fidelity AI recipe creator that personalizes meals from real pantry inputs, combining LLM prompt craft, thoughtful UX, motion design, and production-ready front-end. This was a solo, end-to-end project shipped in 2 weeks, demonstrating my ability to own the entire lifecycle of an AI prototype.",
    roles:[
        "Product Design",
        "Front-End Development",
        "AI Integration",
        "Motion & Interaction Design",
        "LLM Prompt Design"
    ],
    buttonLabel: "Try Chef Claude_",
    buttonUrl: "https://claudeinary.vercel.app/",
    ctaCaption:"Live demo powered by Claude + DALL·E, real recipes, not a mockup.",
    backgroundImage:"../../src/assets/recipe-bg.jpg",
    heroImage:"../../src/assets/overview-img.jpg",
    context: {
        sectiontTitle: "The Challenge",
        challenge: "Most people waste ingredients because they don’t know what to cook with what they already have. My goal was to create an AI-powered experience that turns leftover or available ingredients into usable, appealing recipes in seconds — while also proving my ability to design, build, and ship an AI prototype from scratch.",
    },
    stack:{
        sectionTitle: "Tech Stack",
        stack: [
            {
                icon: "devices",
                name: "UI",
                techStack: "React, Tailwind CSS, React Three Fiber + Drei (3D scene), Framer Motion (animations)",
                svg:"../../src/assets/uiLogos.svg",
            },
            {
                icon: "memory",
                name: "AI Layer",
                techStack: "Anthropic Claude API (recipe generation via prompt engineering) + OpenAI DALL·E 3 (recipe images))",
                svg:"../../src/assets/aiLogos.svg",
            },
            {
                icon: "web",
                name: "Data Handling",
                techStack: "LocalStorage (favorites persistence, no backend)",
                svg:"../../src/assets/browser-logos.svg",
            },
            {
                icon: "rocket_launch",
                name: "Deployment",
                techStack: "Vercel (Git-based CI/CD)",
                svg:"../../src/assets/deployment.svg",
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
                        "name": "Custom prompt design",
                        "content": "I wrote a system prompt for Claude to act as a friendly,    slightly cheeky sous-chef. It returned structured JSON (title, ingredients, steps, description, image prompt) — ensuring usable outputs    instead of freeform text."
                   },
                   {
                        "name": "Edge cases handled playfully",
                        "content": "If someone typed “rubber duck” or “car keys,” Claude    responded with humor but still generated a valid recipe using edible inputs."
                   },
                   {
                        "name": "Image generation trade-off",
                        "content": "I tested GPT-Image-1 for realism but storing base64 images  was too heavy. For MVP, I chose DALL·E 3, which returned lightweight URLs, enabling unlimited favorites in localStorage."
                   },       
                ],
                gif: "../../src/assets/systemPrompt.png",
            },
            {
                subTitle: "Building Delight",
                decisions: [
                   {
                        "name": "Unique landing page",
                        "content": "Instead of a generic chatbot interface, I designed a 3D landing experience using React Three Fiber to set the tone."
                   },
                   {
                        "name": "Witty loading states",
                        "content": "(“Whisking together the data sauce…”) turned waiting time into moments of delight."
                   },
                   {
                        "name": "Zero-friction input",
                        "content": "The ingredient box auto-focuses so users can start typing immediately."
                   },       
                   {
                        "name": "Micro-interactions",
                        "content": "Subtle Framer Motion animations and favorite-card interactions brought polish and personality."
                   },       
                ],
                gif:"",
            },
            {
                subTitle: "MVP Architecture Choices",
                decisions: [
                    {
                        "name": "LocalStorage for persistence",
                        "content": "To move fast without infrastructure overhead, I implemented localStorage persistence for favorites. This gave users continuity without requiring a backend, striking the right balance for a rapid prototype."
                    },
                ],
                gif:"",
            }       
        ]
    },
    uxFlow: {
        sectionTitle: "Introducing Chef Claude_",
        steps: [
            {
                stepTitle: "01 Start typing",
                icon: "keyboard",
                step: "Input auto-focus means no extra click.",
            },
            {
                stepTitle: "02 Get your recipe",
                icon: "restaurant",
                step: "Claude generates a structured recipe + witty description while DALL·E 3 creates a visual.",
            },
            {
                stepTitle: "03 Save to favorites",
                icon: "favorite",
                step: "Recipes persist locally in interactive cards, allowing you to revisit them anytime.",   
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
                description:"Live, functional app that transforms pantry inputs into recipes with appealing visuals and polished UX.",
            },
            {
                icon:"thumb_up_alt",
                title: "Validated",
                description:"Tested with 8 early users (friends & family) → 50+ recipes generated in the first week. Feedback highlighted delight in witty loading states, humorous handling of non-edibles, and the ability to save unlimited favorites.",
            },
            {
                icon:"route",
                title: "End-to-End",
                description:"Demonstrates my ability to design, prototype, and ship AI-powered products end-to-end.",
            },
            {
                icon:"tips_and_updates",
                title: "Blueprint",
                description:"Serves as a rapid prototyping model for future AI concepts, bridging product design, engineering constraints, and user delight.",
            },
        ],
    },
    closing: {
        sectionTitle: "Why it matters",
        lessons: [
            "Chef Claude isn’t just a recipe app. It’s proof that I can translate an idea into a working AI-powered product, from UX concept to AI interaction design to live deployment, and validate it with real users. ",
            "Leveraging AI and managed services supercharges creative technologists like me: I can prototype quickly, validate ideas, and still deliver a polished experience — all without getting bogged down in infrastructure."
        ]
    }      
}
