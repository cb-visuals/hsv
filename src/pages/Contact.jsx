import { motion } from "framer-motion"
import { ChevronDown, Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import RevealGroup from "../components/RevealGroup"
import Seo from "../components/Seo"
import SocialLinks from "../components/SocialLinks"
import { scrollReveal } from "../utils/motion"

const contactMethods = [
  {
    icon: Phone,
    label: "Talk to a Real Person",
    value: "(416) 859-0707",
    href: "tel:+14168590707",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp or Text",
    value: "(416) 859-0707",
    href: "sms:+14168590707",
  },
  {
    icon: Mail,
    label: "Email",
    value: "cb.visuals@gmail.com",
    href: "mailto:cb.visuals@gmail.com",
  },
]

const faqs = [
  {
    question: "How much is the staging consultation?",
    answer: "Only $99 for Toronto and the immediate surrounding areas. Prices go up with distance.",
  },
  {
    question: "How much is a decorating/styling/design consultation?",
    answer:
      "These last longer than staging consults, usually around three hours, depending on the scale of your project. We keep these accessible at $120 to $200 for Toronto and immediate neighboring areas, with slight adjustments for locations farther out.",
  },
  {
    question: "What is included in the staging consultation?",
    answer:
      "Let's map out your project in person. We'll walk through your property with you to discuss furniture, decor, potential fixes, and smart upgrades, building a clear 'Plan A' on the spot. Afterward, you'll receive a custom quote alongside any needed paint codes and light fixture recommendations at no extra cost. Most clients find the initial walkthrough gives them all the direction they need, but if you'd like a bulleted consultation report to reference, we can add one for $99. Meetings usually run 1 hour but up to 3 hours depending on the size of your home.",
  },
  {
    question: "Do you offer any discounts?",
    answer:
      "We pass 100% of our trade discounts directly to you. While many designers keep trade discounts as added profit, we believe in complete financial transparency. In fact, the savings from our exclusive trade discounts often cover a significant portion, if not all, of our design fees. We enjoy hunting down the best discounts for you. You get full access to our trade perks, total visibility into every cost, and a fair, straightforward price for our design labor.",
  },
  {
    question: "How long is the home staging rental term?",
    answer:
      "All the rentals are for one month unless otherwise arranged. If it sells sooner, you can return the rentals but there is no refund for the shorter time. You can renew for one or multiple months if you would like at a discounted rate.",
  },
  {
    question: "How much does home staging cost?",
    answer:
      "All the quotes are custom and range from $1,000–$8,000, with most properties sitting in the $2,000–$5,000 range. The budget depends on how many pieces you need and how much labour is involved. If you'd like a better idea of cost before committing to a consult, we can give you a price estimate range over the phone once we have a better understanding of your project. The best way to do this is over the phone rather than through email, though sending photos by email or WhatsApp after the chat is always helpful.",
  },
  {
    question: "How many years has your company been active in Toronto for?",
    answer: "Over 13 years, so we know exactly what mistakes to avoid and all the little solutions you might not think of.",
  },
  {
    question: "What is your style?",
    answer:
      "Our personal preference towards style doesn't matter. We love and appreciate many different styles. For home staging, we interpret what the home needs to sell and what the widest buyer range would gravitate towards. For decorating and styling, we curate pieces that bring joy to the ones living in the space.",
  },
  {
    question: "How quickly can we book a consultation?",
    answer: "We usually can find time pretty quickly, sometimes even the same day you call. Always within a week.",
  },
  {
    question: "How quickly can you stage a property?",
    answer:
      "Tight timelines are simply the nature of the business. While a lead time of one to two weeks is ideal, we occasionally stage properties in as little as two days. Giving us as much notice as possible is in everyone's best interest, though we're always prepared to mobilize quickly when you need a fast turnaround.",
  },
  {
    question: "Do you work on weekends and holidays?",
    answer: "Yes, we're happy to accommodate weekends and holidays as long as our schedule allows.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-secondary">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-body font-extralight text-primary">{faq.question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <p className="min-h-0 text-body text-text-muted">{faq.answer}</p>
      </div>
    </div>
  )
}

function Contact() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-24">
      <Seo
        title="Contact"
        description="Get in touch with Home Staging Visuals: call, text, or email for a staging consultation in Toronto or the GTA."
        path="/contact"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <RevealGroup className="mx-auto max-w-2xl text-center">
        <motion.h1 variants={scrollReveal} className="text-h1-mobile md:text-h1 font-extralight text-primary">
          Not sure where to start? Give us a call. We&rsquo;ll point you in the right direction.
        </motion.h1>
      </RevealGroup>

      <RevealGroup className="mx-auto mt-12 flex max-w-2xl flex-col gap-3">
        {contactMethods.map(({ icon: Icon, label, value, href }) => (
          <motion.a
            key={label}
            variants={scrollReveal}
            href={href}
            className="flex items-center gap-4 rounded-card border border-secondary bg-bg-secondary p-4 transition-colors hover:border-primary"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg text-primary">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-small font-thin uppercase tracking-wide text-text-muted">{label}</span>
              <span className="block text-body font-extralight text-primary">{value}</span>
            </span>
          </motion.a>
        ))}
      </RevealGroup>

      <RevealGroup className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
        <motion.div variants={scrollReveal}>
          <p className="flex items-center gap-2 text-small font-thin uppercase tracking-wide text-text-muted">
            <Clock className="h-4 w-4" aria-hidden="true" />
            Hours of Operation
          </p>
          <p className="mt-2 text-body text-primary">Mon – Sun</p>
          <p className="text-body text-text-muted">9am – 9pm</p>
        </motion.div>
        <motion.div variants={scrollReveal}>
          <p className="flex items-center gap-2 text-small font-thin uppercase tracking-wide text-text-muted">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Service Areas
          </p>
          <p className="mt-2 text-body text-text-muted">
            Based in Toronto and servicing the GTA, extending out to Niagara, Barrie, and Oshawa.
          </p>
        </motion.div>
      </RevealGroup>

      <RevealGroup className="mx-auto mt-12 max-w-2xl">
        <motion.div variants={scrollReveal}>
          <SocialLinks className="flex items-center justify-center gap-3" />
        </motion.div>
      </RevealGroup>

      <section aria-label="Frequently asked questions" className="mx-auto mt-20 max-w-2xl">
        <RevealGroup>
          <motion.h2 variants={scrollReveal} className="text-h2-mobile font-extralight text-primary md:text-h2">
            Frequently Asked Questions
          </motion.h2>
        </RevealGroup>
        <div className="mt-6 border-t border-secondary">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Contact
