import Button from "./Button.jsx"

export default function AboutSection( { content }) {
    return (
        <section 
            className="relative w-full h-screen py-16 md:py-24"
            aria-labelledby="about-heading"
        >
            <div className= "absolute right-0 w-full md:w-1/2 mt-20 py-10 px-8 md:px-24">
                <h1 className="text-4xl font-bold">{  content.headline }</h1>
                {[ content.intro, content.currentRole, content.background, content.passion, content.outsideOfWork, content.closing ]
                    .filter(Boolean)
                    .map((paragraph, i) => (
                    <p key={ i } className="py-4">{ paragraph }</p>
                ))}

                <Button
                    id="btn"
                    href="mailto:momorosa.design@gmail.com"
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