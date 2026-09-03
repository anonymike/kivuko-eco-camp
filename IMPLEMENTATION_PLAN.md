# Kivuko Eco Camp — Implementation Plan

## 1. Routes
Public: / , /stay , /stay/:slug , /experiences , /experiences/:slug , /dining ,
/packages , /conservation , /about , /location , /gallery , /contact
Utility: /book (redirects to /contact), * (404, conservative/minimal)
NOT built: /login /register /admin/* /staff (out of scope per brief)

## 2. Reusable components
Layout: Header, Footer, WhatsAppBubble, PageLayout
UI: Button, Eyebrow, StatStrip, SectionIntro, PageHero, Hero, Card, CardGrid,
    InfoCard, EnquiryForm, PlaceholderNotice
Hooks: useScrollHeader (transparent->solid), useReveal (IntersectionObserver
  fade/rise-in, respects prefers-reduced-motion)

## 3. Page-specific components
Home: CinematicHero (dawn->sunset crossfade), WateringHoleFeature,
      OccasionList, ProximityStrip, SundownerFeature
Stay/Experiences/Packages: shared Card/CardGrid variants via data-driven props
Location: MapEmbedPlaceholder, GettingHereList
Contact: EnquiryForm, CallbackForm, ReservationTermsPanel

## 4. Data/content files (src/data)
siteConfig.js (contacts, nav, footer copy), stay.js, experiences.js,
packages.js, dining.js, location.js, testimonialsPlaceholder.js (empty/off
until real content exists)
All copy sourced from the provided documentation only — nothing invented
beyond conservative, generic connective phrasing in the established voice.

## 5. Responsive behavior
Mobile-first CSS with tokens.css custom properties; 3 breakpoints
(480 / 768 / 1024 / 1280). Header collapses to hamburger below 1024px,
same brand mark + CTA retained. Card grids: 3-col desktop -> 2-col tablet
-> 1-col mobile.

## 6. Animation / scroll interactions (Scrollcraft-inflected, restrained)
- One orchestrated hero moment on Home: slow dawn->sunset crossfade + gentle
  Ken Burns drift (8s), pauses on reduced-motion.
- Header background fades in on scroll past hero.
- Section entrances: single subtle fade/rise per section on first view,
  not per-card.
- No parallax gimmicks, no hover effects beyond simple existing states
  (card image scale on hover, underline on links) already implied by the
  screenshots' cursor affordances.

## 7. Assets
Only authentic supplied photography used (src/assets/images). No AI-generated
imagery introduced. Home hero uses the two most suitable authentic images
available; flagged in code comments as placeholder-quality pending dedicated
dawn/sunset campaign photography.

## 8. Fonts
No original font files/CSS were provided (Base44 screenshots only show
rendered text, no extractable @font-face). Closest documented substitutes,
loaded self-hosted-ready via @fontsource-style imports (with system-font
fallback stack so the project works before those packages are installed):
- Display/serif: "Fraunces" (warm, editorial slab-serif energy matching the
  screenshots' headline weight/tracking)
- Body/sans: "Neue Haas Grotesk"-style fallback -> "Inter" (clean, neutral,
  matches the screenshots' body/nav sans)
Documented in src/styles/tokens.css with a comment on how to swap once real
brand fonts are supplied.
