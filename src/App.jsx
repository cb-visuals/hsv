import { MotionConfig } from "framer-motion"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import SiteGate from "./components/SiteGate"
import About from "./pages/About"
import Contact from "./pages/Contact"
import FlipDesignDirection from "./pages/FlipDesignDirection"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import PortfolioCategoryPage from "./pages/PortfolioCategoryPage"
import Services from "./pages/Services"
import Testimonials from "./pages/Testimonials"

function App() {
  return (
    <SiteGate>
      <HelmetProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="portfolio/flip-design-direction" element={<FlipDesignDirection />} />
                <Route path="portfolio/:slug" element={<PortfolioCategoryPage />} />
                <Route path="contact" element={<Contact />} />
                <Route path="testimonials" element={<Testimonials />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MotionConfig>
      </HelmetProvider>
    </SiteGate>
  )
}

export default App
