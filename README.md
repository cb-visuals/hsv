# Home Staging Visuals

Marketing site for Home Staging Visuals (Chandra Bradley), Toronto/GTA home staging. React 19 + Vite + Tailwind CSS v4.

## Commands

```bash
npm install       # first-time setup
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build -> dist/
npm run lint      # oxlint
```

## Self-serve content

A lot of media on this site is drop-in-and-it-appears, no code changes needed. See `content-checklist.md` for the full rundown, but in short:

- **Home hero video(s)** — `public/media/home/hero/`. Drop in one or more clips; they cycle automatically with a crossfade + slow zoom. Prefix filenames (`01-`, `02-`, …) to control order.
- **Portfolio masonry grid** — `public/media/portfolio/gallery/`.
- **Vacant/Occupied before-afters** — `public/media/portfolio/<vacant-properties|occupied-properties>/`, as matched pairs: `slider-01-before.jpg` + `slider-01-after.jpg`, `slider-02-before.jpg` + `slider-02-after.jpg`, etc.
- **Flip Design Direction galleries** — `public/media/portfolio/flip-design-direction/<project>/before/` and `.../after/`.

All of these are numeric-aware sorted by filename — use two-digit prefixes (`01`, not `1`) for predictable ordering past 9 items.

**Important:** dropping a file into one of these folders only updates the site once that change is committed, pushed, and rebuilt — see Deployment below. It's not a live filesystem the site reads at request time.

## Site password gate

The whole site is behind a simple client-side password screen (`src/components/SiteGate.jsx`) — this is **not real security**, just something to keep it from showing up to casual visitors before launch. The password is a plain constant in that file (`SITE_PASSWORD`); change it there and redeploy. Remove the `<SiteGate>` wrapper in `src/App.jsx` once the site is ready to be fully public.

## Deployment (GitHub Pages)

This repo deploys to **bycb.ca** via GitHub Pages, using the GitHub Actions workflow at `.github/workflows/deploy.yml`. Every push to `main` triggers a build and redeploy automatically — no manual build/upload step.

One-time setup (already done if you're reading this after that point, but documented in case the repo is ever recreated):

1. **Enable Pages in the repo settings**: Settings → Pages → Source → set to "GitHub Actions" (not "Deploy from a branch").
2. **Point the domain's DNS at GitHub Pages**. In the DNS settings for `bycb.ca` (wherever it's registered), add these four **A records** for the apex/root domain:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   (Optionally add the matching AAAA/IPv6 records too: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.)
3. In the repo's Settings → Pages, add `bycb.ca` as the custom domain and enable "Enforce HTTPS" once GitHub finishes issuing the certificate (can take a few minutes to a few hours after DNS propagates).

The `public/CNAME` file already in this repo tells GitHub Pages which domain to serve; don't delete it. `public/404.html` plus the small script in `index.html` are what make React Router's client-side routes (e.g. `/about`) work correctly on GitHub Pages, which has no server-side rewrites of its own — don't remove either without replacing that mechanism.
