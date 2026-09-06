import { useEffect, useRef } from "react";

/**
 * Very restrained scroll parallax for a single full-bleed image.
 *
 * The element is kept scaled (1.12) and translated a few dozen pixels
 * against the scroll direction, so the photograph appears to settle more
 * slowly than the page — a quiet depth cue, never a showpiece. Attach
 * the returned ref to an <Image> (or any element) whose parent clips
 * overflow.
 *
 * Safety:
 *  - disabled under prefers-reduced-motion
 *  - disabled on touch/coarse pointers and small screens (mobile stays
 *    flat and fast)
 *  - rAF-throttled, passive listeners, transform-only (no layout cost)
 */
export default function useParallax({ strength = 0.06, max = 26 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse || window.innerWidth < 768) return undefined;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let y;
      if (rect.bottom < 0) {
        y = max; // fully scrolled past
      } else if (rect.top > vh) {
        y = -max; // not yet reached
      } else {
        const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
        y = Math.max(-max, Math.min(max, progress * strength * vh * -1));
      }
      // Scale is always applied so the photograph never visibly jumps
      // when it first enters the viewport.
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(1.12)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    el.style.willChange = "transform";
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, max]);

  return ref;
}