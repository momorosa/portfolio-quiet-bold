import { aboutContent } from "../contents/about.js"
import ProjectBlurb from "./ProjectBlurb.jsx"
import AboutSection from "./AboutSection.jsx"


ProjectBlurb
export default function HomeUI() {
    return(
        <>
            <AboutSection content={ aboutContent } />
            <ProjectBlurb />   
        </>
    )
}
