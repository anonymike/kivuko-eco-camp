import { Link } from "react-router-dom";
import Image from "./Image.jsx";
import "./Card.css";

/**
 * One card component drives Stay, Experience, and Package grids — they
 * share identical visual DNA in the screenshots (image, top-left badge,
 * title, one-liner, meta row, arrow link).
 *
 * `image` is a photo object from src/data/imageAssets.js; the media is
 * below the fold on listing pages, so it lazy-loads by default.
 */
const CARD_SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 92vw";

export default function Card({
  to,
  image,
  imageAlt,
  badge,
  title,
  description,
  meta,
  linkLabel = "Explore",
}) {
  return (
    <Link className="card" to={to}>
      <div className="card__media">
        <Image photo={image} alt={imageAlt} sizes={CARD_SIZES} loading="lazy" />
        {badge && <span className="card__badge">{badge}</span>}
      </div>
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        {description && <p className="card__desc">{description}</p>}
        {meta && <p className="card__meta">{meta}</p>}
        <span className="card__link">
          {linkLabel} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
