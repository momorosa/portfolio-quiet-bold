import { linkify } from "../utils/linkify.jsx"
import Button from "./Button.jsx"


const BIO_LINKS = {
    Ford: "/work/ford",
    "First Republic Bank": "/work/frb",
    HouseQuest: "/work/housequest",
}

export default function AboutSection( { content }) {
    return (
        <section 
            className="relative w-full min-h-[100svh] md:h-screen py-16 md:py-24"
            aria-labelledby="about-heading"
        >
            {/* <div className= "absolute right-0 w-full md:w-1/2 mt-20 py-10 px-8 md:px-24"> */}
            <div className= "px-6 md:px-24 pt-[72vh] md:pt-24 md:absolute md:top-0 md:right-0 md:w-1/2 pointer-events-auto">
                <h1 className="text-4xl font-bold text-shadow-lg">{  content.headline }</h1>
                {[ content.intro, content.currentRole, content.background, content.outsideOfWork ]
                    .filter(Boolean)
                    .map((paragraph, i) => (
                    <p key={ i } className="py-4 text-xl md:text-lg">{ linkify(paragraph, BIO_LINKS) }</p>
                ))}

                <Button
                    id="btn"
                    href={`mailto:momorosa.design@gmail.com?subject=${encodeURIComponent(
                        "Quick hello from your site — let's chat")}`}
                    className="font-medium text-black bg-yellow-mellow px-5 py-3 mt-4"
                    aria-label={ content.buttonLabel}
                    rightIcon="send"
                    iconSize="md-18"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    { content.buttonLabel }
                </Button>            
            </div>
        </section>
    )
}