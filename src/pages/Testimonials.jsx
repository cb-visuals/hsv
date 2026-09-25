import { motion } from "framer-motion"
import { Mail, MessageCircle, MessageSquare, Star } from "lucide-react"
import { testimonials } from "../data/testimonials"
import { FacebookIcon, GoogleLogo } from "../components/SocialIcons"
import RevealGroup from "../components/RevealGroup"
import Seo from "../components/Seo"
import { formatDisplayName } from "../utils/formatName"
import { scrollReveal } from "../utils/motion"

const SOURCE_ICONS = {
  google: GoogleLogo,
  facebook: FacebookIcon,
  email: Mail,
  text: MessageSquare,
  whatsapp: MessageCircle,
}

function TestimonialCard({ testimonial }) {
  const Icon = SOURCE_ICONS[testimonial.sourceType]

  return (
    <motion.div
      variants={scrollReveal}
      className="mb-4 break-inside-avoid rounded-card border border-secondary bg-bg-secondary p-6"
    >
      {testimonial.rating && (
        <div className="mb-3 flex gap-0.5 text-primary">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      )}
      <p className="whitespace-pre-line text-body text-primary">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-secondary pt-4">
        <div>
          <p className="text-small font-extralight text-primary">{formatDisplayName(testimonial.name)}</p>
          {testimonial.context && <p className="text-small text-text-muted">{testimonial.context}</p>}
        </div>
        {Icon && (
          <span className="flex items-center gap-1.5 text-text-muted grayscale" title={testimonial.source}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </motion.div>
  )
}

function Testimonials() {
  return (
    <div>
      <Seo
        title="Testimonials"
        description="Real client reviews and recommendations for Home Staging Visuals, from Google reviews to direct client messages, across Toronto and the GTA."
        path="/testimonials"
      />
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-24">
        <h1 className="text-h1-mobile md:text-h1 font-extralight text-primary">Testimonials</h1>
        <p className="mt-4 max-w-xl text-body text-text-muted">
          Every review is real, pulled straight from Google, Facebook, and messages sent directly by past
          clients.
        </p>
      </div>

      <section aria-label="All testimonials" className="pb-12 md:pb-24">
        <RevealGroup className="mx-auto max-w-[1280px] columns-1 gap-4 px-4 sm:columns-2 md:px-8 xl:columns-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </RevealGroup>
      </section>
    </div>
  )
}

export default Testimonials
