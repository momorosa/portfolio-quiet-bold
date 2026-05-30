import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeProvider } from "./theme/ThemeProvider.jsx"
import ThemeTransitionOverlay from "./components/ThemeTransitionOverlay.jsx"

import Home from "./pages/Home.jsx"
import ProjectChefClaude from "./pages/ProjectChefClaude.jsx"
import TomoCareBrief from "./pages/TomoCareBrief.jsx"
import TomoCarePhase0 from "./pages/TomoCarePhase0.jsx"
import TomoCarePhase1 from "./pages/TomoCarePhase1.jsx"
import ImageTransitionPage from "./pages/lab/ImageTransitionPage.jsx"
import WizardGamePage from "./pages/lab/WizardGamePage.jsx"
import PortalPage from "./pages/lab/PortalPage.jsx"
import LostPrincePage from "./pages/lab/LostPrincePage.jsx"

function AppRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
            >
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/lab/image-transitions" element={<ImageTransitionPage />} />
                    <Route path="/lab/wizard-game" element={<WizardGamePage />} />
                    <Route path="/lab/portals" element={<PortalPage />} />
                    <Route path="/lab/lost-prince" element={<LostPrincePage />} />
                    <Route path="/lab/chef-claude" element={<ProjectChefClaude />} />
                    <Route path="/tomo-care" element={<TomoCareBrief />} />
                    <Route path="/tomo-care/phase-0" element={<TomoCarePhase0 />} />
                    <Route path="/tomo-care/phase-1" element={<TomoCarePhase1 />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    )
}

export default function App() {
    return (
        <ThemeProvider>
            <ThemeTransitionOverlay />
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ThemeProvider>
    )
}