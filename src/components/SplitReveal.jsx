import { motion } from "framer-motion"
import { wordReveal } from "../utils/motion"

const wordStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }

// Splits text into words, each masked in its own overflow-hidden box and
// animated rising up into place — inherits hidden/visible from an ancestor
// RevealGroup, cascading word-by-word rather than fading in as one block.
function SplitReveal({ text, as: Component = "span", className, id }) {
  const words = text.split(" ")

  return (
    <Component id={id} className={className}>
      <motion.span variants={wordStagger} className="inline">
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden align-top">
            <motion.span variants={wordReveal} className="inline-block">
              {word}
              {index < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  )
}

export default SplitReveal
