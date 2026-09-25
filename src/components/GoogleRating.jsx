import { Star } from "lucide-react"
import { GoogleLogo } from "./SocialIcons"

// Snapshot of the business's real Google rating (source: the Google Business
// Profile linked below). Google doesn't offer a free, key-less way to pull
// this live from a static site — a truly live number needs the paid Google
// Places API — so this is a manual snapshot to refresh occasionally, same
// as the "13+ years / 1000+ properties" stats above the fold.
//
// Last verified: 2026-08-30 (was 4.4/7 before this check — it does drift,
// so re-check her profile at PROFILE_URL every so often and bump these two
// numbers + this date).
const RATING = 4.5
const REVIEW_COUNT = 8
const PROFILE_URL = "https://share.google/unp9GlgH3zpbfVs9p"

function GoogleRating() {
  const fillPercent = Math.max(0, Math.min(100, (RATING / 5) * 100))

  return (
    <a
      href={PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-5 transition-opacity hover:opacity-70"
    >
      <GoogleLogo className="h-6 w-6 shrink-0" />
      <div className="flex flex-col gap-1">
        <span className="text-small font-extralight uppercase tracking-wide text-text-muted">Google Rating</span>
        <div className="flex items-center gap-2">
          <span className="text-body font-extralight text-primary">{RATING.toFixed(1)}</span>
          <span className="relative inline-flex" aria-hidden="true">
            <span className="flex gap-0.5 text-secondary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span
              className="absolute inset-0 flex gap-0.5 overflow-hidden text-primary"
              style={{ width: `${fillPercent}%` }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 shrink-0" fill="currentColor" strokeWidth={0} />
              ))}
            </span>
          </span>
        </div>
      </div>
      <span className="sr-only">
        {RATING.toFixed(1)} out of 5 on Google, from {REVIEW_COUNT} reviews. Opens Google review profile in a new tab.
      </span>
    </a>
  )
}

export default GoogleRating
