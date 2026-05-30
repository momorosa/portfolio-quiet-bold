import AboutSection from "./AboutSection.jsx"
import HeroCanvas from "./HeroCanvas.jsx"

export default function HomeHero({ onLogoClick }) {
    return (
        <section
            id="top"
            className="relative overflow-hidden"
            aria-labelledby="about-heading"
        >
            <div className="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 md:grid-cols-2">
                <div className="relative min-h-[46svh] md:min-h-screen">
                    <HeroCanvas />
                </div>

                <div className="relative z-10 flex items-center">
                    <AboutSection onLogoClick={onLogoClick}/>
                </div>
            </div>
        </section>
    )
}

