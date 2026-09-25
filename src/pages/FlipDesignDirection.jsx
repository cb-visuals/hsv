import { Expand } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Link } from "react-router-dom"
import { flipProjectMedia } from "virtual:flip-gallery"
import Lightbox from "../components/Lightbox"
import PlaceholderMedia from "../components/PlaceholderMedia"
import RevealGroup from "../components/RevealGroup"
import Seo from "../components/Seo"
import { scrollReveal } from "../utils/motion"

const phases = [
  {
    number: "01",
    name: "Consultation",
    description: "Bring us in before the demo so we can walk through with you and decide what to keep and what to scrap.",
  },
  {
    number: "02",
    name: "Design Direction",
    description: "Palette, materials, and fixtures chosen for the neighbourhood, the buyer, and the budget.",
  },
  {
    number: "03",
    name: "Trade Coordination",
    description: "We work alongside your GC to spec, source, and install every finish so that it blends just right.",
  },
  {
    number: "04",
    name: "Full Staging",
    description: "The renovated home is then styled from our inventory for photography and showings.",
  },
]

const projects = [
  {
    address: "47 Westholme",
    folder: "47-westholm",
    type: "Semi-detached, back-to-bricks full gut",
    stats: "Sold in 8 days · $350,000 over the top expected price and $361,000 over asking",
    description:
      "Brought in at demolition, we built the material palette from the floors up: engineered wide-plank light oak hardwood, warm-veined marble, a kitchen island with a wood-slat back panel and underlighting, floor and stair uplighting, an exposed brick feature wall, a wine fridge, a pet nook, hand-selected fixtures, complementary paint colors, and thoughtfully placed accent lighting. The space was fully staged to bring out the best in the home.",
  },
  {
    address: "27 Fisken",
    folder: "27-fisken",
    type: "Semi-detached, back-to-bricks full gut",
    stats: "Sold in 7 days · $208,600 over asking",
    description:
      "New character. New life. Hand-selected tile, grout tones approved on-site, and fixtures curated right down to the black stainless steel appliances. Key features include an entry sculpture nook with a drop-pendant light, Calacatta quartz trimmed with a spice ledge and pot filler, wall sconces framing a custom-molded range hood, a textured wood feature wall in the living room, and ambient mood lighting in the bathroom, all thoughtfully staged to highlight every premium upgrade.",
  },
  {
    address: "125 Brookside",
    folder: "125-brookside",
    type: "Detached, back-to-bricks with some original features restored",
    stats: "Sold in 14 days · Sold for $1,460,000",
    description:
      "A 1920s classic receives its first-ever full renovation, reimagined through a mid-century modern lens with vintage accents. Thoughtful tilework anchors the transformation, featuring a matchstick kitchen backsplash, a penny tile bathroom floor, an MCM oval shower tile, and hand-laid mini hexagons custom-patterned to fit the staircase landings. Authentically sourced antiques bring depth and history to the design, from floating wall shelves made of antique leveling tools to a glass washboard repurposed as a kitchen spice rack. These rich textures (alongside the home's original doors, stained glass windows, and brick fireplace) blend seamlessly with contemporary touches, including a banquette dining space designed to maximize seating and traffic flow.",
  },
]

// A single cover photo standing in for the whole group (up to ~20 photos
// per before/after), rather than a grid of individual thumbnails — clicking
// it opens the same project-scoped Lightbox, positioned on this cover, so
// visitors cycle through the rest from there instead of the page trying to
// show all of them at once.
function MediaGroup({ label, items, onSelect }) {
  const cover = items[0] ?? null

  return (
    <div>
      <p className="text-small font-thin uppercase tracking-wide text-text-muted">{label}</p>
      <div className="mt-3 aspect-[4/3] overflow-hidden rounded-card">
        {cover ? (
          <button
            type="button"
            onClick={() => onSelect(items)}
            aria-label={`Enter gallery: ${label}`}
            className="group relative block h-full w-full cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <PlaceholderMedia
              type={cover.type}
              src={cover.src}
              alt={cover.alt}
              className="transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-primary/0 text-bg opacity-0 transition-all duration-300 group-hover:bg-primary/30 group-hover:opacity-100">
              <Expand className="h-6 w-6" aria-hidden="true" />
              <span className="text-small font-extralight uppercase tracking-wide">Enter Gallery</span>
            </div>
          </button>
        ) : (
          <PlaceholderMedia alt={`${label} photo`} />
        )}
      </div>
    </div>
  )
}

function FlipDesignDirection() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div>
      <Seo
        title="Flip Design Direction"
        description="Design direction for flip and renovation projects in Toronto and the GTA, from early consultation through trade coordination to final staging."
        path="/portfolio/flip-design-direction"
      />
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-24">
        <RevealGroup>
          <motion.div variants={scrollReveal}>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1 text-small font-extralight uppercase tracking-wide text-text-muted transition-colors hover:text-primary"
            >
              Portfolio /
            </Link>
          </motion.div>
          <motion.h1 variants={scrollReveal} className="mt-2 text-h1-mobile md:text-h1 font-extralight text-primary">
            Flip Design Direction
          </motion.h1>
          <motion.p variants={scrollReveal} className="mt-4 max-w-xl text-body text-text-muted">
            Renovating to sell? Bring us in early. It shows in the sale price. We choose the finishes, hold
            the palette together, and stage the finished home so the numbers land where they should.
          </motion.p>
        </RevealGroup>
      </div>

      <section aria-label="Our process" className="bg-bg-secondary py-12 md:py-24">
        <RevealGroup className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          {phases.map((phase) => (
            <motion.div key={phase.number} variants={scrollReveal}>
              <p className="text-small font-thin uppercase tracking-wide text-text-muted">{phase.number}</p>
              <p className="mt-2 text-body font-extralight text-primary">{phase.name}</p>
              <p className="mt-2 text-body text-text-muted">{phase.description}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      <section aria-label="Flip project samples" className="py-12 md:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8">
          <RevealGroup>
            <motion.h2 variants={scrollReveal} className="text-h2-mobile font-extralight text-primary md:text-h2">
              Flip Project Samples
            </motion.h2>
          </RevealGroup>

          <div className="mt-8 flex flex-col gap-16">
            {projects.map((project) => {
              const media = flipProjectMedia[project.folder] ?? { before: [], after: [] }
              // Cycling is scoped to whichever gallery was opened — Before
              // and After are separate slideshows, never mixed together.
              const openLightbox = (items) => setLightbox({ items, index: 0 })
              return (
                <RevealGroup key={project.address} className="border-t border-secondary pt-10">
                  <motion.h3 variants={scrollReveal} className="text-h3 font-extralight text-primary">
                    {project.address}
                  </motion.h3>
                  <motion.p
                    variants={scrollReveal}
                    className="mt-1 text-small font-thin uppercase tracking-wide text-text-muted"
                  >
                    {project.type}
                  </motion.p>
                  <motion.p variants={scrollReveal} className="mt-1 text-small font-extralight text-primary">
                    {project.stats}
                  </motion.p>
                  <motion.p variants={scrollReveal} className="mt-4 max-w-2xl text-body text-text-muted">
                    {project.description}
                  </motion.p>
                  <motion.div variants={scrollReveal} className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <MediaGroup label="Before" items={media.before} onSelect={openLightbox} />
                    <MediaGroup label="After" items={media.after} onSelect={openLightbox} />
                  </motion.div>
                </RevealGroup>
              )
            })}
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox items={lightbox.items} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </div>
  )
}

export default FlipDesignDirection
