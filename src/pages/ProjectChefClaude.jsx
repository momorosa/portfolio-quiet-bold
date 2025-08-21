import { chefClaudeContent } from "../contents/chefClaudeContent.js"
import Button from "../components/Button.jsx"
import Footer from "../components/Footer.jsx"

const content = chefClaudeContent;

export default function ProjectChefClaude() {
    return (
        <main className="text-white font-primary overflow-x-hidden bg-black">
            {/* HERO Section */}
            <section className="relative min-h-[90svh] h-screen pb-32 md:pb-48">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed mask-alpha mask-b-from-black mask-b-from-50% mask-b-to-transparent"
                    style={{ backgroundImage: `url(${content.backgroundImage})` }}
                    aria-hidden="true"
                />
                {/* Dark overlay (tint) */}
                <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

                {/* Content */}
                <div className="relative z-10 max-w-[1120px] mx-auto h-full px-6 md:px-10 py-16 flex flex-col md:flex-row md:items-center gap-10">

                    {/* Left: Title / Copy / CTA */}
                     <div className="md:w-1/2 mt-10">
                        <h1 className="text-4xl md:text-6xl font-semibold md:leading-[1.2]">
                            {content.title}
                        </h1>
                        <p className="text-2xl mt-6">{content.description}</p>
                        <Button
                            id="btn"
                            href={content.buttonUrl}
                            className="w-64 font-medium text-black bg-yellow-mellow px-5 py-3 mt-8"
                            aria-label={content.buttonLabel}
                            rightIcon="restaurant"
                            iconSize="md-18"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {content.buttonLabel}
                        </Button>
                        <p className="text-zinc-400 italic mt-3">{content.ctaCaption}</p>
                    </div>

                    {/* Right: Roles list (translucent panel) */}
                    <div className="md:w-1/2 md:pl-10">
                        <div className="p-6">
                            <ul className="text-xl">
                                {content.roles.map((role, index) => (
                                    <li key={index} className="py-4 border-b border-white/20 last:border-0">
                                        {role}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Img Section */}
            <div className="absolute left-1/2 bottom-0 z-20 w-full max-w-[1120px] px-6 md:px-10 -translate-x-1/2 translate-y-4/5">
                <div className="rounded">
                     <img 
                        src={ content.heroImage } 
                        alt="Chef Claude app screenshot"
                        className="w-full shadow-lg" 
                    />
                </div>
            </div>

            {/* Overview Section */}
            <section className="mt-60 pt-40 md:pt-120 h-screen bg-black">
                <div className="max-w-[1120px] mx-auto px-6 py-16">
                    <div className="w-8 h-[8px] bg-yellow-mellow mb-4"></div>
                    <h2 className="text-4xl font-semibold mb-6">
                        { content.context.sectiontTitle }
                    </h2>
                    <p className="text-xl text-zinc-200 leading-[1.75]">{content.context.challenge}</p>
                </div>
            </section>

            {/* UX Flow Section */}
            <section className="flex bg-warm-gray-dark min-h-svh">
                <div className="max-w-[1120px] mx-auto my-auto px-6 md:px-10 flex flex-col">
                    <div className="w-8 h-[8px] bg-yellow-mellow mb-4"></div>
                    <h2 className="text-4xl font-semibold mb-8">
                        { content.uxFlow.sectionTitle }
                    </h2>
                    <div className="flex flex-row justify-between gap-10">
                        <div className="flex flex-col w-1/3">
                            { content.uxFlow.steps.map((step, index) => (
                                <div key={index} className="bg-black rounded mb-4 p-6">
                                    <span className="material-icons text-yellow-mellow-light">
                                        {step.icon}
                                    </span>
                                    <h3 className="text-2xl mb-4 flex items-center">
                                        {step.stepTitle}
                                    </h3>
                                    <p className="text-zinc-400">{step.step}</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-2/3">
                            //An image or vid
                        </div>
                    </div>
                </div>
            </section>

            {/* Design Highlights Section */}
            <section className="pt-20 bg-warm-gray">
                <div className="max-w-[1120px] mx-auto px-6 md:px-10 flex flex-col">
                    <div className="w-8 h-[8px] bg-yellow-mellow mb-4"></div>
                    <h2 className="text-4xl font-semibold mb-6">
                        { content.designChallenges.sectionTitle }
                    </h2>
                    <div className="mb-10">
                        <div className="flex flex-col w-1/2 gap-10">
                        {/* <div className="flex flex-row justify-between"> */}
                            {content.designChallenges.challenges.map((challenge, index) => (
                                <div key={index} className="">
                                    <h3 className="text-2xl font-semibold mb-6 text-yellow-mellow-light">{challenge.subTitle}</h3>
                                    {challenge.decisions.map((decision, idx) => (
                                        <div key={idx} className="mb-4">
                                            <h4 className="text-xl font-medium pb-4">{decision.name}</h4>
                                            <p className="text-zinc-400 leading-[1.75]">{decision.content}</p>
                                        </div>                             
                                    ))}
                                </div>
                            ))}                 
                        </div>
                    </div>
                </div>
            </section>

            {/* Stack Section */}
            <section className="py-20 bg-warm-gray-dark">
                <div className="max-w-[1120px] mx-auto px-6 md:px-10  flex flex-col">
                    <div className="w-8 h-[8px] bg-yellow-mellow mb-4"></div>
                    <h2 className="text-4xl font-semibold mb-8">
                        { content.stack.sectionTitle }
                    </h2>
                    <div className="flex justify-between gap-6">
                    { content.stack.stack.map((item, index) => (
                        <div key={index} className="w-1/2 p-4 md:pt-6 rounded-xl bg-gradient-to-br from-gray-500/10 to-amber-300/10 font-light backdrop-blur-md border border-white/20 text-white gap-4 flex flex-col mb-6">
                            <span className="material-icons text-yellow-mellow-light mb-2">
                                {item.icon || "code"}
                            </span>
                            <h3 className="text-3xl md:text-3xl">{item.name}</h3>
                            <p className="text-zinc-300">{item.techStack}</p>
                            <div>
                                <img
                                    src={ item.svg } 
                                    alt="logos of the technologies used"
                                    className="w-full h-[32px] mt-4"
                                />
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </section>

            {/* Outcome Section */}
            <section className="flex bg-warm-gray min-h-svh">
                <div className="max-w-[1120px] mx-auto my-auto px-6 md:px-10 ">
                    <div className="w-8 h-[8px] bg-yellow-mellow mb-4"></div>
                    <h2 className="text-4xl font-semibold mb-8">
                        { content.outcome.sectionTitle }
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:pr-40">
                        { content.outcome.outcomes.map((item,index) =>(
                            <div key={index} className="p-4 md:pt-10 rounded-xl bg-gradient-to-br from-gray-500/10 to-amber-300/10 font-light backdrop-blur-md border border-white/20 text-white">
                                <p className="text-gray-300 material-icons">{ item.icon }</p>
                                <h3 className="text-2xl md:text-3xl py-4">{ item.title }</h3>
                                <p className="">
                                    { item.description }
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing Section */}
            <section className="pt-20 bg-warm-gray-dark pb-20">
                <div className="max-w-[1120px] mx-auto px-6 md:px-10  flex flex-col">
                    <div className="w-8 h-[8px] bg-yellow-mellow mb-4"></div>
                    <h2 className="text-4xl font-semibold mb-8">
                        { content.closing.sectionTitle }
                    </h2>
                    <div className="flex flex-col">
                        <p className="text-lg leading-[1.75] text-gray-300">{ content.closing.lessons}</p>
                    </div>
                </div>
            </section>
            <Footer />   
        </main>
    )
}