import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import ProjectChefClaude from './pages/ProjectChefClaude.jsx'

export default function App () {
    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={ <Home /> }/>
                <Route path="/home" element={ <Navigate to="/" replace  /> }/>
                <Route path="/chef-claude" element={ <ProjectChefClaude /> }/>
            </Routes>

        </BrowserRouter>               
    )
}
