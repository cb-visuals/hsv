import fs from "node:fs"
import path from "node:path"

// Scans public/media/portfolio/gallery/ and exposes its contents as the
// virtual module "virtual:gallery" — so the Portfolio masonry grid isn't a
// hardcoded list. Drop an image or video into that folder and it appears
// on the site next time the dev server picks it up (instant, via the watcher
// below) or the site is rebuilt (production). Files are just discovered, not
// copied or processed — same as every other file already served from
// public/media/.
//
// Order is randomized on every scan (dev reload / production build), with
// videos spaced evenly across the photos rather than left to sort by
// filename — otherwise camera-timestamp video filenames all sort together
// and show up as one clump instead of spread through the grid.
const GALLERY_DIR = "public/media/portfolio/gallery"
const VIRTUAL_ID = "virtual:gallery"
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"])

function mediaTypeFor(extension) {
  if (IMAGE_EXTENSIONS.has(extension)) return "image"
  if (VIDEO_EXTENSIONS.has(extension)) return "video"
  return null
}

// "living-room_02.jpg" -> "living room 02" — a plain-language fallback alt
// text derived from the filename, since dropped-in files won't come with
// their own descriptive alt text.
function altTextFor(filename, extension) {
  const name = path.basename(filename, extension).replace(/[-_]+/g, " ").trim()
  return name ? `Home staging photo — ${name}` : "Home staging photo"
}

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// Spaces `rare` items evenly across `common` (e.g. videos through photos) so
// they never cluster together — a plain shuffle of everything can still land
// several videos in a row by chance, especially with this many of them.
function interleave(common, rare) {
  if (rare.length === 0) return common
  const result = [...common]
  const step = result.length / rare.length
  rare.forEach((item, i) => {
    const position = Math.min(Math.round(step * (i + 0.5)), result.length)
    result.splice(position, 0, item)
  })
  return result
}

function scanGalleryDir(root) {
  const dir = path.join(root, GALLERY_DIR)
  if (!fs.existsSync(dir)) return []

  const items = fs
    .readdirSync(dir)
    .filter((filename) => !filename.startsWith("."))
    .map((filename) => {
      const extension = path.extname(filename).toLowerCase()
      const type = mediaTypeFor(extension)
      if (!type) return null
      return {
        src: `/media/portfolio/gallery/${filename}`,
        type,
        alt: altTextFor(filename, extension),
      }
    })
    .filter(Boolean)

  const photos = shuffle(items.filter((item) => item.type === "image"))
  const videos = shuffle(items.filter((item) => item.type === "video"))
  return interleave(photos, videos)
}

export default function galleryPlugin() {
  let root

  return {
    name: "gallery-manifest",
    configResolved(config) {
      root = config.root
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) {
        const items = scanGalleryDir(root)
        return `export const galleryItems = ${JSON.stringify(items)}`
      }
    },
    configureServer(server) {
      const dir = path.join(root, GALLERY_DIR)
      fs.mkdirSync(dir, { recursive: true })
      server.watcher.add(dir)
      server.watcher.on("all", (_event, changedPath) => {
        if (!changedPath.startsWith(dir)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: "full-reload" })
      })
    },
  }
}
