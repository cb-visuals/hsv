import { motion } from "framer-motion"
import { useState } from "react"
import { formatDisplayName } from "../utils/formatName"
import { scrollReveal } from "../utils/motion"
import RevealGroup from "./RevealGroup"

const AUTO_ADVANCE_MS = 7000

// Angled, feathered wipe: a diagonal mask-image gradient where the black
// (visible) → transparent (hidden) band is FEATHER percentage-points wide,
// so the boundary between old and new photo is a soft blend rather than a
// hard clip-path edge. The band's leading edge (p) sweeps from off-canvas
// left (nothing revealed) to off-canvas right (fully revealed); CSS's own
// gradient-stop clamping collapses each end into a clean solid state.
const WIPE_ANGLE = 115
const FEATHER = 24
const maskAt = (p) => `linear-gradient(${WIPE_ANGLE}deg, black 0%, black ${p - FEATHER}%, transparent ${p}%, transparent 100%)`
const HIDDEN_MASK = maskAt(0)
const SHOWN_MASK = maskAt(100 + FEATHER)

// Shared by the photo wipe and the quote-card content so both halves of the
// change read as one cohesive transition instead of two separately-timed ones.
const TRANSITION_DURATION = 0.9
const TRANSITION_EASE = [0.65, 0, 0.35, 1]

// A full-bleed photo section: the image wipes edge-to-edge behind the
// heading, and a fixed-height frosted-glass card below it holds the quote,
// author, and decorative quote mark — sized so switching testimonials never
// changes the section's height. The timed progress bar sits below the card.
function TestimonialSpotlight({ heading, testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const active = testimonials[activeIndex]

  return (
    <div className="relative isolate min-h-[560px] overflow-hidden md:min-h-[640px]">
      <div className="absolute inset-0">
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex
          if (!isActive) {
            return (
              <div key={`${testimonial.name}-${index}-idle`} className="absolute inset-0" style={{ zIndex: 1 }}>
                <img src={testimonial.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
              </div>
            )
          }
          return (
            <motion.div
              key={`${testimonial.name}-${index}-active`}
              className="absolute inset-0"
              style={{ zIndex: 2 }}
              initial={
                prefersReducedMotion ? false : { WebkitMaskImage: HIDDEN_MASK, maskImage: HIDDEN_MASK }
              }
              animate={{ WebkitMaskImage: SHOWN_MASK, maskImage: SHOWN_MASK }}
              transition={{ duration: prefersReducedMotion ? 0 : TRANSITION_DURATION, ease: TRANSITION_EASE }}
            >
              <img src={testimonial.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            </motion.div>
          )
        })}
        <div className="absolute inset-0 z-[3] bg-gradient-to-br from-primary/75 via-primary/25 to-transparent" />
      </div>

      <div className="relative z-[3] mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-24">
        <RevealGroup>
          <motion.h2 variants={scrollReveal} className="text-h2-mobile font-extralight text-bg md:text-h2">
            {heading}
          </motion.h2>

          <motion.div
            variants={scrollReveal}
            className="relative mt-8 h-[260px] max-w-xl overflow-hidden rounded-card border border-secondary/30 bg-bg/80 p-6 backdrop-blur-md md:mt-12 md:h-[300px] md:p-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 -left-2 select-none font-display text-[8rem] leading-none text-primary/5 md:-top-10 md:text-[11rem]"
            >
              &ldquo;
            </span>

            <motion.blockquote
              key={activeIndex}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : TRANSITION_DURATION, ease: TRANSITION_EASE }}
              className="relative"
            >
              <p className="line-clamp-5 text-h3 font-thin text-primary md:line-clamp-4 md:text-h2">
                &ldquo;{active.quote}&rdquo;
              </p>
              <footer className="mt-6 text-small font-thin uppercase tracking-wide text-text-muted">
                {formatDisplayName(active.name)}
              </footer>
            </motion.blockquote>
          </motion.div>

          <motion.div
            variants={scrollReveal}
            className="mt-6 flex max-w-xl gap-2"
            role="group"
            aria-label="Choose a testimonial"
          >
            {testimonials.map((testimonial, index) => (
              <button
                key={`${testimonial.name}-${index}`}
                type="button"
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className="h-4 max-w-16 flex-1 cursor-pointer"
              >
                <span className="block h-1 overflow-hidden rounded-full bg-bg/40">
                  {index < activeIndex && <span className="block h-full w-full bg-bg" />}
                  {index === activeIndex && (
                    <span
                      key={activeIndex}
                      className="block h-full bg-bg motion-reduce:w-full motion-reduce:animate-none"
                      style={
                        prefersReducedMotion
                          ? undefined
                          : {
                              animation: `progress-fill ${AUTO_ADVANCE_MS}ms linear forwards`,
                              animationPlayState: isPaused ? "paused" : "running",
                            }
                      }
                      onAnimationEnd={goToNext}
                    />
                  )}
                </span>
              </button>
            ))}
          </motion.div>
        </RevealGroup>
      </div>
    </div>
  )
}

export default TestimonialSpotlight
