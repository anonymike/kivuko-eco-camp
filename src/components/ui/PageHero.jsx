import Eyebrow from "./Eyebrow.jsx";
import Image from "./Image.jsx";
import "./PageHero.css";

export default function PageHero({ image, imageAlt, eyebrow, title, badge, subhead, intro }) {
  return (
    <header className="page-hero">
      <div className="page-hero__media">
        {/* Top-of-page on every interior route — the LCP, so it loads eagerly and first. */}
        <Image photo={image} alt={imageAlt} sizes="100vw" fetchPriority="high" />
        <div className="page-hero__scrim" aria-hidden="true" />
        {eyebrow && (
          <div className="page-hero__eyebrow container">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </div>
        )}
      </div>

      <div className="container page-hero__heading-row">
        <h1>{title}</h1>
        {badge && <span className="page-hero__badge">{badge}</span>}
      </div>

      {subhead && (
        <div className="container page-hero__subhead">
          <p className="eyebrow eyebrow--dark">{subhead}</p>
          {intro && <p className="page-hero__intro">{intro}</p>}
        </div>
      )}
    </header>
  );
}
