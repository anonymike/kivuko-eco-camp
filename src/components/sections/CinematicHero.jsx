import { useEffect, useState } from "react";
import Eyebrow from "../ui/Eyebrow.jsx";
import StatStrip from "../ui/StatStrip.jsx";
import Button from "../ui/Button.jsx";
import dawnRock from "../../assets/images/camp-tents-exterior-rock.jpg";
import duskCamp from "../../assets/images/dining-pavilion-exterior.jpg";
import { brand } from "../../data/siteConfig.js";
import "./CinematicHero.css";

/**
 * The brief asks for a 6–8s cinematic dawn-rock -> sunset-camp
 * transition. The two supplied photo sets don't include a dedicated
 * dawn/sunset campaign pair, so this uses the two closest authentic,
 * unedited Kivuko photographs available (rock-formation tents by day,
 * and the rock-shaded dining pavilion at dusk) with a slow crossfade +
 * gentle Ken Burns drift. Swap `dawnRock` / `duskCamp` for dedicated
 * hero photography as soon as it's supplied — nothing else changes.
 */
export default function CinematicHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;
    const id = setInterval(() => setActive((v) => (v === 0 ? 1 : 0)), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="cinematic-hero">
      <div className="cinematic-hero__frame">
        <img
          src={dawnRock}
          alt="Kivuko camp tents beneath the rock formation"
          className={`cinematic-hero__img ${active === 0 ? "is-active" : ""}`}
        />
        <img
          src={duskCamp}
          alt="Kivuko's rock-sheltered dining pavilion at dusk"
          className={`cinematic-hero__img ${active === 1 ? "is-active" : ""}`}
        />
        <div className="cinematic-hero__scrim" aria-hidden="true" />
      </div>

      <div className="container cinematic-hero__content">
        <Eyebrow tone="light">Taita Wildlife Conservancy · Kenya</Eyebrow>
        <h1>{brand.taglineSite}</h1>
        <p>{brand.blurb}</p>
        <div className="cinematic-hero__actions">
          <Button to="/book" variant="filled">
            Book Your Escape
          </Button>
          <Button to="/about" variant="outline" tone="light">
            Explore Kivuko
          </Button>
        </div>
      </div>

      <div className="container cinematic-hero__stats">
        <StatStrip items={["8 Private Units", "Full Board", "Wilderness", "Mt. Kasigau"]} />
      </div>
    </section>
  );
}
