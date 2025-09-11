import { chefClaudeContent as content } from "../contents/chefClaudeContent.js";
import ProjectHeading from "../components/ProjectHeading.jsx";
import FooterText from "../components/FooterText.jsx";

export default function ProjectChefClaude() {
  return (
    <main className="text-white font-primary overflow-x-hidden bg-black">
      <ProjectHeading
        backgroundImage={content.backgroundImage}
        title={content.title}
        description={content.description}
        button={{
          id: "btn",
          href: content.buttonUrl,
          label: content.buttonLabel,
          rightIcon: "restaurant",
        }}
        ctaCamption={content.ctaCaption}
        roles={content.roles}
        heroImage={{
          src: content.heroImage,
          alt: "Chef Claude app screenshot",
        }}
      />

      {/* Overview Section */}
      <section className="mt-60 pt-40 md:pt-120 h-screen bg-black">
        <div className="max-w-[1120px] mx-auto px-6 py-16">
          <div className="w-8 h-[8px] bg-yellow-mellow mb-4"></div>
          <h2 className="text-4xl font-semibold mb-6">
            {content.context.sectiontTitle}
          </h2>
          <p className="text-xl text-zinc-200 leading-[1.75]">
            {content.context.challenge}
          </p>
        </div>
      </section>

      {/* UX Flow Section */}
      <section className="flex bg-warm-gray-dark min-h-svh">
        <div className="max-w-[1120px] mx-auto my-auto px-6 md:px-10 flex flex-col">
          <div className="w-8 h-[8px] bg-yellow-mellow mb-4"></div>
          <h2 className="text-4xl font-semibold mb-8">
            {content.uxFlow.sectionTitle}
          </h2>
          <div className="flex flex-row justify-between gap-10">
            <div className="flex flex-col w-1/3">
              {content.uxFlow.steps.map((step, index) => (
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
            <div className="w-2/3">//An image or vid</div>
          </div>
        </div>
      </section>

      {/* Design Highlights Section */}
      <section className="pt-20 bg-warm-gray">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 flex flex-col">
          <div className="w-8 h-[8px] bg-yellow-mellow mb-4"></div>
          <h2 className="text-4xl font-semibold mb-6">
            {content.designChallenges.sectionTitle}
          </h2>
          <div className="mb-10">
            <div className="flex flex-col w-1/2 gap-10">
              {/* <div className="flex flex-row justify-between"> */}
              {content.designChallenges.challenges.map((challenge, index) => (
                <div key={index} className="">
                  <h3 className="text-2xl font-semibold mb-6 text-yellow-mellow-light">
                    {challenge.subTitle}
                  </h3>
                  {challenge.decisions.map((decision, idx) => (
                    <div key={idx} className="mb-4">
                      <h4 className="text-xl font-medium pb-4">
                        {decision.name}
                      </h4>
                      <p className="text-zinc-400 leading-[1.75]">
                        {decision.content}
                      </p>
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
            {content.stack.sectionTitle}
          </h2>
          <div className="flex justify-between gap-6">
            {content.stack.stack.map((item, index) => (
              <div
                key={index}
                className="w-1/2 p-4 md:pt-6 rounded-xl bg-gradient-to-br from-gray-500/10 to-amber-300/10 font-light backdrop-blur-md border border-white/20 text-white gap-4 flex flex-col mb-6"
              >
                <span className="material-icons text-yellow-mellow-light mb-2">
                  {item.icon || "code"}
                </span>
                <h3 className="text-3xl md:text-3xl">{item.name}</h3>
                <p className="text-zinc-300">{item.techStack}</p>
                <div>
                  <img
                    src={item.svg}
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
            {content.outcome.sectionTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:pr-40">
            {content.outcome.outcomes.map((item, index) => (
              <div
                key={index}
                className="p-4 md:pt-10 rounded-xl bg-gradient-to-br from-gray-500/10 to-amber-300/10 font-light backdrop-blur-md border border-white/20 text-white"
              >
                <p className="text-gray-300 material-icons">{item.icon}</p>
                <h3 className="text-2xl md:text-3xl py-4">{item.title}</h3>
                <p className="">{item.description}</p>
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
            {content.closing.sectionTitle}
          </h2>
          <div className="flex flex-col">
            <p className="text-lg leading-[1.75] text-gray-300">
              {content.closing.lessons}
            </p>
          </div>
        </div>
      </section>
      <FooterText />
    </main>
  );
}
