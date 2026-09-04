import { getGallery, getGalleryCategories } from "../../services/contentService.js";
import Image from "../../components/ui/Image.jsx";

const THUMB_SIZES = "(min-width: 700px) 22vw, 46vw";

/**
 * Gallery / media management — today a read-only view of existing
 * images. Upload, reorder, and publish/unpublish will be added when
 * a storage backend (Supabase Storage or similar) is connected.
 */
export default function AdminGallery() {
  const images = getGallery();
  const categories = getGalleryCategories();

  return (
    <div>
      <header style={{ marginBottom: "var(--space-4)" }}>
        <h1 style={{ fontSize: "var(--step-h2)" }}>Gallery</h1>
        <p style={{ marginTop: "0.5em", maxWidth: "42rem" }}>
          Current photo set. Image upload, reorder, and publish/unpublish will be available once Supabase Storage is connected.
        </p>
      </header>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "var(--space-3)" }}>
        {categories.map((cat) => (
          <span
            key={cat}
            style={{
              padding: "0.3em 0.8em",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              background: "var(--color-sand)",
              color: "var(--color-forest)",
              border: "1px solid var(--color-line)",
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "var(--space-3)" }}>
        {images.map((img) => (
          <div key={img.alt} style={{ background: "var(--color-cream)", border: "1px solid var(--color-line)" }}>
            <div style={{ aspectRatio: "3/2", overflow: "hidden", background: "var(--color-forest)" }}>
              <Image photo={img.photo} alt={img.alt} sizes={THUMB_SIZES} loading="lazy" />
            </div>
            <div style={{ padding: "var(--space-2)" }}>
              <p style={{ fontSize: "0.8rem", color: "var(--color-ink-soft)" }}>{img.alt}</p>
              <p style={{ fontSize: "0.7rem", color: "var(--color-ink-soft)", marginTop: "0.3em" }}>
                {img.categories?.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}