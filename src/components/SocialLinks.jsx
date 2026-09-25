import { socialLinks } from "../data/socialLinks"

function SocialLinks({ className = "flex items-center gap-3" }) {
  return (
    <div className={className}>
      {socialLinks.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary text-text-secondary transition-colors hover:border-primary hover:text-primary"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
