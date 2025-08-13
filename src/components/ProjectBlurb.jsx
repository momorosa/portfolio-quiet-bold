import { projects } from '../contents/projects.js'
import Button from './Button.jsx'
  
export default function ProjectBlurb() {
    return(
        <div className="w-1/2 flex flex-col items-center justify-center font-primary">
            { projects.projectBlurbs.map((project, i) => (
                <div key={i} className="p-6 m-4">
                    <p className="text-yellow-mellow-light mb-2">{project.tagline}</p>
                    <h3 className="text-4xl font-bold text-white my-4">{project.title}</h3>
                    <p className="text-zinc-300 mb-4 text-lg">{project.description}</p>
                    <p className="text-zinc-300 mb-4">
                        <span className="material-icons pr-2">settings_suggest</span>
                        {project.skills}
                    </p>
                    <Button
                        id="btn"
                        href="/"
                        className="font-medium text-black bg-yellow-mellow px-5 py-3 mt-4"
                        aria-label={ project.buttonLabel}
                        rightIcon="east"
                        iconSize="md-18"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {project.buttonLabel}
                    </Button>
                </div>))}
        </div>
    )
}