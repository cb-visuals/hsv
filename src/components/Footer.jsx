import { Phone } from "lucide-react"
import { NavLink } from "react-router-dom"
import GoogleRating from "./GoogleRating"
import SocialLinks from "./SocialLinks"

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
]

const portfolioLinks = [
  { to: "/portfolio/vacant-properties", label: "Vacant Properties" },
  { to: "/portfolio/occupied-properties", label: "Occupied Properties" },
  { to: "/portfolio/flip-design-direction", label: "Flip Design Direction" },
]

function Footer() {
  return (
    <footer className="border-t border-secondary bg-bg-secondary">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-4 py-12 md:px-8 md:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col font-logo leading-tight">
              <span className="whitespace-nowrap text-lg font-medium uppercase tracking-wide text-primary">
                Home Staging Visuals
              </span>
              <span className="whitespace-nowrap text-sm font-light text-text-secondary">By Chandra Bradley</span>
            </div>
            <div className="mt-6">
              <GoogleRating />
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className="text-body font-extralight text-text-secondary transition-colors hover:text-primary">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer: Portfolio">
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink to="/portfolio" className="text-body font-extralight text-text-secondary transition-colors hover:text-primary">
                  Portfolio
                </NavLink>
              </li>
              {portfolioLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className="text-body font-extralight text-text-secondary transition-colors hover:text-primary">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href="tel:+14168590707"
              className="flex items-center gap-2 text-body font-extralight text-text-secondary transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              (416) 859-0707
            </a>
            <a
              href="mailto:cb.visuals@gmail.com"
              className="text-body font-extralight text-text-secondary transition-colors hover:text-primary"
            >
              cb.visuals@gmail.com
            </a>
            <SocialLinks />
          </div>
        </div>

        <div className="border-t border-secondary pt-6 text-small text-text-muted">
          © {new Date().getFullYear()} Home Staging Visuals. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
