// Shared Framer Motion variants (Section 3: Animation & Motion Guidelines)

// Generic stagger container — orchestrates timing only, children fade
// themselves in via heroItem/scrollReveal. Used for hero load and for
// scroll-triggered groups of elements within a section.
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// Tighter stagger for larger groups (galleries, lists) so the cascade
// doesn't take too long to finish.
export const staggerContainerTight = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

// Hero load: headline/subtitle/CTA fade in and slide up, staggered 0.1s apart
export const heroItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

// Scroll-triggered content: fade in with a slight upward slide at 20% visible
export const scrollReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

// Per-word "rise into place" reveal — pair with an `overflow-hidden` wrapper
// per word so the motion reads as a mask, not a slide. Used by SplitReveal.
export const wordReveal = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } },
}
