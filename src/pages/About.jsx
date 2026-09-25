import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import Button from "../components/Button"
import PlaceholderMedia from "../components/PlaceholderMedia"
import RevealGroup from "../components/RevealGroup"
import Seo, { SITE_NAME } from "../components/Seo"
import SplitHero from "../components/SplitHero"
import { scrollReveal } from "../utils/motion"

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chandra Bradley",
  jobTitle: "Home Stager & Decorator",
  worksFor: {
    "@type": "Organization",
    name: SITE_NAME,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sheridan College",
  },
}

const stats = [
  { value: "13+", label: "Years in Business" },
  { value: "1000+", label: "Properties Styled" },
  { value: "Toronto & GTA", label: "Proudly Serving" },
  { value: "Diploma", label: "Visual Merchandising & Home Staging, Sheridan College" },
  { value: "Featured In", label: "Global News: The Morning Show & the Toronto Star" },
]

function About() {
  return (
    <div>
      <Seo
        title="About"
        description="Meet Chandra Bradley, the Toronto-based home stager and lead stylist behind Home Staging Visuals, Sheridan College certified and trusted by GTA homeowners and real estate agents alike."
        path="/about"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>
      <SplitHero
        media={
          <PlaceholderMedia type="image" src="/media/about/portrait.jpg" alt="Portrait of Chandra Bradley" />
        }
      >
        <div className="flex flex-col gap-6 text-left text-body text-text-muted">
          <p>
            Home Staging Visuals is a Toronto-based studio led by owner and lead stager Chandra Bradley. Her
            journey began at Sheridan College, where she spent 3 years earning her diploma in Visual
            Merchandising and Home Staging. Since then, she has personally styled over 1,000 properties of
            every scale and architectural style across the GTA.
          </p>
          <p>
            A visual artist at heart, Chandra&rsquo;s creative drive extends far beyond her workday. Even in
            her downtime, she loves designing, painting, drawing, and sculpting. It is simply in her nature.
          </p>
          <p>
            As a genuine people and animal lover, Chandra believes staging is a people-first business. Yet, as
            much as she loves the creative process, nothing beats the excitement on a client&rsquo;s face when
            they see their transformed space for the first time. Believing that the smallest details often
            make the biggest impact, she approaches every project with a drive to create environments that
            feel effortless, memorable, and impactful.
          </p>
          <p>
            We&rsquo;re a small, personable team, which means the people who plan your staging are the exact
            same people chopping your pillows on install day. You&rsquo;ll know our names, and we&rsquo;ll
            know your preferences every step of the way.
          </p>
        </div>
        <div className="mt-8">
          <Button href="/contact">Get in touch</Button>
        </div>
      </SplitHero>

      <section aria-label="Stats" className="bg-bg-secondary px-4 py-12 md:px-8 md:py-24">
        <RevealGroup className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-x-8 gap-y-8 text-center md:gap-y-16">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={scrollReveal} className="w-full sm:w-[calc((100%-4rem)/3)]">
              <p className="text-h1-mobile md:text-h1 font-thin text-primary">{stat.value}</p>
              <p className="mt-2 text-small font-thin uppercase tracking-wide text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      <section aria-label="Meet Mica" className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-24">
        <RevealGroup className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
          <motion.div variants={scrollReveal} className="aspect-square overflow-hidden rounded-card">
            <PlaceholderMedia
              type="image"
              src="/media/about/mica.jpg"
              alt="Mica, the studio's Mini Schnauzer and assistant director"
            />
          </motion.div>
          <motion.div variants={scrollReveal}>
            <h2 className="text-h1-mobile md:text-h1 font-extralight text-primary">Mica</h2>
            <p className="mt-2 text-small font-thin uppercase tracking-wide text-text-muted">Assistant Director</p>
            <p className="mt-4 max-w-md text-body text-text-muted">
              Off-site, you&rsquo;ll usually find Chandra accompanied by her Mini Schnauzer, who proudly
              serves as the studio&rsquo;s official &ldquo;assistant director.&rdquo;
            </p>
          </motion.div>
        </RevealGroup>
      </section>
    </div>
  )
}

export default About
