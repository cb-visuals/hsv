import { useState } from "react"
import { ChevronsLeftRight } from "lucide-react"
import PlaceholderMedia from "./PlaceholderMedia"

function BeforeAfterSlider({ before, after, label, className = "" }) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-card shadow-sm ${className}`}>
      <div className="absolute inset-0">
        <PlaceholderMedia type={after.type} src={after.src} alt={after.alt} />
      </div>

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <div className="h-full" style={{ width: position === 0 ? 0 : `${(100 / position) * 100}%` }}>
          <PlaceholderMedia type={before.type} src={before.src} alt={before.alt} />
        </div>
      </div>

      <span
        className={`pointer-events-none absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-thin uppercase tracking-wide text-bg transition-opacity duration-200 ${
          isDragging ? "opacity-100" : "opacity-0"
        }`}
      >
        Before
      </span>
      <span
        className={`pointer-events-none absolute top-4 right-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-thin uppercase tracking-wide text-bg transition-opacity duration-200 ${
          isDragging ? "opacity-100" : "opacity-0"
        }`}
      >
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-bg"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />
      <div
        className={`pointer-events-none absolute top-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-bg text-primary shadow-md transition-transform ${
          isDragging ? "scale-110" : "scale-100"
        }`}
        style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
      >
        <ChevronsLeftRight className="h-4 w-4" aria-hidden="true" />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerCancel={() => setIsDragging(false)}
        aria-label={label ? `Drag to compare before and after: ${label}` : "Drag to compare before and after"}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus:outline-none"
      />
    </div>
  )
}

export default BeforeAfterSlider
