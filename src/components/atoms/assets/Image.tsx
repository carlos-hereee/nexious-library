import { useState } from "react";
import type { HeroProps } from "@nxs-molecules/index";

const Image = (props: HeroProps) => {
  const { theme, onImageClick, imageRef, hero, onImageLoad, crossOrigin } = props;

  // Track the src that failed to load so a broken or unreachable image degrades to
  // the neutral placeholder below instead of the browser's broken-image glyph on a
  // public surface. Comparing against hero.url (rather than a plain boolean) resets
  // the failure automatically when the url changes, so a corrected or retried asset
  // can load on the next render without a separate effect.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasFailed = !!hero.url && failedSrc === hero.url;

  if (!hero.url || hasFailed) {
    // aria-label: visible content is "?", so give assistive tech a meaningful label
    return (
      <button
        name="unknown-img"
        type="button"
        className="preview-hero-empty highlight"
        aria-label="No image available"
        onClick={onImageClick}
        disabled={!onImageClick}
      >
        ?
      </button>
    );
  }
  return (
    <img
      loading="lazy"
      // crossOrigin is opt in (default off). Forcing "anonymous" made every image a
      // CORS-enforced load, which fails for cross-origin assets whose host omits the
      // Access-Control-Allow-Origin header (the production S3 bucket, FUTURE_PLANS
      // item 68), painting a broken image. Nothing here reads pixels via canvas, so
      // CORS is not needed by default; a caller that needs a clean canvas opts in.
      crossOrigin={crossOrigin ? "anonymous" : undefined}
      className={theme ? `hero ${theme}` : "hero"}
      ref={imageRef}
      src={hero.url}
      alt={hero.alt}
      onLoad={onImageLoad}
      onError={() => setFailedSrc(hero.url ?? null)}
    />
  );
};
export default Image;
