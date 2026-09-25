import { motion } from "framer-motion"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Outlet, useLocation } from "react-router-dom"
import { MenuProvider } from "../context/MenuContext"
import Footer from "./Footer"
import Nav from "./Nav"
import { SITE_NAME, SITE_URL } from "./Seo"

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: "Home staging and decorating for Toronto and the GTA.",
  url: SITE_URL,
  telephone: "+1-416-859-0707",
  email: "cb.visuals@gmail.com",
  areaServed: ["Toronto", "GTA", "Niagara", "Barrie", "Oshawa"].map((name) => ({
    "@type": "City",
    name,
  })),
}

function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <MenuProvider>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      <Nav />
      <main className="pt-[var(--nav-height)]">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </MenuProvider>
  )
}

export default Layout
