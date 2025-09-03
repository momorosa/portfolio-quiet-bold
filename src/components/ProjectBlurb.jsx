import { projects } from '../contents/projects.js'
import Button from './Button.jsx'
  
export default function ProjectBlurb() {
    return(
        <>
            { projects.projectBlurbs.map((project, i) => (
                <Section className="flex flex-col" key={i}>
                    <div className="w-full md:w-[400px]">
                        <p className="text-yellow-mellow-light mb-2">{project.tagline}</p>
                        <h3 className="text-4xl font-bold text-white my-4">{project.title}</h3>
                        <p className="text-zinc-300 mb-4 text-lg">{project.description}</p>
                        <p className="text-zinc-300 mb-4">
                            <span className="material-icons pr-2">settings_suggest</span>
                            {project.skills}
                        </p>
                        <Button
                            id="btn"
                            href="/chef-claude"
                            className="font-medium text-black bg-yellow-mellow px-5 py-3 mt-4"
                            aria-label={ project.buttonLabel}
                            rightIcon="east"
                            iconSize="md-18"
                            rel="noopener noreferrer"
                        >
                            {project.buttonLabel}
                        </Button>
                        {/* Credit for models */}
                        <p className="pt-4"> 
                            <a className="text-warm-gray-medium italic text-sm" href={ project.creditUrl } target="_blank" rel="noreferrer noopener">
                                { project.credit }
                            </a>
                        </p>
                    </div>
                </Section>))
            }
        </>
    )
}

const Section = ({ children, className = "" }) => {
    return (
        <section className={`max-w-[1024px] mx-auto min-h-screen px-6 md:px-10 pt-[52vh] md:pt-24 ${className}`}>
            {children}
        </section>
    )
}