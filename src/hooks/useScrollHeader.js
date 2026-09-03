import { useEffect, useState } from "react";

/**
 * Returns true once the page has scrolled past `threshold` px, so the
 * header can switch from transparent-over-hero to a solid dark bar —
 * matching the behaviour visible between the top and scrolled states
 * of the reference screenshots.
 */
export default function useScrollHeader(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
