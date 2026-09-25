import fs from "node:fs"
import path from "node:path"

// Scans public/media/portfolio/<category>/ for slider-N-before.* /
// slider-N-after.* pairs and exposes them as the virtual module
// "virtual:slider-gallery" — one array per category slug, sorted by N. Drop
// a new pair into a category's folder (e.g. slider-42-before.jpg and
// slider-42-after.jpg) and a new slider appears automatically; the number
// just needs to match between the before and after half of a pair, and an
// unpaired file (no matching before/after) is skipped rather than shown
// broken.
const PORTFOLIO_ROOT = "public/media/portfolio"
const CATEGORY_SLUGS = ["vacant-properties", "occupied-properties"]
const VIRTUAL_ID = "virtual:slider-gallery"
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"])

function mediaTypeFor(extension) {
  if (IMAGE_EXTENSIONS.has(extension)) return "image"
  if (VIDEO_EXTENSIONS.has(extension)) return "video"
  return null
}

const SLIDER_FILENAME = /^slider-(\d+)-(before|after)\.[^.]+$/i

function scanCategoryDir(root, categorySlug) {
  const dir = path.join(root, PORTFOLIO_ROOT, categorySlug)
  if (!fs.existsSync(dir)) return []

  const pairs = new Map()

  for (const filename of fs.readdirSync(dir)) {
    if (filename.startsWith(".")) continue
    const match = filename.match(SLIDER_FILENAME)
    if (!match) continue

    const extension = path.extname(filename).toLowerCase()
    const type = mediaTypeFor(extension)
    if (!type) continue

    const [, number, side] = match
    const pair = pairs.get(number) ?? {}
    pair[side.toLowerCase()] = { src: `/media/portfolio/${categorySlug}/${filename}`, type }
    pairs.set(number, pair)
  }

  return Array.from(pairs.entries())
    .filter(([, pair]) => pair.before && pair.after)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([, pair]) => pair)
}

function scanAllCategories(root) {
  const galleries = {}
  for (const slug of CATEGORY_SLUGS) {
    galleries[slug] = scanCategoryDir(root, slug)
  }
  return galleries
}

export default function sliderGalleryPlugin() {
  let root

  return {
    name: "slider-gallery-manifest",
    configResolved(config) {
      root = config.root
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) {
        const galleries = scanAllCategories(root)
        return `export const sliderGalleries = ${JSON.stringify(galleries)}`
      }
    },
    configureServer(server) {
      const dirs = CATEGORY_SLUGS.map((slug) => path.join(root, PORTFOLIO_ROOT, slug))
      for (const dir of dirs) {
        fs.mkdirSync(dir, { recursive: true })
        server.watcher.add(dir)
      }
      server.watcher.on("all", (_event, changedPath) => {
        if (!dirs.some((dir) => changedPath.startsWith(dir))) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: "full-reload" })
      })
    },
  }
}
