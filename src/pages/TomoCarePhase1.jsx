import ProjectHeading from "../components/ProjectHeading.jsx"
import QuietBoldHomeLink from "../components/QuietBoldHomeLink.jsx"
import { tomoCarePhase1Content as content } from "../contents/tomoCarePhase1.js"
import {
  CaseStudySection,
  CaseStudyBody,
  CaseStudyEyebrow,
  CaseStudyList,
  CaseStudyCard,
  CaseStudyCallout,
  CaseStudyMediaFrame,
  CaseStudyGrid,
} from "../components/CaseStudy.jsx"
import VerificationUIDiagram from "../components/VerificationUIDiagram.jsx"
import Footer from "../components/Footer.jsx"
import ZoomableImage from "../components/ZoomableImage.jsx"

function MediaFigure({ src, alt, caption, className = "" }) {
  if (!src) return null

  return (
    <figure className={className}>
      <CaseStudyMediaFrame>
        <ZoomableImage
          src={src}
          alt={alt || caption || "TomoCare Phase 1 evidence"}
          imgClassName="object-cover"
        />
      </CaseStudyMediaFrame>
      {caption ? (
        <figcaption className="mt-3 text-sm leading-6 text-zinc-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function StepNumber({ index }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-yellow-mellow/30 bg-yellow-mellow/10 text-sm font-medium text-yellow-mellow-light">
      {String(index + 1).padStart(2, "0")}
    </span>
  )
}

function NumberedStepCard({ step, index }) {
  if (step.imgOrientation === "portrait") {
    return (
      <CaseStudyCard>
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
          {/* Text — grows to fill available width */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <StepNumber index={index} />
            <div>
              <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                {step.title}
              </h3>
              <CaseStudyBody>{step.description}</CaseStudyBody>
            </div>
          </div>
          {/* Portrait image — fixed column, natural height */}
          <div className="w-full md:w-72 shrink-0">
            <MediaFigure src={step.imgUrl} caption={step.caption} />
          </div>
        </div>
      </CaseStudyCard>
    )
  }

  // Landscape (or no image): text above, image full-width below
  return (
    <CaseStudyCard className="space-y-4">
      <div className="flex items-start gap-4">
        <StepNumber index={index} />
        <div>
          <h3 className="text-lg md:text-xl font-medium text-white mb-2">
            {step.title}
          </h3>
          <CaseStudyBody>{step.description}</CaseStudyBody>
        </div>
      </div>
      <MediaFigure src={step.imgUrl} caption={step.caption} />
    </CaseStudyCard>
  )
}

export default function TomoCarePhase1() {
  return (
    <main className="relative min-h-screen bg-warm-gray-dark/50 text-white font-primary overflow-x-hidden">
      <QuietBoldHomeLink className="absolute top-4 left-4 z-20" size="1.5em" />

      <ProjectHeading
        backgroundImage={content.backgroundImage}
        tintClass="bg-black/60"
        title={content.title}
        description={content.description}
        navItems={content.phaseNav.map((phase, index) => ({
          label: phase.title,
          key: index,
          href: phase.pageUrl,
          meta: phase.status,
          current: phase.current,
          disabled: phase.disabled || phase.current || !phase.pageUrl,
          newTab: false,
        }))}
        heroEmbed={{
          src: "https://player.vimeo.com/video/1194096530?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1",
          title: "TomoCare Phase 1 Verification UI demo",
          className: "rounded-2xl border border-white/60",
        }}
      />

      <article>
        {/* Intro */}
        <CaseStudySection
          title={content.intro.eyebrow}
          className="bg-black pt-40 md:pt-60 lg:pt-80"
          narrow={false}
        >
          <div className="max-w-[760px] space-y-6">
            {content.intro.body.map((paragraph, index) => (
              <CaseStudyBody key={index}>{paragraph}</CaseStudyBody>
            ))}
          </div>

          <VerificationUIDiagram className="mt-2" />

          <CaseStudyCallout>{content.intro.callout}</CaseStudyCallout>
        </CaseStudySection>

        {/* What shipped */}
        <CaseStudySection title={content.outcome.title} narrow={false}>
          <div className="max-w-[760px] space-y-6">
            <CaseStudyBody>{content.outcome.summary}</CaseStudyBody>
            <CaseStudyList items={content.outcome.highlights} />
          </div>

          <MediaFigure
            src={content.outcome.imgUrl}
            caption={content.outcome.caption}
          />
        </CaseStudySection>

        {/* Problem */}
        <CaseStudySection title={content.problem.title}>
          <CaseStudyBody>{content.problem.context}</CaseStudyBody>
          <CaseStudyList items={content.problem.items} />
          <CaseStudyCallout>{content.problem.hmw}</CaseStudyCallout>
        </CaseStudySection>

        {/* Bet */}
        <CaseStudySection title={content.bet.title} className="bg-warm-gray-dark/35">
          {content.bet.body.map((paragraph, index) => (
            <CaseStudyBody key={index}>{paragraph}</CaseStudyBody>
          ))}
        </CaseStudySection>

        {/* Approach */}
        <CaseStudySection title={content.approach.title} narrow={false}>
          <div className="max-w-[760px] space-y-6">
            <CaseStudyBody>{content.approach.architectureNarrative}</CaseStudyBody>
            <CaseStudyCallout>{content.approach.toolingNote}</CaseStudyCallout>
          </div>

          <div className="space-y-6 pt-4">
            {content.approach.steps.map((step, index) => (
              <NumberedStepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </CaseStudySection>

        {/* Principles */}
        <CaseStudySection
          title={content.principles.title}
          className="bg-warm-gray-dark/35"
          narrow={false}
        >
          <div className="max-w-[760px]">
            <CaseStudyBody>{content.principles.intro}</CaseStudyBody>
          </div>

          {content.principles.items.find((p) => p.imgUrl) ? (
            <MediaFigure
              src={content.principles.items.find((p) => p.imgUrl).imgUrl}
              caption={content.principles.items.find((p) => p.imgUrl).caption}
              alt="TomoCare Phase 1 trust-visible review surface evidence"
              className="pt-2"
            />
          ) : null}

          <CaseStudyGrid className="items-stretch">
            {content.principles.items.map((principle) => (
              <CaseStudyCard
                key={principle.title}
                className="h-full min-h-[260px] md:min-h-[300px] flex flex-col"
              >
                <h3 className="text-lg md:text-xl font-medium text-white mb-4">
                  {principle.title}
                </h3>
                <CaseStudyBody>{principle.body}</CaseStudyBody>
              </CaseStudyCard>
            ))}
          </CaseStudyGrid>
        </CaseStudySection>

        {/* Reliability */}
        <CaseStudySection title={content.reliability.title}>
          <CaseStudyBody>{content.reliability.body}</CaseStudyBody>
          <CaseStudyList items={content.reliability.items} />
        </CaseStudySection>

        {/* Learning */}
        <CaseStudySection title={content.learning.title} className="bg-warm-gray-dark/35">
          <div className="space-y-6">
            {content.learning.items.map((item, index) => (
              <CaseStudyCard key={index}>
                <CaseStudyEyebrow>{`Learning ${index + 1}`}</CaseStudyEyebrow>
                <CaseStudyBody>{item}</CaseStudyBody>
              </CaseStudyCard>
            ))}
          </div>
        </CaseStudySection>

        {/* Next */}
        <CaseStudySection title={content.next.title}>
          <CaseStudyList items={content.next.items} />
        </CaseStudySection>

        {/* Closing */}
        <CaseStudySection title={content.closing.title} className="bg-black">
          <CaseStudyBody>{content.closing.body}</CaseStudyBody>
        </CaseStudySection>
      </article>

      <Footer />
    </main>
  )
}
