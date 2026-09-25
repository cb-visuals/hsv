import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import PlaceholderMedia from "./PlaceholderMedia"

// Mirrors the text's own scrollReveal (opacity + y) so the photo visibly
// fades/slides in together with its row's copy, plus a touch of scale for
// some extra depth. Safe to use opacity here now: this entrance inherits
// hidden/visible from the row's shared RevealGroup (see below) — the exact
// same mechanism scrollReveal already relies on everywhere else on the
// site — rather than the bespoke, more fragile clip-path gate this used to
// have (that one really could leave a photo stuck invisible).
// delay: 0 explicitly overrides the automatic staggerChildren delay the
// shared RevealGroup would otherwise assign it (it's the 5th matching
// descendant — after the eyebrow, heading, description, and meta row — so
// without this it doesn't even start fading in until the text is nearly
// done). This makes the photo start at the same instant as the row's very
// first bit of text, animating concurrently with the text's own cascade
// rather than trailing behind it.
const entranceVariants = {
  hidden: { opacity: 0, scale: 1.05, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0 } },
}

// A photo that drifts via a continuous scroll-linked parallax translate —
// the image is sized taller than its frame so the drift never exposes an
// edge. Critically, it's also CENTERED in that frame (not left flush at the
// top): with a 145%-tall image the 45% of extra height has to be split as
// ~22.5% buffer above and below, or one direction of drift immediately runs
// out of room and exposes the container's background — which is exactly
// what centering here fixes. The entrance (fade/slide/settle, echoing the
// text's own reveal) is layered on top of that.
//
// Deliberately has NO whileInView/viewport of its own — it inherits
// hidden/visible from an ancestor RevealGroup (via `variants` propagation)
// so the photo's entrance fires from the exact same trigger, at the exact
// same moment, as its row's text — instead of two independent
// IntersectionObservers that can drift out of sync with each other.
//
// The scale/y entrance and the scroll-linked parallax y-drift are kept on
// two separate nested elements (rather than combined via one `style`/
// `animate` pair on a single element) so Framer Motion's transform merging
// can't drop one.
function ParallaxImage({ src, alt }) {
  const containerRef = useRef(null)
  const [prefersReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  if (!src) {
    return (
      <div className="absolute inset-4 overflow-hidden rounded-card md:inset-8">
        <PlaceholderMedia alt={alt} />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="absolute inset-4 overflow-hidden rounded-card md:inset-8">
      <motion.div variants={entranceVariants} className="flex h-full w-full items-center justify-center">
        <motion.img
          src={src}
          alt={alt}
          style={prefersReducedMotion ? undefined : { y }}
          className="h-[145%] w-full object-cover"
        />
      </motion.div>
    </div>
  )
}

export default ParallaxImage
