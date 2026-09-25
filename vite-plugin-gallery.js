import fs from "node:fs"
import path from "node:path"

// Scans public/media/portfolio/gallery/ and exposes its contents as the
// virtual module "virtual:gallery" — so the Portfolio masonry grid isn't a
// hardcoded list. Drop an image or video into that folder and it appears
// on the site next time the dev server picks it up (instant, via the watcher
// below) or the site is rebuilt (production). Files are just discovered, not
// copied or processed — same as every other file already served from
// public/media/.
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

function scanGalleryDir(root) {
  const dir = path.join(root, GALLERY_DIR)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((filename) => !filename.startsWith("."))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
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
