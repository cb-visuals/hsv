import { FacebookIcon, InstagramIcon } from "../components/SocialIcons"

// Single source of truth for every social link on the site — add or remove
// an entry here and it updates everywhere SocialLinks is used (footer,
// Contact page, etc).
// TODO: add a TikTok entry here once her account exists.
export const socialLinks = [
  { href: "https://www.instagram.com/homestagingvisuals/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.facebook.com/HomeStagingVisuals/", label: "Facebook", Icon: FacebookIcon },
]
