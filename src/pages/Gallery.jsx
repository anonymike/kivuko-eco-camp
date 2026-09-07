import { useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Image from "../components/ui/Image.jsx";
import { galleryCategories, galleryImages } from "../data/gallery.js";
import { diningPavilionInterior } from "../data/imageAssets.js";
import "./Gallery.css";

// Each tile is roughly a third / half / full column width.
const TILE_SIZES = "(min-width: 1024px) 32vw, (min-width: 640px) 49vw, 96vw";

export default function Gallery() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? galleryImages : galleryImages.filter((img) => img.categories.includes(active));

  return (
    <PageLayout>
      <PageHero
        image={diningPavilionInterior}
        imageAlt="Kivuko photo gallery"
        eyebrow="Gallery"
        title="Kivuko, in Pictures"
        badge="Photography"
        subhead="Moments from Camp"
      />

      <section>
        <div className="container">
          <div className="gallery-filters" role="group" aria-label="Filter gallery by category">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`gallery-filters__btn ${active === cat ? "is-active" : ""}`}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* key={active} re-runs the entrance when a filter is chosen, so
              each category reads as its own chapter of the visual story. */}
          <div className="gallery-grid" key={active}>
            {visible.map((img, i) => (
              <Reveal
                as="div"
                variant="none"
                className="gallery-grid__item"
                key={img.photo.src}
                style={{
                  aspectRatio: `${img.photo.width} / ${img.photo.height}`,
                  transitionDelay: `${Math.min(i, 9) * 70}ms`,
                }}
              >
                <Image photo={img.photo} alt={img.alt} sizes={TILE_SIZES} loading="lazy" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
