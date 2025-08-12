import { motion, AnimatePresence } from "framer-motion";
import Social from "./Social.jsx";

export default function DropdownMenu({
    isOpen,
    onClose,
    items = [],
    className = "",
}) {
    return (
        <AnimatePresence>
        {isOpen && (
            <motion.div
                key="overlay"
                className="fixed inset-0 z-40 bg-black/60"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
            >
                <motion.aside
                    key="panel"
                    className={`absolute left-0 right-0 top-0 mx-auto w-full max-w-screen md:max-w-[640px] ${className}`}
                    onClick={(e) => e.stopPropagation()}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={panelVariants}
                >    
                    <motion.ul
                        className="mt-24 px-6 flex flex-col items-center gap-2 font-primary"
                        variants={listVariants}
                    >
                        {items.map((item, i) => (
                            <motion.li key={item.href ?? i} variants={itemVariants}>
                                <a
                                    href={item.href}
                                    aria-label={item.title}
                                    className="block px-3 py-6 text-2xl text-zinc-300 hover:text-white transition-colors"
                                    onClick={onClose}
                                >
                                    {item.title}
                                </a>
                            </motion.li>
                        ))}
                    </motion.ul>
                    <motion.div
                        className="w-full flex justify-center mt-6"
                        variants={socialVariants}
                    >
                        <Social direction="row" gap={20} />
                    </motion.div>
                </motion.aside>
            </motion.div> 
        )}
        </AnimatePresence>
    )
}

const panelVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 360,
            damping: 30,
            mass: 0.6,
            // let children (list & social) animate after the panel starts
            when: "beforeChildren",
            delayChildren: 0.05,
            staggerChildren: 0.06,
        },
    },
    closed: {
        y: -16,
        opacity: 0,
        transition: {
            duration: 0.2,
            when: "afterChildren",
        },
    },
}

const listVariants = {
    open: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
    closed: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
}

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.22, ease: "easeOut" },
    },
    closed: {
        opacity: 0,
        y: -10,
        filter: "blur(2px)",
        transition: { duration: 0.22, ease: "easeIn" },
    },
}

const socialVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.24 } },
    closed: { opacity: 0, y: 8, transition: { duration: 0.24 } },
}
