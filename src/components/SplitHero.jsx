import { motion } from "framer-motion"
import { heroItem, staggerContainer } from "../utils/motion"

function SplitHero({ media, heading, subtitle, children, mediaSide = "end" }) {
  return (
    <section className="grid grid-cols-1 md:-mt-[var(--nav-height)] md:grid-cols-2 md:items-stretch">
      <div
        className={`order-2 aspect-[4/5] md:aspect-auto md:h-[calc(100vh-4rem)] md:w-full ${
          mediaSide === "end" ? "md:order-2" : "md:order-1"
        }`}
      >
        {media}
      </div>
      <div
        className={`order-1 flex flex-col items-center justify-center px-6 py-12 text-center md:px-20 md:py-24 ${
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
            <motion.div variants={heroItem} className="mt-8">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default SplitHero
