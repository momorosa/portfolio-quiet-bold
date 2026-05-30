// Home.jsx
// Reads ?view=agent from the URL to switch between human and agent views.
// The toggle on the QuietBold "o" updates the URL param rather than theme.

import { useSearchParams } from "react-router-dom"
import HomeHero from "../components/home/HomeHero.jsx"
import TomoCareSection from "../components/home/TomoCareSection.jsx"
import LabSection from "../components/home/LabSection.jsx"
import Footer from "../components/Footer.jsx"
import AgentView from "../components/home/AgentView.jsx"

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const isAgentView = searchParams.get("view") === "agent"

  const enterAgentView = () => setSearchParams({ view: "agent" })
  const exitAgentView = () => setSearchParams({})

  if (isAgentView) {
    return <AgentView onExit={exitAgentView} />
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-500 ease-out">
      <HomeHero onLogoClick={enterAgentView} />
      <TomoCareSection />
      <LabSection />
      <Footer className="text-[var(--text-soft)]" />
    </main>
  )
}
