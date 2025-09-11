import { FancyLink } from "./FancyLink"

export default function FooterText() {
    return(
        <footer className="w-full h-16 text-center text-warm-gray-light p-4 bg-transparent">
            ©2025 - Rosa Choi.{' '}
            <FancyLink href="/my-toolkit" secondary id="primary-link-text">
                Crafted with Endless Curiosity.
            </FancyLink>
        </footer>
    )
}