import { aboutContent } from "../contents/about.js"
import ProjectBlurb from "./ProjectBlurb.jsx"
import AboutSection from "./AboutSection.jsx"

export default function HomeUI() {
    return(
        <>
            <main className="w-screen font-primary text-white">
                <AboutSection content={ aboutContent } />
                <ProjectBlurb /> 
            </main>
        </>
    )
}