import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { useMenu } from "../context/MenuContext"
import Button from "./Button"

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  {
    // No `to` — "Portfolio" is a section label here, not a link itself.
    // "Recent Work" (linking to /portfolio) takes its place as a sublink.
    label: "Portfolio",
    children: [
      { to: "/portfolio", label: "Recent Work" },
      { to: "/portfolio/vacant-properties", label: "Vacant Properties" },
      { to: "/portfolio/occupied-properties", label: "Occupied Properties" },
      { to: "/portfolio/flip-design-direction", label: "Flip Design Direction" },
    ],
  },
  { to: "/contact", label: "Contact" },
]

function Nav() {
  const { isOpen, toggle, close } = useMenu()
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Keep --nav-height in sync with the header's real rendered height so
  // anything that needs to line up with it (hero sizing) stays correct
  // even if the header's own height ever changes.
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const updateHeight = () => {
      document.documentElement.style.setProperty("--nav-height", `${el.offsetHeight}px`)
    }
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const showBackground = isScrolled && !isOpen

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
        <div
          className={`absolute inset-0 bg-bg/80 backdrop-blur-md transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            showBackground ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div
            className={`absolute inset-x-0 bottom-0 h-px origin-center bg-secondary transition-transform duration-300 ease-out motion-reduce:transition-none ${
              showBackground ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        <nav
          aria-label="Primary"
          className="relative flex items-center justify-between px-4 py-4 md:px-8 md:py-6"
        >
          {/* On mobile, the logo and the CTA trade places when the menu opens —
              "Home" is already a link inside the menu itself, so the logo is
              redundant there, and hiding it frees up the room the CTA needs to
              fit on one line. Desktop always shows both, unaffected. */}
          <NavLink
            to="/"
            className={`whitespace-nowrap font-logo font-[300] uppercase tracking-normal text-xs sm:tracking-wide sm:text-lg md:text-xl ${
              isOpen ? "hidden md:block" : "block"
            } ${isOpen ? "text-bg" : "text-primary"}`}
            onClick={() => {
              close()
              const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
              window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
            }}
          >
            Home Staging Visuals
          </NavLink>

          <div className="ml-auto flex items-center gap-2">
            <div className={isOpen ? "block" : "hidden md:block"}>
              <Button href="/contact" variant={isOpen ? "inverted" : "primary"} onClick={close}>
                Get in touch
              </Button>
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors ${
                isOpen ? "bg-bg text-primary hover:bg-secondary" : "bg-primary text-bg hover:bg-secondary hover:text-primary"
              }`}
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <Menu
                  className={`absolute h-5 w-5 transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                  aria-hidden="true"
                />
                <X
                  className={`absolute h-5 w-5 transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-primary transition-all duration-[0.4s] ease-out motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0 motion-reduce:translate-y-0"
        }`}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Main menu">
          <ul className="flex flex-col items-center gap-6">
            {links.map((link, index) => {
              const handleLinkClick = (event) => {
                event.currentTarget.blur()
                close()
              }

              return (
                <li
                  key={link.label}
                  className={`text-center ${isOpen ? "animate-menu-link" : ""}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.to ? (
                    <NavLink
                      to={link.to}
                      onClick={handleLinkClick}
                      className="link-underline inline-block font-display text-h1-mobile md:text-h1 font-extralight text-bg transition-colors hover:text-secondary"
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <span className="inline-block font-display text-h1-mobile md:text-h1 font-thin text-bg">
                      {link.label}
                    </span>
                  )}
                  {link.children && (
                    <ul className="mt-2 flex flex-col items-center gap-2 text-center">
                      {link.children.map((child) => (
                        <li key={child.to} className="w-full">
                          <NavLink
                            to={child.to}
                            onClick={handleLinkClick}
                            className="link-underline inline-block text-body font-extralight text-bg/70 transition-colors hover:text-bg"
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Nav
