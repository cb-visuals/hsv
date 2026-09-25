import { motion } from "framer-motion"
import { staggerContainer, staggerContainerTight } from "../utils/motion"

// Orchestrates a scroll-triggered stagger across its children. Each child
// should be a motion component with variants={scrollReveal} and no trigger
// props of its own — it inherits hidden/visible from this container.
function RevealGroup({ children, className, tight = false, ...props }) {
  return (
    <motion.div
      className={className}
      variants={tight ? staggerContainerTight : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default RevealGroup
