import { buildSrcSet } from "../../data/imageAssets.js";

/**
 * Renders a plain native <img> for a photo from src/data/imageAssets.js.
 *
 * Serves responsive WebP derivatives via srcSet/sizes (the browser picks
 * the width from the `sizes` estimate and the device's DPR), falls back to
 * the original JPEG as `src` for browsers without srcSet, and carries the
 * photo's intrinsic dimensions so layout never shifts while decoding.
 *
 * No runtime image library — just native HTML attributes:
 *   <Image photo={tentsExterior} sizes="100vw" loading="lazy" />
 *
 * `loading` / `fetchPriority` / `decoding` follow the browser defaults when
 * omitted (eager, auto, async); pass them explicitly per usage site.
 */
export default function Image({
  photo,
  alt = "",
  sizes = "100vw",
  loading,
  fetchPriority,
  decoding = "async",
  className,
  ...rest
}) {
  if (!photo) return null;

  return (
    <img
      src={photo.src}
      srcSet={buildSrcSet(photo.webp)}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      {...rest}
    />
  );
}
