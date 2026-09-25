import fs from "node:fs"
import path from "node:path"

// Scans public/media/portfolio/flip-design-direction/<project>/{before,after}/
// and exposes the result as the virtual module "virtual:flip-gallery" — one
// entry per project folder (keyed by folder name), each holding a before[]
// and after[] list. Drop media into a project's before/ or after/ folder and
// it appears on the Flip Design Direction page next time the dev server
// picks it up (instant, via the watcher below) or the site is rebuilt.
// Filenames sort numeric-aware, so prefixing with 01/02/03 controls order.
const FLIP_ROOT = "public/media/portfolio/flip-design-direction"
const VIRTUAL_ID = "virtual:flip-gallery"
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"])

function mediaTypeFor(extension) {
  if (IMAGE_EXTENSIONS.has(extension)) return "image"
  if (VIDEO_EXTENSIONS.has(extension)) return "video"
  return null
}

// "01-exterior.jpg" -> "exterior" — strips a leading ordering prefix along
// with the extension, for a plain-language fallback alt text.
function readableNameFor(filename, extension) {
  return path
    .basename(filename, extension)
    .replace(/^\d+[-_]*/, "")
    .replace(/[-_]+/g, " ")
    .trim()
}

function scanMediaDir(dir, urlPrefix, group) {
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((filename) => !filename.startsWith("."))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((filename) => {
      const extension = path.extname(filename).toLowerCase()
      const type = mediaTypeFor(extension)
      if (!type) return null
      const name = readableNameFor(filename, extension)
      return {
        src: `${urlPrefix}/${filename}`,
        type,
        alt: name ? `${group} photo: ${name}` : `${group} photo`,
      }
    })
    .filter(Boolean)
}

function scanFlipRoot(root) {
  const rootDir = path.join(root, FLIP_ROOT)
  if (!fs.existsSync(rootDir)) return {}

  const projects = {}
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue
    const projectDir = path.join(rootDir, entry.name)
    const urlBase = `/media/portfolio/flip-design-direction/${entry.name}`
    projects[entry.name] = {
      before: scanMediaDir(path.join(projectDir, "before"), `${urlBase}/before`, "Before"),
      after: scanMediaDir(path.join(projectDir, "after"), `${urlBase}/after`, "After"),
    }
  }
  return projects
}

export default function flipGalleryPlugin() {
  let root

  return {
    name: "flip-gallery-manifest",
    configResolved(config) {
      root = config.root
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) {
        const projects = scanFlipRoot(root)
        return `export const flipProjectMedia = ${JSON.stringify(projects)}`
      }
    },
    configureServer(server) {
      const dir = path.join(root, FLIP_ROOT)
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
