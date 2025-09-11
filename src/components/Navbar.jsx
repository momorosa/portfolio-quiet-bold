import { useState } from 'react'
import Social from './Social.jsx'
import Monogram from './Monogram.jsx'
import IconButton from './IconButton.jsx'
import DropdownMenu from './DropdownMenu.jsx'
import { FancyLink } from './FancyLink.jsx'

export default function Navbar() {
    const [ isOpen, setIsOpen ] = useState(false)
    const items = [
        { title: "Project 01: Chef Claude_", href: "/project/chef-claude" },
        { title: "Project 02: HouseQuest", href: "/project/housequest" },
        { title: "Project 03: Pawfect Match", href: "/project/pawfect-match" },
    ]

    return(
        <>
            <nav className="fixed top-0 left-0 w-screen md:w-24 md:h-dvh md:pb-8 z-50">
                <div className="flex flex-row h-auto items-center justify-between p-6 bg-transparent
                    md:flex-col md:h-full md:p-6" 
                >
                    <div className="flex justify-center items-center">
                        <ul>
                            <li className="pb-6">
                                <Monogram />
                            </li>
                            <li className="-rotate-90 py-10 text-lg">
                                <FancyLink href="/" secondary>
                                    Projects
                                </FancyLink>
                            </li>
                            <li className="-rotate-90 py-10 text-lg">
                                <FancyLink href="/contact" secondary>
                                    Contact
                                </FancyLink>
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