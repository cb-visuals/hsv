# Client Content Checklist

Everything on the site that's currently placeholder, plus everywhere real copy/photos/info still need to come from the client. Grouped by type; "Resolved" section at the bottom covers what her Google Doc + PDF already took care of.

## Photos & video

| Location | Current | Needed |
|---|---|---|
| Home hero | Stock clips in `media/home/hero/` | Self-serve: drop as many real walkthrough clips into that folder as she wants — they cycle automatically with a crossfade and slow zoom between them, in filename order, no code changes needed |
| About portrait | Stock photo (`media/about/portrait.jpg`) | A real photo of her (headshot or environmental) |
| About — Mica section | Real photo (`media/about/mica.jpg`) | Good for now — she can drop in a better photo of Mica any time |
| Services — Airbnb Styling & Model Home Styling | Icon placeholders (new rows added from her content doc) | One representative photo per service, dropped into `media/services/` |
| Services — other 6 rows | Stock photos (`media/services/`) | One representative photo per service |
| Portfolio before/afters (Vacant + Occupied) | Stock "before" and "after" pairs (`media/portfolio/vacant-properties/`, `media/portfolio/occupied-properties/`) | Self-serve, same as the Flip galleries: drop in `slider-01-before.jpg` + `slider-01-after.jpg`, `slider-02-before.jpg` + `slider-02-after.jpg`, and so on — each matching pair of numbers becomes a slider, in that numeric order. As many pairs as she wants, no code changes needed |
| Flip Design Direction — 47 Westholme, 27 Fisken, 125 Brookside | Stock placeholders in `media/portfolio/flip-design-direction/<project>/before/` and `.../after/` | Self-serve: drop her real before/after photos or video into each project's `before`/`after` folder and they appear automatically, click-to-expand included — no code changes needed |
| Portfolio masonry grid | `media/portfolio/gallery/` | Her own photos/videos, dropped into that folder — self-serve, no code changes needed |

**Photo ordering:** files display in filename order, so to control the order anywhere above, prefix filenames with a number: `01-living-room.jpg`, `02-kitchen.jpg`, `03-bathroom.jpg`, up to `20-...`. Stick to two digits throughout a given folder (`01`, `02`, … `20`, not a mix like `1` and `01`) so the order stays predictable. Everything else about the filename can stay whatever it already is.

## Not placeholder (already real — proofread only)

- Domain: bycb.ca, hosted on GitHub Pages (see README.md for the deploy setup) — `SITE_URL` in `src/components/Seo.jsx`
- Phone: (416) 859-0707, Email: cb.visuals@gmail.com — footer, Contact page, schema
- Social links: Instagram + Facebook (real URLs, `src/data/socialLinks.js` — one shared list, shows everywhere). TikTok still to add once that account exists.
- Hours: Mon–Sun, 9am–9pm; Service area: Toronto/GTA, Niagara, Barrie, Oshawa
- About bio, credentials, and stats (Sheridan College diploma, 13+ years, 1000+ properties)
- Press mentions (Global News — The Morning Show, Toronto Star) — confirmed real by her content doc, no longer a liability flag
- Services copy (8 items, including the 2 newly added: Airbnb Styling, Model Home Styling)
- Portfolio landing/Vacant/Occupied copy and slider prompts
- Flip Design Direction page: intro, 4-phase process, and all 3 case-study write-ups (47 Westholme, 27 Fisken, 125 Brookside)
- Home page: both pull-quotes, stats, press mentions
- All 15 real client testimonials (Google, Facebook, email, text, WhatsApp) — 6 curated for the homepage rotator, full set on `/testimonials`. Note: Renee's quote was lightly cleaned up (dropped a swear word) for the public site — flag if she'd rather it read differently or be left off entirely.
- Contact page FAQ (11 Q&As) and direct-contact layout (call/text/email cards) — replaces the old lead-gen form per her vision

## Ongoing maintenance (real, but drifts over time)

| Location | What it is | Cadence |
|---|---|---|
| Google Rating widget (footer) | A hardcoded snapshot of her real Google rating/review count (`src/components/GoogleRating.jsx`) — it can't pull live from a static site for free, so it's manually updated. Last verified 2026-08-30: 4.5★, 8 reviews | Check her profile every couple of months and bump the two numbers + the "last verified" date if it's changed |
