import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"
import { sliderGalleries } from "virtual:slider-gallery"
import BeforeAfterSlider from "../components/BeforeAfterSlider"
import RevealGroup from "../components/RevealGroup"
import Seo from "../components/Seo"
import { portfolioCategories } from "../data/portfolioCategories"
import { scrollReveal } from "../utils/motion"

function PortfolioCategoryPage() {
  const { slug } = useParams()
  const category = portfolioCategories.find((item) => item.slug === slug)
  const sliders = sliderGalleries[slug] ?? []

  if (!category) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-24">
        <h1 className="text-h1-mobile md:text-h1 font-extralight text-primary">Not found</h1>
        <p className="mt-4 max-w-xl text-body text-text-muted">
          That portfolio category doesn't exist. Head back to the{" "}
          <Link to="/portfolio" className="underline">
            full portfolio
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-24">
      <Seo
        title={category.name}
        description={`Browse before-and-after ${category.name.toLowerCase()} home staging transformations in Toronto and the GTA.`}
        path={`/portfolio/${category.slug}`}
      />
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
          {category.name}
        </motion.h1>
        <motion.p variants={scrollReveal} className="mt-4 max-w-xl text-body text-text-muted">
          {category.description}
        </motion.p>
        <motion.p
          variants={scrollReveal}
          className="mt-4 text-small font-extralight uppercase tracking-wide text-text-muted"
        >
          Drag the slider: same room. Different story.
        </motion.p>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {sliders.map((pair, index) => (
            <motion.div key={index} variants={scrollReveal}>
              <BeforeAfterSlider
                before={{ ...pair.before, alt: `${category.name}, before, photo ${index + 1}` }}
                after={{ ...pair.after, alt: `${category.name}, after, photo ${index + 1}` }}
                label={category.name}
              />
            </motion.div>
          ))}
        </div>
      </RevealGroup>
    </div>
  )
}

export default PortfolioCategoryPage
