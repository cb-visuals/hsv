import { motion } from "framer-motion"
import { heroItem, staggerContainer } from "../utils/motion"

function SplitHero({
  media,
  heading,
  subtitle,
  children,
  mediaSide = "end",
  mediaFirstOnMobile = false,
  squareOnMobile = false,
}) {
  return (
    <section className="grid grid-cols-1 md:-mt-[var(--nav-height)] md:grid-cols-2 md:items-stretch">
      <div
        className={`${mediaFirstOnMobile ? "order-1" : "order-2"} ${
          squareOnMobile ? "px-6 py-8" : "aspect-[4/5]"
        } md:aspect-auto md:h-[calc(100vh-4rem)] md:w-full md:px-0 md:py-0 ${
          mediaSide === "end" ? "md:order-2" : "md:order-1"
        }`}
      >
        {squareOnMobile ? (
          <div className="aspect-square overflow-hidden rounded-card md:aspect-auto md:h-full md:w-full md:overflow-visible md:rounded-none">
            {media}
          </div>
        ) : (
          media
        )}
      </div>
      <div
        className={`${mediaFirstOnMobile ? "order-2 pb-12" : "order-1 py-12"} flex flex-col items-center justify-center px-6 text-center md:px-20 md:py-24 ${
          mediaSide === "end" ? "md:order-1" : "md:order-2"
        }`}
      >
        <motion.div className="max-w-[480px]" variants={staggerContainer} initial="hidden" animate="visible">
          {heading && (
            <motion.h1 variants={heroItem} className="text-display-mobile md:text-display font-extralight text-primary">
              {heading}
            </motion.h1>
          )}
          {subtitle && (
            <motion.p variants={heroItem} className="mt-4 text-body text-text-muted">
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div variants={heroItem} className={heading || subtitle ? "mt-8" : undefined}>
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default SplitHero
