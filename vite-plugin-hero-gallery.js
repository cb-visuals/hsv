import fs from "node:fs"
import path from "node:path"

// Scans public/media/home/hero/ for video clips and exposes them as the
// virtual module "virtual:hero-gallery" — the Home hero cycles through
// them in filename order (numeric-aware, so prefix with 01/02/03 to control
// order), crossfading with a slow Ken Burns zoom between clips. Drop
// another clip into that folder and it joins the rotation automatically —
// no code changes needed.
const HERO_DIR = "public/media/home/hero"
const VIRTUAL_ID = "virtual:hero-gallery"
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"])

function scanHeroDir(root) {
  const dir = path.join(root, HERO_DIR)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((filename) => !filename.startsWith("."))
    .filter((filename) => VIDEO_EXTENSIONS.has(path.extname(filename).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((filename) => `/media/home/hero/${filename}`)
}

export default function heroGalleryPlugin() {
  let root

  return {
    name: "hero-gallery-manifest",
    configResolved(config) {
      root = config.root
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) {
        const videos = scanHeroDir(root)
        return `export const heroVideos = ${JSON.stringify(videos)}`
      }
    },
    configureServer(server) {
      const dir = path.join(root, HERO_DIR)
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
