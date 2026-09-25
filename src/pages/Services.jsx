import Seo from "../components/Seo"
import ServiceRow from "../components/ServiceRow"

const services = [
  {
    id: "consultations",
    name: "Consultations",
    description:
      "A strategy session where we visit and assess your property to recommend the best approach. We leave you feeling like you have a clear roadmap, key decisions made, and a lot of questions answered. After that we deliver custom quotes and resources to get started.",
    idealFor: "Quick Guidance",
    image: "/media/services/consultations.jpg",
  },
  {
    id: "vacant-staging",
    name: "Vacant Home Staging",
    description:
      "Empty spaces? We fill rooms with warmth and purpose so buyers see the potential and value.",
    idealFor: "Vacant Listings",
    image: "/media/services/vacant-staging.jpg",
  },
  {
    id: "occupied-staging",
    name: "Occupied Home Staging",
    description:
      "For home owners who are still living in the space while it's being sold and have some pieces to work with. We interpret the pieces that are helping and the pieces that are hurting, rearrange, and add the right finishing touches.",
    idealFor: "Occupied Homes",
    image: "/media/services/occupied-staging.jpg",
  },
  {
    id: "flip-design-direction",
    name: "Flip Design Direction",
    description:
      "Renovating to sell? Bring us in early. It shows in the sale price. We choose the finishes, hold the palette together, and stage the finished home so the numbers land where they should.",
    idealFor: "Flips & Renovations",
    image: "/media/services/flip-design-direction.jpg",
  },
  {
    id: "new-build-design",
    name: "New Build Design Direction",
    description:
      "Need help deciding on the finishes for your new home? We'll join you on site or accompany you to builder design meetings to guide you through every selection.",
    idealFor: "New Builds",
    image: "/media/services/new-build-design.jpg",
  },
  {
    id: "interior-styling",
    name: "Interior Styling",
    description:
      "For home owners that want to stay and love their space. We work with you to make your space uniquely yours from small changes to big ones.",
    idealFor: "Occupied Homes",
    image: "/media/services/interior-styling.jpg",
  },
  {
    id: "airbnb-styling",
    name: "Airbnb Styling",
    description:
      "Stand out in a crowded market and maximize your daily rates with our turnkey Airbnb styling service. We handle every step of the process, from space planning and furniture layout to full-scale shopping, delivery coordination, and final staging. Our team knows exactly which special touches elevate guest reviews without blowing your budget. We curate durable, beautiful, and cost-effective pieces that photograph brilliantly, creating an irresistible listing that books fast and delivers maximum return on investment.",
    idealFor: "Short-Term Rentals",
    image: null,
  },
  {
    id: "model-home-styling",
    name: "Model Home Styling",
    description:
      "Whether you need a permanent setup to welcome prospective buyers or a short-term design for an upcoming shoot, we bring your architecture to life with high-impact stylings.",
    idealFor: "Model Homes",
    image: null,
  },
]

function Services() {
  return (
    <div>
      <Seo
        title="Services"
        description="Interior styling, design direction, and home staging services in Toronto and the GTA, for new builds, flips, occupied homes, and vacant listings."
        path="/services"
      />
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-24">
        <h1 className="text-h1-mobile md:text-h1 font-extralight text-primary">Services</h1>
      </div>

      <div>
        {services.map((service) => (
          <ServiceRow key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

export default Services
