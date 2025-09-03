import clsx from "clsx";
import Button from "./Button";

export default function ProjectHeading({
  className = "",
  backgroundImage,
  tintClass = "bg-black/70",
  useMask = true,
  title,
  description,
  button,
  ctaCamption,
  roles = [],
  heroImage,
  minHeightClass = "min-h-[90svh] h-screen",
}) {
  return (
    <section
      className={clsx("relative", minHeightClass, "pb-32 md:pb-48", className)}
    >
      {/* Background Image */}
      <div
        className={clsx(
          "absolute inset-0 bg-cover bg-center bg-fixed",
          useMask &&
            "mask-alpha mask-b-from-black mask-b-from-50% mask-b-to-transparent"
        )}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />

      {/* Dark overly / tint  */}
      <div className={clsx("absolute inset-0", tintClass)} aria-hidden="true" />

      {/* Content  */}
      <div className="relative z-10 max-w-[1120px] mx-auto h-full px-6 md:px-10 py-16 flex flex-col md:flex-row md:items-center gap-10">
        {/* Left: Title / Copy / CTA */}
        <div className="md:w-1/2 mt-10">
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
                  "w-64 font-medium text-black bg-yellow-mellow px-5 py-3 mt-8",
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
              {ctaCamption && (
                <p className="text-zinc-400 italic mt-3">{ctaCamption}</p>
              )}
            </>
          )}
        </div>

        {/* Right: Roles List */}
        {roles?.length > 0 && (
          <div className="md:w-1/2 md:pl-10">
            <div className="p-6">
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
            </div>
          </div>
        )}
      </div>

      {/* Hero image pinned to bottom */}
      {heroImage?.src && (
        <div className="absolute left-1/2 bottom-0 z-20 w-full max-w-[1120px] px-6 md:px-10 -translate-x-1/2 translate-y-4/5">
          <div>
            <img
              src={heroImage.src}
              alt={heroImage.alt || "Project hero"}
              className={clsx("w-full shadow-lg", heroImage.className)}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      )}
    </section>
  );
}
