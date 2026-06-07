import { motion } from "framer-motion"
import Button from "../Button.jsx"
import QuietBoldLogo from "../QuietBoldLogo.jsx"
import Social from "../Social.jsx"
import { aboutContent } from "../../contents/aboutRosa.js"

const lines = [
    { text: aboutContent.tagLine[0], delay: 0.25 },
    { text: aboutContent.tagLine[1], delay: 0.6 },
    { text: aboutContent.tagLine[2], delay: 1 },
]

export default function AboutSection({ onLogoClick }) {
    return (
        <div className="w-full px-6 py-10 md:px-10 md:py-16 lg:px-14">
            <div className="mx-auto w-full max-w-[620px]">
                <h1
                  id="about-heading"
                  className="text-4xl font-bold tracking-tight md:text-6xl"
                >
                    <QuietBoldLogo onOClick={onLogoClick} className="select-none" size="1.2em" />
                </h1>

                <ul className="px-1 py-8 text-lg leading-relaxed text-[var(--text-muted)] md:text-base">
                    {lines.map((line) => (
                        <motion.li
                            key={line.text}
                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut", delay: line.delay }}
                        >
                            {line.text}
                        </motion.li>
                    ))}
                </ul>

                <div className="border-t border-dashed border-[var(--border)] px-1 py-6">
                    <h2 className="flex items-center justify-between gap-4 text-3xl md:text-4xl">
                        <span>{aboutContent.name}</span>
                        <Social direction="row" baseColor="var(--text-muted)" />
                    </h2>

                    <div className="pb-2 py-6 text-lg leading-relaxed text-[var(--text)] md:text-md">
                        {aboutContent.description.map((paragraph, index) => (
                            <p className="pb-4" key={index}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    <p className="py-4 text-md leading-relaxed text-[var(--text-muted)] md:text-base">
                        {aboutContent.disclaimer}
                    </p>

                    <Button
                        id="btn"
                        href={`mailto:momorosa.design@gmail.com?subject=${encodeURIComponent(
                          "Quick hello from your website visitor 👋"
                        )}&body=${encodeURIComponent(
                          "Hey Rosa, I found your portfolio and..."
                        )}`}
                        copyValue="momorosa.design@gmail.com"
                        className="px-5 py-3 font-medium hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
                        aria-label="Email Rosa"
                        rel="noopener noreferrer"
                        rightIcon="email"
                        rightIconHover="east"
                        iconSize="md-18"
                    >
                        {aboutContent.buttonLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}