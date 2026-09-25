import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { heroVideos } from "virtual:hero-gallery"
import PlaceholderMedia from "./PlaceholderMedia"

// Cycles through every clip in media/home/hero/ (numeric-aware filename
// order — prefix with 01/02/03 to control it), crossfading between them
// with a slow, continuous Ken Burns zoom. Each clip plays through once
// (advancing on its own "ended" event, so the pacing always matches the
// clip's real length) before handing off to the next; with a single clip
// this just loops in place, matching the original one-video hero.
//
// All clips stay mounted and stacked the whole time — only the active one
// plays and is visible — rather than swapping which element exists, so the
// crossfade is a plain opacity transition with no mount/unmount choreography
// to get wrong (this project avoids AnimatePresence; see Lightbox.jsx).
//
// Play/pause is driven imperatively via refs (the effect below), not just
// the `autoPlay` prop — toggling that attribute after a video has already
// mounted doesn't make a browser start playing it, only its *initial* load
// respects autoplay. Without this, every clip after the first would sit
// there paused once it became active.
//
// The zoom runs at one fixed pace for every clip rather than being timed to
// each clip's real length: a clip longer than that just holds at full zoom
// for the remainder, a shorter one crossfades out before finishing — both
// read fine as ambient motion. Tying the zoom duration to a duration read
// off the video element instead would race with Framer Motion's target
// value not changing, which can make an in-flight tween jump to completion
// the moment the real duration arrives.
const FADE_DURATION = 1.2
const ZOOM_SCALE = 1.08
const ZOOM_DURATION = 10

function HeroVideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prefersReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  const videoRefs = useRef([])

  useEffect(() => {
    heroVideos.forEach((_, index) => {
      const el = videoRefs.current[index]
      if (!el) return
      if (index === activeIndex) {
        el.currentTime = 0
        el.play().catch(() => {})
      } else {
        el.pause()
      }
    })
  }, [activeIndex])

  if (heroVideos.length === 0) {
    return (
      <PlaceholderMedia type="video" alt="Video tour of a professionally staged living room, Toronto" />
    )
  }

  const hasMultiple = heroVideos.length > 1

  const goNext = () => {
    if (hasMultiple) setActiveIndex((current) => (current + 1) % heroVideos.length)
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {heroVideos.map((src, index) => {
        const isActive = index === activeIndex

        return (
          <motion.video
            key={src}
            ref={(el) => {
              videoRefs.current[index] = el
            }}
            src={src}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop={!hasMultiple}
            playsInline
            aria-hidden="true"
            onEnded={isActive ? goNext : undefined}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: prefersReducedMotion ? 1 : isActive ? ZOOM_SCALE : 1,
            }}
            transition={
              isActive
                ? {
                    opacity: { duration: FADE_DURATION, ease: "easeInOut" },
                    scale: { duration: prefersReducedMotion ? 0 : ZOOM_DURATION, ease: "linear" },
                  }
                : {
                    opacity: { duration: FADE_DURATION, ease: "easeInOut" },
                    scale: { duration: 0 },
                  }
            }
            style={{ zIndex: isActive ? 1 : 0 }}
          />
        )
      })}
    </div>
  )
}

export default HeroVideoCarousel
