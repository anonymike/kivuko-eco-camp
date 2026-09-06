import { useEffect, useRef, useState } from "react";

/**
 * Wraps children in an element that enters the first time it reaches the
 * viewport. One quiet IntersectionObserver effect, reused everywhere —
 * intentionally not per-card / per-element to avoid a "confetti of
 * fade-ins" feeling on scroll.
 *
 * `variant` picks the section's visual grammar (see global.css):
 *   "rise"  — fade + gentle rise (default)
 *   "scale" — fade + settle from 0.98 → 1
 *   "mask"  — clip-path reveal for photography (image de-scales into place)
 *   "none"  — state carrier only; children own their own motion
 */
export default function Reveal({ as: Tag = "div", className = "", variant = "rise", children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal reveal--${variant} ${visible ? "is-visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}