import { useState } from "react"
import Button from "./Button"

// A casual, client-side-only gate to keep the unfinished site from showing
// up to the public before it's ready to announce — NOT real security. The
// full site still ships in the built JS bundle regardless of this screen;
// anyone who opens devtools can find it. To change the password, edit
// SITE_PASSWORD below and redeploy.
const SITE_PASSWORD = "Mica1988"
const STORAGE_KEY = "hsv-site-unlocked"

function SiteGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true"
    } catch {
      return false
    }
  })
  const [input, setInput] = useState("")
  const [error, setError] = useState(false)

  if (unlocked) return children

  const handleSubmit = (event) => {
    event.preventDefault()
    if (input === SITE_PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, "true")
      } catch {
        // Private browsing etc. — still unlock for this page load.
      }
      setUnlocked(true)
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form onSubmit={handleSubmit} className="flex w-full max-w-xs flex-col gap-4 text-center">
        <p className="font-logo text-lg font-[300] uppercase tracking-wide text-primary">Home Staging Visuals</p>
        <p className="text-body text-text-muted">This site is being finished up. Enter the password to preview it.</p>
        <input
          type="password"
          value={input}
          onChange={(event) => {
            setInput(event.target.value)
            setError(false)
          }}
          autoFocus
          className="rounded-input border border-secondary bg-bg px-4 py-3 text-center text-body text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Password"
        />
        {error && <p className="text-small text-error">That's not it — try again.</p>}
        <Button type="submit">Enter</Button>
      </form>
    </div>
  )
}

export default SiteGate
