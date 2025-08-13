import { projects } from "../contents/projects.js"
import ProjectBlurb from "./ProjectBlurb"

ProjectBlurb
export default function HomeUI() {
    return(
        <main className="w-screen font-primary text-white">
            <Section className="flex flex-col">
                <h1 className="text-4xl font-bold">Projects</h1>
                <p className="py-4">{ projects.headline} </p>
            </Section>
            <ProjectBlurb />
        </main>
    )
}


const Section = ({ children, className = "" }) => {
    return (
        <section className={`max-w-[1024px] mx-auto h-screen p-10 ${className}`}>
            {children}
        </section>
    )
}