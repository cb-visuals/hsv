import { Helmet } from "react-helmet-async"

export const SITE_NAME = "Home Staging Visuals"
export const SITE_URL = "https://www.bycb.ca"
const OG_IMAGE = `${SITE_URL}/og-image.svg`

function Seo({ title, description, path = "/" }) {
  const fullTitle = `${title} | ${SITE_NAME} | Toronto Home Staging`
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  )
}

export default Seo
