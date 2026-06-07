import { chefClaudeContent as content } from "../contents/chefClaudeContent.js"
import ProjectHeading from "../components/ProjectHeading.jsx"
import RelatedLabProjects from "../components/RelatedLabProjects.jsx"
import Footer from "../components/Footer.jsx"
import {
    CaseStudySection,
    CaseStudyBody,
    CaseStudyEyebrow,
    CaseStudyList,
    CaseStudyCard,
    CaseStudyGrid,
    CaseStudyMetaList,
} from "../components/CaseStudy.jsx"

export default function ProjectChefClaude() {
    return (
        <main className="relative text-white font-primary overflow-x-hidden bg-black">
            <ProjectHeading
                backgroundImage={content.backgroundImage}
                title={content.title}
                description={content.description}
                button={{
                    id: "btn",
                    href: content.buttonUrl,
                    label: content.buttonLabel,
                    rightIcon: "restaurant",
                    className: "text-white"
                }}
                ctaCaption={content.ctaCaption}
                roles={content.roles}
                heroImage={{
                    src: content.heroImage,
                    alt: "Chef Claude app screenshot",
                    frameClassName: "lg:max-h-[440px] lg:overflow-y-auto lg:rounded-2xl",
                }}
            />

            {/* Overview */}
            <CaseStudySection title="Overview" className="md:pt-80 pt-50 lg:pt-80">
                <CaseStudyBody>{content.overview}</CaseStudyBody>
            </CaseStudySection>
          
            {/* Challenge */}
            <CaseStudySection title={content.context.sectionTitle}>
                <CaseStudyBody>{content.context.challenge}</CaseStudyBody>
            </CaseStudySection>
          
            {/* How it works */}
            <CaseStudySection
                title={content.uxFlow.sectionTitle}
                narrow={false}
                className="bg-warm-gray-dark/50"
            >

                <div className="space-y-10">
                    {/* Video — full width */}
                    <div className="space-y-4">
                        <CaseStudyCard className="overflow-hidden p-0">
                            <div className="aspect-video w-full">
                                <iframe
                                    src="https://player.vimeo.com/video/1192117579?badge=0&autopause=0&player_id=0&app_id=58479"
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    title="Chef Claude_ walkthrough"
                                />
                            </div>
                        </CaseStudyCard>
                        <p className="text-sm text-zinc-400 leading-6 italic">
                            A small note on the video: I recorded the voice over when the app was still running on DALL·E 3. OpenAI deprecated that model on May 12, 2026, so the live demo now uses gpt-image-2 and stores images on Vercel Blob. The experience looks and works the same. If anything, that swap is part of the project&rsquo;s point. Small AI products need tending, and the architecture should bend without breaking when a vendor changes the contract.
                        </p>
                    </div>

                    {/* Step cards — three across */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {content.uxFlow.steps.map((step, index) => (
                            <CaseStudyCard key={index} className="h-full">
                                <span className="material-icons material-symbols-outlined text-yellow-mellow-light mb-3">
                                    {step.icon}
                                </span>
                                <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                                    {step.stepTitle}
                                </h3>
                                <p className="text-zinc-300 leading-7">
                                    {step.step}
                                </p>
                            </CaseStudyCard>
                        ))}
                    </div>
                </div>
            </CaseStudySection>
              
            {/* Design highlights */}
            <CaseStudySection
                title={content.designChallenges.sectionTitle}
                className="bg-warm-gray-dark/50"
            >
                <div className="space-y-12">
                    {content.designChallenges.challenges.map((challenge, index) => (
                        <div
                            key={index}
                            className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0"
                        >
                            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-yellow-mellow-light">
                                {challenge.subTitle}
                            </h3>

                            <div className="space-y-6">
                                {challenge.decisions.map((decision, idx) => (
                                    <div key={idx}>
                                        <h4 className="text-lg md:text-xl font-medium text-white mb-3">
                                            {decision.name}
                                        </h4>
                                        <CaseStudyBody>{decision.content}</CaseStudyBody>
                                    </div>
                                ))}
                            </div>
                      
                        {challenge.gif ? (
                            <div className="mt-8">
                                <CaseStudyCard className="overflow-hidden p-0">
                                    <img
                                        src={challenge.gif}
                                        alt={challenge.subTitle}
                                        className="w-full h-auto object-cover"
                                    />
                                </CaseStudyCard>
                            </div>
                        ) : null}
                        </div>
                  ))}
                </div>
            </CaseStudySection>
            
            {/* Tech stack */}
            <CaseStudySection
                title={content.stack.sectionTitle}
                className="bg-warm-gray-dark/50"
            >
                <CaseStudyMetaList
                    items={content.stack.stack.map((item) => ({
                        title: item.name,
                        content: item.techStack,
                    }))}
                />
            </CaseStudySection>
            
            {/* Outcome */}
            <CaseStudySection
                title={content.outcome.sectionTitle}
                narrow={false}
                className="bg-warm-gray-dark/50"
            >
                <CaseStudyGrid>
                    {content.outcome.outcomes.map((item, index) => (
                        <CaseStudyCard
                            key={index}
                            className="h-full"
                        >
                            <p className="text-yellow-mellow-light material-icons material-symbols-outlined mb-3">
                                {item.icon}
                            </p>
                            <h3 className="text-2xl md:text-[1.75rem] font-medium text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-zinc-300 leading-7">
                                {item.description}
                            </p>
                        </CaseStudyCard>
                    ))}
                </CaseStudyGrid>
            </CaseStudySection>
            
            {/* Why it matters */}
            <CaseStudySection
                title={content.closing.sectionTitle}
                className="bg-warm-gray-dark/50"
            >
                <div>
                    <CaseStudyEyebrow>Reflection</CaseStudyEyebrow>
                    <CaseStudyList items={content.closing.lessons} />
                </div>
            </CaseStudySection>
            <RelatedLabProjects currentProjectUrl="/lab/chef-claude" />
            <Footer className="text-[var(--text-soft)]" />
        </main>
    )
}