import { useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import { galleryCategories, galleryImages } from "../data/gallery.js";
import heroImage from "../assets/images/dining-pavilion-interior-rock.jpg";
import "./Gallery.css";

export default function Gallery() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? galleryImages : galleryImages.filter((img) => img.categories.includes(active));

  return (
    <PageLayout>
      <PageHero
        image={heroImage}
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

          <div className="gallery-grid">
            {visible.map((img) => (
              <div className="gallery-grid__item" key={img.src}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
