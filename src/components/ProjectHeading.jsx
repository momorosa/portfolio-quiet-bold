import clsx from "clsx"
import Button from "./Button"
import { FancyLink } from "./FancyLink.jsx"

export default function ProjectHeading({
    className = "",
    backgroundImage,
    tintClass = "bg-black/70",
    useMask = true,
    title,
    description,
    button,
    ctaCaption,
    roles = [],
    navItems = [],
    navTitle = "Phases",
    heroImage,
    heroVideo,
    heroEmbed,
    minHeightClass = "min-h-[90svh] lg:h-screen",
}) {
    const showNav = Array.isArray(navItems) && navItems.length > 0
    const showRoles = !showNav && Array.isArray(roles) && roles.length > 0

    return (
        <section className={clsx("relative", minHeightClass, "pb-32 md:pb-48", className)}>
            {/* Background Image */}
            <div
                className={clsx(
                  "absolute inset-0 bg-cover bg-center lg:bg-fixed",
                  useMask &&
                    "mask-alpha mask-b-from-black mask-b-from-50% mask-b-to-transparent"
                )}
                style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
                aria-hidden="true"
            />

            {/* Dark overlay / tint */}
            <div className={clsx("absolute inset-0", tintClass)} aria-hidden="true" />

            {/* Content */}
            <div className="relative z-10 max-w-[1120px] mx-auto h-full px-6 md:px-10 py-16 flex flex-col lg:flex-row lg:items-center gap-10">
                {/* Left: Title / Copy / CTA */}
                <div className="lg:w-1/2 mt-20 lg:mt-10">
                    {title && (
                        <h1 className="text-4xl md:text-6xl font-semibold md:leading-[1.2]">
                            {title}
                        </h1>
                    )}

                    {description && <p className="text-xl mt-6">{description}</p>}

                    {button?.href && (
                        <>
                            <Button
                                id="btn"
                                href={button.href}
                                className={clsx(
                                    "w-64 font-medium text-black px-5 py-3 mt-8",
                                    button.className
                                )}
                                aria-label={button.label}
                                rightIcon={button.rightIcon}
                                iconSize="md-18"
                                target={button.target || "_blank"}
                                rel={button.rel || "noopener noreferrer"}
                            >
                                {button.label}
                            </Button>
                        
                            {ctaCaption && (
                                <p className="text-zinc-400 italic mt-3">{ctaCaption}</p>
                            )}
                        </>
                    )}
                </div>

                {/* Right: Phases nav (preferred) OR legacy Roles list */}
                {(showNav || showRoles) && (
                    <div className="lg:w-1/2 lg:pl-4">
                        <div className="p-6">
                            {showNav && (
                                <>
                                    <p className="text-sm uppercase tracking-wide text-white/70  mb-4">
                                        {navTitle}
                                    </p>
                                    <ul className="text-md md:text-xl">
                                        {navItems.map((item, i) => {
                                            const isCurrent = item.current
                                            const isDisabled = item.disabled || !item.href

                                            return (
                                                <li
                                                    key={`${item.href || item.label}-${i}`}
                                                    className="py-6"
                                                >
                                                    <div className="flex flex-col gap-2">
                                                        {isCurrent ? (
                                                            <div
                                                                className="inline-flex items-center gap-3 text-white"
                                                                aria-current="page"
                                                            >
                                                                <span className="font-medium">{item.label}</span>

                                                                <span className="inline-flex items-center rounded-full border border-yellow-mellow/30 bg-yellow-mellow/10 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-yellow-mellow-light">
                                                                    {item.meta || "You are here"}
                                                                </span>
                                                            </div>
                                                        ) : isDisabled ? (
                                                            <div
                                                                className="inline-flex items-center gap-3 text-white/45 cursor-not-allowed"
                                                                aria-disabled="true"
                                                            >
                                                                <span>{item.label}</span>

                                                                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/55">
                                                                    {item.meta || "Planned"}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <FancyLink
                                                                href={item.href}
                                                                newTab={item.newTab}
                                                                secondary={typeof item.secondary === "boolean" ? item.secondary : true}
                                                                className={clsx("inline-flex items-center gap-2")}
                                                            >
                                                                {item.label}
                                                                <span className="material-icons material-symbols-outlined md-18">
                                                                    east
                                                                </span>
                                                            </FancyLink>
                                                        )}

                                                        {!isCurrent && !isDisabled && item.meta ? (
                                                            <p className="text-sm text-white/70">{item.meta}</p>
                                                        ) : null}
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </>
                            )}

                            {showRoles && !showNav && (
                                <ul className="text-xl">
                                    {roles.map((role, i) => (
                                        <li
                                            key={i}
                                            className="py-6 border-b border-white/20 last:border-0"
                                        >
                                            {role}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Hero image / video / embed pinned to bottom */}
            {(heroImage?.src || heroVideo?.src || heroEmbed?.src) && (
                <div className="absolute left-1/2 bottom-0 z-20 w-full max-w-[1120px] px-6 md:px-10 -translate-x-1/2 translate-y-3/5 ">
                    <div>
                        {heroEmbed?.src ? (
                            <div className={clsx("aspect-video w-full shadow-lg overflow-hidden", heroEmbed.className)}>
                                <iframe
                                    src={heroEmbed.src}
                                    title={heroEmbed.title || "Project hero video"}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                />
                            </div>
                        ) : heroVideo?.src ? (
                            <video
                                src={heroVideo.src}
                                poster={heroVideo.poster}
                                title={heroVideo.title || "Project hero video"}
                                className={clsx("w-full shadow-lg", heroVideo.className)}
                                autoPlay={heroVideo.autoPlay ?? true}
                                muted={heroVideo.muted ?? true}
                                loop={heroVideo.loop ?? true}
                                playsInline={heroVideo.playsInline ?? true}
                                controls={heroVideo.controls ?? false}
                            />
                        ) : (
                            <div className={clsx(heroImage.frameClassName)}>
                                <img
                                    src={heroImage.src}
                                    alt={heroImage.alt || "Project hero"}
                                    className={clsx("w-full shadow-lg", heroImage.className)}
                                    loading="eager"
                                    decoding="async"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}