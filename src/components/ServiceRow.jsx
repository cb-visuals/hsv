import { motion } from "framer-motion"
import ParallaxImage from "./ParallaxImage"
import RevealGroup from "./RevealGroup"
import SplitReveal from "./SplitReveal"
import { scrollReveal } from "../utils/motion"

// One row of the services list: a full-width background band (so rows still
// read as continuous, undivided panels) with its actual content — the
// word-reveal heading, description, and parallax photo — constrained to the
// site's standard max-w-[1280px] container so it aligns with every other
// page. Rows are separated by a hairline; no alternating white/grey,
// matching the reference's continuous list feel.
//
// A single RevealGroup wraps the whole row (both the text column and the
// photo), so the image's entrance shares the exact same viewport trigger as
// the text instead of animating in on its own independent, slightly-drifted
// schedule.
function ServiceRow({ service }) {
  return (
    <section aria-labelledby={`${service.id}-heading`} className="relative border-b border-secondary bg-bg-secondary">
      <RevealGroup className="mx-auto max-w-[1280px] md:grid md:min-h-[42vh] md:grid-cols-3">
        <div className="flex flex-col justify-between gap-8 px-4 py-10 md:px-8 md:py-10">
          <div>
            <SplitReveal
              as="h2"
              id={`${service.id}-heading`}
              text={service.name}
              className="text-h2-mobile font-extralight text-primary md:text-h2"
            />
          </div>

          <div>
            <motion.p variants={scrollReveal} className="max-w-md text-body text-text-muted">
              {service.description}
            </motion.p>
          </div>
        </div>

        <div className="relative h-[280px] md:col-span-2 md:h-auto">
          <ParallaxImage src={service.image} alt={service.name} />
        </div>
      </RevealGroup>
    </section>
  )
}

export default ServiceRow
