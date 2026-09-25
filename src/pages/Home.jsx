import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import HeroVideoCarousel from "../components/HeroVideoCarousel"
import RevealGroup from "../components/RevealGroup"
import Seo from "../components/Seo"
import SplitHero from "../components/SplitHero"
import TestimonialSpotlight from "../components/TestimonialSpotlight"
import { scrollReveal } from "../utils/motion"

const stats = [
  { value: "13+", label: "Years in Business" },
  { value: "1000+", label: "Properties Staged" },
  { value: "Toronto/GTA", label: "Proudly Serving" },
]

const pressMentions = [
  { name: "Toronto Star", src: "/media/home/press-toronto-star.svg" },
  { name: "Global News", src: "/media/home/press-global-news.svg" },
]

const testimonials = [
  {
    quote:
      "Very talented and reliable! Chandra is easy to work with, has great style and vision of how she wants things to turn out and execute them perfectly. Thank you for not only helping us to sell our home but also show the house the way it is meant to be shown!",
    name: "Eugene Lee",
    location: "Google Review",
    image: "/media/home/testimonial-01.jpg",
  },
  {
    quote:
      "Your expertise in helping my client receive an offer in 30 hrs and $150K above asking is highly appreciated! I highly recommend your services and look forward to working together in the future.",
    name: "Peter Economou",
    location: "Realtor, RE/MAX Ultimate Realty",
    image: "/media/home/testimonial-02.jpg",
  },
  {
    quote: "Jeff's place sold firm. $85,000 over ask. He is very happy. Says the staging did it all.",
    name: "KJ",
    location: "Text Message",
    image: "/media/home/testimonial-03.jpg",
  },
  {
    quote:
      "Home Staging Visuals brought my house to life in ways that I never thought possible as a mother with 2 kids and one on the way. Chandra is a Queen. Amazing work.",
    name: "Veronica Marica",
    location: "Facebook Recommendation",
    image: "/media/home/testimonial-04.jpg",
  },
  {
    quote: "There were more than 60 showings and it sold last night for almost $100,000 over asking!",
    name: "Dave",
    location: "Email",
    image: "/media/home/testimonial-05.jpg",
  },
  {
    quote:
      "Chandra did an outstanding job staging our property. Her attention to detail, creativity, and thoughtful ideas truly set her apart. She transformed the property beautifully and helped us achieve a sale price well above what we had expected.",
    name: "Richard Chhabra",
    location: "WhatsApp Message",
    image: "/media/home/testimonial-06.jpg",
  },
]

function Home() {
  return (
    <div>
      <Seo
        title="Home"
        description="Toronto and GTA home staging that helps listings sell faster. Home Staging Visuals stages vacant properties, occupied homes, and flip redesigns for sale."
        path="/"
      />
      <SplitHero
        media={<HeroVideoCarousel />}
        heading="Staged to sell, styled to impress"
        subtitle="Home staging and decorating for Toronto and GTA homeowners, real estate agents, and luxury real estate teams."
      >
        <Button href="/contact">Get in touch</Button>
      </SplitHero>

      <section aria-label="Stats" className="bg-bg-secondary px-4 py-12 md:px-8 md:py-24">
        <RevealGroup className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={scrollReveal}>
              <p className="text-h1-mobile md:text-h1 font-thin text-primary">{stat.value}</p>
              <p className="mt-2 text-small font-thin uppercase tracking-wide text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      <section aria-label="Press mentions" className="px-4 py-12 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1280px]">
          <RevealGroup className="text-center">
            <motion.p
              variants={scrollReveal}
              className="text-small font-thin uppercase tracking-wide text-text-muted"
            >
              As Featured In
            </motion.p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {pressMentions.map((mention) => (
                <motion.div
                  key={mention.name}
                  variants={scrollReveal}
                  className="flex h-8 w-28 items-center justify-center md:h-10 md:w-36"
                >
                  <img
                    src={mention.src}
                    alt={mention.name}
                    className="h-full w-full object-contain grayscale opacity-40"
                  />
                </motion.div>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      <section aria-label="Philosophy" className="bg-bg-secondary px-4 py-16 md:px-8 md:py-28">
        <RevealGroup className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={scrollReveal}
            className="text-h3 font-extralight text-primary md:text-h2"
          >
            &ldquo;Thirteen years and over a thousand properties later, our philosophy remains unchanged: the
            best staging is the staging you don&rsquo;t notice. You simply walk in, and feel that you arrived
            home.&rdquo;
          </motion.p>
        </RevealGroup>
      </section>

      <section aria-label="Testimonials">
        <TestimonialSpotlight heading="In Their Words" testimonials={testimonials} />
        <div className="px-4 py-10 text-center md:px-8">
          <Link
            to="/testimonials"
            className="link-underline inline-block text-small font-extralight uppercase tracking-wide text-primary"
          >
            Read all our reviews
          </Link>
        </div>
      </section>

      <section aria-label="Styled for every angle" className="px-4 py-16 md:px-8 md:py-28">
        <RevealGroup className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={scrollReveal}
            className="text-h3 font-extralight text-primary md:text-h2"
          >
            &ldquo;We style for 360°. Our styling looks good on camera and in person from every
            angle.&rdquo;
          </motion.p>
        </RevealGroup>
      </section>
    </div>
  )
}

export default Home
