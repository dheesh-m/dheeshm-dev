# Portfolio — Dheesh Medekar

Single-page personal portfolio. Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · framer-motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |
| `npx next experimental-analyze` | Bundle analysis — Next 16 no longer prints First Load JS |

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical origin, e.g. `https://example.com`. Drives `metadataBase`, canonical URL, sitemap, robots, and absolute OG image URLs. |

Resolution order is `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` (set automatically by Vercel) → `http://localhost:3000`, so nothing needs configuring for a first deploy. Set `NEXT_PUBLIC_SITE_URL` once a custom domain is attached. See `lib/siteUrl.ts`.

## Deploying

Built for Vercel; import the repo and it deploys with no configuration. Every route is statically prerendered. Node >= 20.9 (`engines` in package.json, `.nvmrc` pins 22).

Security headers, including a Content Security Policy, are set in `next.config.ts` via `headers()`. Two notes before changing them:

- The CSP uses `'unsafe-inline'` rather than a nonce. Nonces must be generated per request, which would opt this page out of static prerendering. It is an acceptable trade here: no third-party scripts, no user input, no auth, no cookies.
- `style-src 'unsafe-inline'` is load-bearing. framer-motion and the custom cursor write inline style attributes every frame; removing it stops all animation.

### Lighthouse (production build)

| | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 |
| Mobile | 91 | 100 | 100 | 100 |

Mobile LCP is ~3.4s under Lighthouse's simulated slow-4G and 4x CPU throttling. It is dominated by render delay while ~113 KB of preloaded webfonts and the JS bundle land; real devices on real networks are considerably faster.

## Structure

```
app/          Routes, layout, metadata (sitemap/robots/manifest/opengraph-image)
components/   Feature-grouped UI
data/         Static content: projects, experience, technologies, socials
lib/          cn() helper, shared motion variants, site URL resolution
```

Content lives in `data/` — edit those files rather than the components.

## Notes for future work

- **`components/background/ParticleNetwork.tsx`** renders both depth layers into one canvas, using a uniform spatial grid for the link pass and batching segments into opacity buckets. Do not re-introduce a second instance or wrap it in a CSS `blur()`; that forces the compositor to re-blur a full-screen animating canvas every frame.
- **Long-running animations are gated on `useInView`** and passed down as an `isAnimating` prop (see `SystemCluster` → `SystemHub` → `SystemNode`). Keep new infinite animations gated the same way.
- **`initial={false}`** on the orbital nodes keeps the server and first client render identical. Reverting it re-introduces a hydration mismatch.
- **Custom cursor** is scoped to `html.has-custom-cursor` in `globals.css`, applied only on fine pointers. Avoid global `cursor: none !important`; it removes the caret from text inputs.
- **Anchor navigation is native.** `scroll-behavior` plus `data-scroll-behavior="smooth"` on `<html>` (required by Next 16) and `scroll-padding-top` keep targets clear of the fixed navbar. Do not re-add `preventDefault()` + `scrollIntoView()`.
- **The hero entry animation is CSS (`.reveal-up`), not framer-motion, on purpose.** The hero holds the LCP element; animating it from `opacity: 0` in JS delayed LCP until the bundle had hydrated, measured at +3.2s of pure render delay on throttled mobile. Keep above-the-fold reveals in CSS.
- **Do not defer `ParticleNetwork` startup.** Moving it to `requestIdleCallback` was measured and regressed Speed Index from 1.6s to 3.5s.
- **Never mutate values during render.** `SystemHub` used to do `ringIndices[ring]++` inside `.map()`; React Compiler memoizes those arrays, so the counters were not reset between the server and client passes and every orbital node hydrated at a different angle.
