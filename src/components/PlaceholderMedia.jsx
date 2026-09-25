import { ImageIcon, VideoIcon } from "lucide-react"

function PlaceholderMedia({ type = "image", src, alt = "", className = "", onMediaLoad }) {
  if (src) {
    if (type === "video") {
      return (
        <video
          src={src}
          className={`h-full w-full object-cover ${className}`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedMetadata={onMediaLoad}
        />
      )
    }

    return (
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        onLoad={onMediaLoad}
      />
    )
  }

  const Icon = type === "video" ? VideoIcon : ImageIcon

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center bg-bg-secondary ${className}`}
    >
      <Icon className="h-8 w-8 text-text-muted" aria-hidden="true" />
      {import.meta.env.DEV && (
        <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-thin uppercase tracking-wide text-bg">
          Placeholder
        </span>
      )}
    </div>
  )
}

export default PlaceholderMedia
