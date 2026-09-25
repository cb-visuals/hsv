import { X } from "lucide-react"
import { animate as animateTrack, motion, useMotionValue } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

// Renders whichever media type an item is — shared by the main slide and
// the peeking prev/next previews. Only the active (centered) slide plays or
// shows controls — a peeking preview is just a static, silent glimpse, never
// something with audio or motion running out of focus. Always muted even
// when active: browsers require that for unprompted autoplay anyway, and it
// keeps a newly-opened lightbox from blasting sound — the video's own
// controls let a visitor unmute if they want it.
function LightboxMedia({ item, className, active = false }) {
  if (!item) return null
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        className={className}
        muted
        autoPlay={active}
        controls={active}
        loop={active}
        playsInline
      />
    )
  }
  return <img src={item.src} alt={item.alt} className={className} />
}

// Every slot (prev/current/next) is the same fixed width so the filmstrip
// has a consistent pitch — the peeks aren't a separate, narrower "preview"
// element, they're the *same slot* mostly clipped by the viewport edge,
// which is what makes it read as media genuinely continuing off-screen.
const SLOT_CLASS = "w-[65vw] max-w-[900px] shrink-0"

// A lightbox that cycles through `items` (Escape to close, ArrowLeft/
// ArrowRight to navigate, or click the peeking preview on either edge).
// `items` is scoped by the caller — the full gallery on the Portfolio page,
// or just one project's before+after media on the Flip Design Direction
// page — so "cycle through everything" only ever means whatever list was
// handed in.
//
// This renders three persistent slots (prev/current/next) side by side in
// one flex "track" wider than the viewport, centered so the outer two bleed
// off both edges — the dialog's own overflow-hidden clips them, which is
// what makes them look like they're partially off-screen rather than sat in
// their own padded lane. Navigating doesn't swap which content fades in;
// it animates the whole track sideways by exactly one slot's width (a
// MotionValue driven imperatively, not the `animate` prop, so the reset
// below can be instant instead of also animating). Only once that slide
// finishes do we commit the new index and snap the track back to x:0 in the
// same tick — the pixel-for-pixel appearance is identical at that instant
// (the old "next" slot is now sitting exactly where the new centered
// "current" slot renders), so the swap is invisible and the motion reads as
// one continuous filmstrip drag rather than two separate animations.
function Lightbox({ items, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex)
  const [isSliding, setIsSliding] = useState(false)
  const [prefersReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)

  const trackRef = useRef(null)
  const slotRef = useRef(null)
  const x = useMotionValue(0)

  const hasMultiple = items.length > 1
  const item = items[index]
  const prevItem = hasMultiple ? items[(index - 1 + items.length) % items.length] : null
  const nextItem = hasMultiple ? items[(index + 1) % items.length] : null

  const slide = useCallback(
    (direction) => {
      if (isSliding || !hasMultiple) return

      const slotWidth = slotRef.current?.getBoundingClientRect().width ?? 0
      const gap = trackRef.current ? parseFloat(getComputedStyle(trackRef.current).columnGap) || 0 : 0
      const pitch = slotWidth + gap
      if (!pitch) return

      setIsSliding(true)
      animateTrack(x, -direction * pitch, {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.65, 0, 0.35, 1],
        onComplete: () => {
          setIndex((current) => (current + direction + items.length) % items.length)
          x.set(0)
          setIsSliding(false)
        },
      })
    },
    [isSliding, hasMultiple, items.length, prefersReducedMotion, x],
  )

  const goPrev = useCallback(() => slide(-1), [slide])
  const goNext = useCallback(() => slide(1), [slide])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") goPrev()
      if (event.key === "ArrowRight") goNext()
    }
    document.addEventListener("keydown", handleKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [goPrev, goNext, onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-primary/90 backdrop-blur-sm motion-reduce:transition-none"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-bg text-primary transition-colors hover:bg-secondary md:right-8 md:top-8"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex items-stretch gap-4 sm:gap-8 md:gap-12"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`${SLOT_CLASS} flex items-center justify-center`}>
          {prevItem && (
            <button
              type="button"
              onClick={goPrev}
              aria-label={`Previous: ${prevItem.alt}`}
              className="h-full w-full cursor-pointer overflow-hidden rounded-card opacity-40 transition-opacity duration-300 hover:opacity-70"
            >
              <LightboxMedia item={prevItem} className="h-full w-full object-cover" />
            </button>
          )}
        </div>

        <div ref={slotRef} className={`${SLOT_CLASS} flex items-center justify-center`}>
          <LightboxMedia item={item} active className="max-h-[80vh] max-w-full rounded-card object-contain" />
        </div>

        <div className={`${SLOT_CLASS} flex items-center justify-center`}>
          {nextItem && (
            <button
              type="button"
              onClick={goNext}
              aria-label={`Next: ${nextItem.alt}`}
              className="h-full w-full cursor-pointer overflow-hidden rounded-card opacity-40 transition-opacity duration-300 hover:opacity-70"
            >
              <LightboxMedia item={nextItem} className="h-full w-full object-cover" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Lightbox
