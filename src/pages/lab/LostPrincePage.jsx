import { useMemo } from "react"
import ProjectHeading from "../../components/ProjectHeading"
import Footer from "../../components/Footer.jsx"
import ImageCarousel from "../../components/ImageCarousel.jsx"
import RelatedLabProjects from "../../components/RelatedLabProjects.jsx"
import { lostPrinceContent as content } from "../../contents/lostPrinceContent.js"
import {
    CaseStudySection,
    CaseStudyBody,
    CaseStudyCard,
    CaseStudyGrid,
    CaseStudyMediaFrame,
    CaseStudyMetaList,
} from "../../components/CaseStudy.jsx"

export default function LostPrincePage() {
    const reduceMotion = useMemo(() => {
        if (typeof window === "undefined") return false
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    }, [])

    return (
        <main className="relative min-h-screen font-primary bg-black text-white">

            <ProjectHeading
                backgroundImage={content.backgroundImage}
                title={content.title}
                description={content.overview}
                roles={content.roles}
                tintClass="bg-black/30"
            />

            {/* Quote + Trailer */}
            <CaseStudySection className="bg-black" narrow={false}>
                <blockquote className="max-w-[760px]">
                <h2 className="text-2xl md:text-3xl italic mb-5 text-zinc-200 leading-[1.5]">
                    {content.quote.text}
                </h2>
                <p className="text-base md:text-lg text-zinc-400 font-light leading-[1.75]">
                    {content.quote.author}
                </p>
                </blockquote>

                {content.video && !reduceMotion ? (
                <CaseStudyMediaFrame className="mt-12">
                    <div className="relative w-full aspect-[16/9]">
                    <video
                        playsInline
                        loop
                        controls
                        poster={content.backgroundImage}
                        preload="none"
                        className="absolute inset-0 h-full w-full object-cover"
                    >
                        <source src={`${content.video}#t=0.05`} type="video/mp4" />
                    </video>
                    </div>
                </CaseStudyMediaFrame>
                ) : null}
            </CaseStudySection>

            {/* Overview */}
            <CaseStudySection title={content.context.sectionTitle}>
                <CaseStudyBody>{content.overview}</CaseStudyBody>
                <CaseStudyMetaList items={content.context.items} />
            </CaseStudySection>

            {/* Challenge */}
            <CaseStudySection
                title={content.challenge.sectionTitle}
                className="bg-warm-gray-dark/50"
            >
                <CaseStudyBody>{content.challenge.challenge}</CaseStudyBody>
            </CaseStudySection>

            {/* Contributions */}
            <CaseStudySection
                title={content.contribution.sectionTitle}
                className="bg-warm-gray-dark/50"
                narrow={false}
            >
                <CaseStudyBody className="max-w-[760px]">
                {content.contribution.description}
                </CaseStudyBody>

                <CaseStudyGrid className="md:grid-cols-3">
                {content.contribution.keyResponsibilities.map((item, i) => (
                    <CaseStudyCard
                    key={i}
                    className="h-full bg-gradient-to-br from-gray-500/10 to-amber-300/10"
                    >
                    <div className="mb-3">
                        <p className="material-icons material-symbols-outlined bg-gradient-to-r from-amber-900  to-yellow-200 inline-block text-transparent bg-clip-text">
                        {item.icon}
                        </p>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                        {item.name}
                    </h3>
                    <p className="text-white/70 leading-7">
                        {item.responsibilities}
                    </p>
                    </CaseStudyCard>
                ))}
                </CaseStudyGrid>
            </CaseStudySection>

            {/* Visual Worldbuilding */}
            <CaseStudySection
                title="Visual Worldbuilding"
                className="bg-warm-gray-dark/50"
                narrow={false}
            >
                <ImageCarousel
                items={content.images}
                autoDelay={15000}
                reduceMotion={reduceMotion}
                />
            </CaseStudySection>

            {/* Systems */}
            <CaseStudySection title={content.systems.sectionTitle}>
                <CaseStudyBody>{content.systems.description}</CaseStudyBody>
                
                <div className="space-y-12 pt-2">
                {content.systems.systemDesign.map((system, index) => (
                    <div
                    key={index}
                    className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0"
                    >
                    <h3 className="text-xl md:text-2xl font-semibold text-yellow-mellow-light mb-4">
                        {system.subTitle}
                    </h3>
                
                    <CaseStudyBody>{system.description}</CaseStudyBody>
                
                    <div className="space-y-5 mt-6">
                        {system.decisions.map((decision, idx) => (
                        <div key={idx}>
                            <h4 className="text-lg md:text-xl font-medium text-white mb-2">
                            {decision.name}
                            </h4>
                            <CaseStudyBody>{decision.description}</CaseStudyBody>
                        </div>
                        ))}
                    </div>
                    
                    <CaseStudyCard className="mt-8">
                        <p className="text-yellow-mellow-light font-medium mb-2">Result</p>
                        <p className="text-zinc-300 leading-7">{system.results}</p>
                    </CaseStudyCard>
                    </div>
                ))}
                </div>
            </CaseStudySection>

            {/* Future Improvements */}
            <CaseStudySection
                title={content.future.sectionTitle}
                className="bg-warm-gray-dark/50"
            >
                <CaseStudyBody>{content.future.description}</CaseStudyBody>
            </CaseStudySection>
            <RelatedLabProjects currentProjectUrl="/lab/lost-prince" />
            <Footer className="text-[var(--text-soft)]" />
        </main>
    )
}