import Eyebrow from "./Eyebrow.jsx";
import "./PageHero.css";

export default function PageHero({ image, imageAlt, eyebrow, title, badge, subhead, intro }) {
  return (
    <header className="page-hero">
      <div className="page-hero__media">
        <img src={image} alt={imageAlt} />
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
