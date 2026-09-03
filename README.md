# Kivuko Eco Camp — Frontend

A faithful React + Vite rebuild of the Kivuko Eco Camp site, based on the
team's Base44 prototype screenshots and the brand documentation. See
`IMPLEMENTATION_PLAN.md` for the routes/components/data breakdown.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

> This project was authored in a sandboxed environment without npm
> registry access, so `npm install` / `npm run dev` have **not** been run
> or visually verified yet. Please run a full local check (dev server +
> a pass on desktop/tablet/mobile widths) before treating this as launch
> ready. The code has been manually reviewed for syntax correctness and
> consistent imports, but a real build is the next step.

## What's implemented

- All public routes from the sitemap: Home, Stay (+ detail), Experiences
  (+ detail), Dining, Packages, Conservation, About, Location, Gallery,
  Contact/Book.
- Shared design system (`src/styles/tokens.css`) matching the documented
  palette, plus a responsive header (transparent-over-hero → solid on
  scroll, with a conservative mobile hamburger menu) and a first-pass
  footer.
- All imagery is the authentic photography you supplied — nothing
  AI-generated. See `src/assets/images/` and `src/data/*.js` for how
  each photo is used.
- Enquiry and callback forms on `/contact` are fully built UI with
  placeholder submit handlers (`// TODO` comments mark exactly where to
  wire in a real backend).
- No Supabase, auth, booking backend, CMS, payments, or admin — all left
  as clean placeholders per the brief.

## Known gaps / things to confirm before launch

- **Footer** — built from the documentation only; no reference
  screenshot was supplied. Treat `src/components/layout/Footer.jsx` as a
  first draft and adjust against a real screenshot when available.
- **Fonts** — no font files or CSS were recoverable from the Base44
  prototype. Fraunces (display) + Inter (body) are used as the closest
  documented substitutes, loaded via Google Fonts in `index.html`. Swap
  the two `--font-*` values in `src/styles/tokens.css` if the real brand
  fonts become available — nothing else needs to change.
- **Home hero imagery** — the brief asked for a dawn-rock → sunset-camp
  cinematic transition. No dedicated dawn/sunset campaign pair was
  supplied, so `CinematicHero.jsx` crossfades the two closest authentic
  photos available. Swap `dawnRock` / `duskCamp` in that file when real
  hero photography is ready.
- **Map embed** on `/location` is a clearly labelled placeholder block,
  not a live Google Maps embed.
- **Stay / Dining / Conservation / About / Gallery / Contact** pages
  were built conservatively from the documentation's page-by-page spec
  (§3), reusing the exact visual system from the screenshots — they
  have not been checked against real screenshots of those pages because
  none were provided.
