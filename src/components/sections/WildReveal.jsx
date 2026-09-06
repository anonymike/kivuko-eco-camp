import { useEffect, useRef } from "react";
import Eyebrow from "../ui/Eyebrow.jsx";
import Button from "../ui/Button.jsx";
import { agamaLizard, largestWebp } from "../../data/imageAssets.js";
import "./WildReveal.css";

/**
 * THE WILD REVEALS ITSELF — Kivuko's one signature scroll moment.
 *
 * As the visitor scrolls into this wilderness section, the landscape
 * starts as a small window in the dark and widens outward while the
 * photograph settles from a subtle zoom — like arriving at the camp's
 * watering hole and watching the conservancy open up. The typography
 * enters only once the image has begun to reveal, in deliberate order:
 * eyebrow, headline, copy, action.
 *
 * Implementation notes:
 *  - Zero React state: the section's scroll progress is written straight
 *    to a CSS custom property (--wild-p) from a rAF-throttled scroll
 *    handler, and the entrance choreography is pure CSS.
 *  - The image is the existing authentic Kivuko photography, served as
 *    it already is elsewhere (largest WebP derivative for a CSS
 *    background — the same pattern the section used before).
 *  - Reduced motion, touch/coarse pointers and narrow viewports skip the
 *    scroll-choreography entirely and render the section statically —
 *    content stays fully visible and the page stays fast.
 */
export default function WildReveal() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse || window.innerWidth < 768) return undefined;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Below the fold: keep the reveal closed so the opening is seamless.
      if (rect.top > vh + 80) {
        section.style.setProperty("--wild-p", "0");
        return;
      }
      // Scrolled past: leave the landscape fully open.
      if (rect.bottom < 0) {
        section.style.setProperty("--wild-p", "1");
        section.classList.add("is-open");
        return;
      }

      // Progress 0 → 1 as the section top travels from 90% → 38% of the
      // viewport height: the image opens slowly and settles before the
      // section reaches the centre of the screen.
      const start = vh * 0.9;
      const end = vh * 0.38;
      const t = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      section.style.setProperty("--wild-p", t.toFixed(4));
      if (t >= 0.18) section.classList.add("is-open");
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="wild-reveal" ref={sectionRef}>
      <div
        className="wild-reveal__bg"
        style={{ backgroundImage: `url(${largestWebp(agamaLizard)})` }}
        aria-hidden="true"
      />
      <div className="container wild-reveal__content">
        <Eyebrow tone="light">The Watering Hole</Eyebrow>
        <h2>Wildlife Comes to You</h2>
        <p>
          At Kivuko, you don&apos;t always have to go looking for the wild. From the camp itself, guests can
          observe wildlife gathering at the watering hole — sometimes before you&apos;ve even finished your
          morning coffee.
        </p>
        <Button to="/experiences/wildlife-encounters" variant="outline" tone="light">
          Discover Wildlife
        </Button>
      </div>
    </section>
  );
}