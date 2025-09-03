import { myStackContent as content } from '../contents/myStack.js'
import ProjectHeading from '../components/ProjectHeading.jsx'

export default function MyToolkit()
{
    return(
       <main className="text-white font-primary overflow-x-hidden bg-black">
            <ProjectHeading 
                backgroundImage={ content.backgroundImage }
                title={ content.title }
                description={ content.description }
                roles={ content.roles }
                heroImage={{ src: content.heroImage, alt: "Chef Claude app screenshot" }}
            />
       </main>
    )
}