import { Expand } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Link } from "react-router-dom"
import { galleryItems } from "virtual:gallery"
import Lightbox from "../components/Lightbox"
import PlaceholderMedia from "../components/PlaceholderMedia"
import Seo from "../components/Seo"

const portfolioNavLinks = [
  { to: "/portfolio/vacant-properties", label: "Vacant Properties" },
  { to: "/portfolio/occupied-properties", label: "Occupied Properties" },
  { to: "/portfolio/flip-design-direction", label: "Flip Design Direction" },
]

// A sensible portrait-ish default so items don't jump around too much before
// their real media loads and reports its actual width/height.
const DEFAULT_ASPECT_RATIO = 4 / 5

// How many leading items render immediately on load instead of waiting on a
// scroll-into-view check — covers "the top row" on any column count (up to
// xl:columns-4) without needing to know the real column count at render
// time. Staggered by a manual per-index delay rather than a shared
// staggerContainer parent, so each item is fully self-contained: no shared
// RevealGroup/whileInView context to interact badly with, which is what was
// breaking this before.
const IMMEDIATE_ITEM_COUNT = 8
const IMMEDIATE_STAGGER_STEP = 0.06

function MasonryItem({ item, index, immediate, onSelect }) {
  const [aspectRatio, setAspectRatio] = useState(DEFAULT_ASPECT_RATIO)

  const handleMediaLoad = (event) => {
    const el = event.currentTarget
    const width = el.naturalWidth || el.videoWidth
    const height = el.naturalHeight || el.videoHeight
    if (width && height) setAspectRatio(width / height)
  }

  // Immediate items animate in on mount, staggered by index. Everything
  // after them still fades in as it individually scrolls into view — its
  // own whileInView, not a shared one, so it can't be affected by whatever
  // else is going on elsewhere in the grid.
  const revealProps = immediate
    ? {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut", delay: index * IMMEDIATE_STAGGER_STEP },
      }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, ease: "easeOut" },
      }

  return (
    <motion.div {...revealProps} className="mb-0.5 break-inside-avoid md:mb-1" style={{ aspectRatio }}>
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-label={`View larger: ${item.alt}`}
        className="group relative block h-full w-full cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <PlaceholderMedia
          type={item.type}
          src={item.src}
          alt={item.alt}
          onMediaLoad={handleMediaLoad}
          className="transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors duration-300 group-hover:bg-primary/20">
          <Expand
            className="h-6 w-6 text-bg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
      </button>
    </motion.div>
  )
}

function Portfolio() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  return (
    <div>
      <Seo
        title="Portfolio"
        description="Browse before-and-after home staging transformations across Toronto and the GTA, from vacant condos to occupied homes and full flip redesign projects."
        path="/portfolio"
      />
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-24">
        <h1 className="text-h1-mobile md:text-h1 font-extralight text-primary">Portfolio</h1>
        <p className="mt-4 max-w-xl text-body text-text-muted">A selection of recent project highlights.</p>
        <nav
          aria-label="Portfolio categories"
          className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-small font-extralight uppercase tracking-wide"
        >
          {portfolioNavLinks.map((link, index) => (
            <span key={link.to} className="flex items-center gap-2">
              <Link to={link.to} className="text-text-muted transition-colors hover:text-primary">
                {link.label}
              </Link>
              {index < portfolioNavLinks.length - 1 && (
                <span className="text-text-muted/50" aria-hidden="true">
                  /
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>

      <section aria-label="Gallery" className="pb-12 md:pb-24">
        <div className="columns-2 gap-0.5 md:columns-3 md:gap-1 xl:columns-4">
          {galleryItems.map((item, index) => (
            <MasonryItem
              key={item.src}
              item={item}
              index={index}
              immediate={index < IMMEDIATE_ITEM_COUNT}
              onSelect={setSelectedIndex}
            />
          ))}
        </div>
      </section>

      {selectedIndex !== null && (
        <Lightbox items={galleryItems} initialIndex={selectedIndex} onClose={() => setSelectedIndex(null)} />
      )}
    </div>
  )
}

export default Portfolio
