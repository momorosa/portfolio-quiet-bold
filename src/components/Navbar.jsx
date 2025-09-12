import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Social from './Social.jsx'
import Monogram from './Monogram.jsx'
import IconButton from './IconButton.jsx'
import DropdownMenu from './DropdownMenu.jsx'

export default function Navbar() {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ inProjects, setInProjects ] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if(location.pathname !== '/'){
            setInProjects(false)
            return
        }
        const el = document.getElementById('projects-start')
        if(!el) return

        const io = new IntersectionObserver(
            ([entry]) => setInProjects(entry.isIntersecting),
            { root: null, threshold: 0.3 }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [ location.pathname])

    const goToProjects = () => {
        if(location.pathname === '/') {
            window.dispatchEvent(new CustomEvent('r3f-go', { detail: { page: 1, smooth: true } }))
        } else {
            navigate('/#projects')
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    window.dispatchEvent(new CustomEvent('r3f-go', { detail: { page: 1, smooth: true } }))
                })
            })
        }      
    }

    const baseTab =
        '-rotate-90 text-lg inline-block transition select-none'
    const activeTab =
        'text-[#CF9033] border-b-4 border-[#CF9033] pointer-events-none'
    const inactiveTab = 'hover:opacity-80 cursor-pointer'


    const items = [
        { title: "Project 01: Chef Claude_", href: "/project/chef-claude" },
        { title: "Project 02: HouseQuest", href: "/project/housequest" },
        { title: "Project 03: Pawfect Match", href: "/project/pawfect-match" },
        { title: "Contact", href: "/contact"}
    ]

    return(
        <>
            <nav className="fixed top-0 left-0 w-screen md:w-24 md:h-dvh md:pb-8 z-50">
                <div className="flex flex-row h-auto items-center justify-between p-6 bg-transparent
                    md:flex-col md:h-full md:p-6" 
                >
                    <div className="flex justify-center items-center text-white">
                        <ul>
                            <li className="pb-6">
                                <Monogram />
                            </li>
                            <li className='py-12'>
                                <button
                                    type="button"
                                    onClick={ goToProjects }  
                                    aria-current={ inProjects ? "page" : undefined }
                                    className={`${baseTab} ${inProjects ? activeTab : inactiveTab}`}                           
                                >
                                    Projects
                                </button>
                            </li>
                            <li className="py-12">
                                <NavLink
                                    to="/contact"
                                    end
                                    className={({ isActive }) =>
                                        `${baseTab} ${isActive ? activeTab : inactiveTab}`
                                    }
                                >
                                    Contact
                               </NavLink>
                            </li>
                        </ul>
                        
                    </div>
                    <IconButton 
                        label={ isOpen ? "Close menu" : "Open menu" }
                        expanded={ isOpen }
                        onClick={ () => setIsOpen((prev) => !prev)}
                        className="md:hidden p-2"
                        iconName={ isOpen ? "close" : "menu" }
                        hasPopup
                        variant="ghost"
                    />
                    <div className="hidden md:block mt-auto flex justify-center items-center" >
                        <Social />
                    </div>
                </div>
            </nav>

            <DropdownMenu 
                isOpen={ isOpen }
                onClose={ () => setIsOpen(false) }
                items={ items }
            />
        </>
    )
}