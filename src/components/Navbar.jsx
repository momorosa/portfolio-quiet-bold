import { useState } from 'react'
import Social from './Social.jsx'
import Monogram from './Monogram.jsx'

export default function Navbar() {
    const [ isOpen, setIsOpen ] = useState(false)

    return(
        <nav className="fixed top-0 left-0 w-screen md:w-24 md:h-dvh z-50">
            {/* <div className="flex md:h-dvh justify-between p-6 md:flex-col "> */}
            <div className="flex flex-row h-auto items-center justify-between p-6 bg-transparent
                md:flex-col md:h-full md:p-6"
            >
                <div className="flex justify-center item-center">
                    <Monogram />
                </div>
                <button
                    type="button"
                    aria-label="Open menu"
                    aria-expanded={ isOpen }
                    onClick={ () => setIsOpen((prev) => !prev ) }
                    className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white cursor-pointer"
                >
                    <span className="material-icons hover:text-yellow-mellow">{ isOpen ? "close" : "menu" }</span>
                </button>

                <div className="hidden md:block mt-auto flex justify-center item-center" >
                    <Social />
                </div>
            </div>
            <div
                className={`md:hidden transition-[opacity,transform] duration-200 ${
                    open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"}`}
            >
                <div className="absolute top-4 left-0 right-0 border-t border-white/10 bg-black/80 backdrop-blur-md flex justify-center text-center">
                    <ul className="p-4 space-y-3">
                        <li>
                            <a href="/work" className="block py-2 text-white/90 hover:text-white">
                                Work
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="block py-2 text-white/90 hover:text-white">
                                About
                            </a>
                        </li>
                         <li>
                            <a href="/contact" className="block py-2 text-white/90 hover:text-white">
                                Contact
                            </a>
                        </li>
                        <li className="pt-2">
                            <Social direction="row" gap={12} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}