import type { HeroProps } from "@nxs-molecules/index";

const Image = (props: HeroProps) => {
  const { theme, onImageClick, imageRef, hero, onImageLoad } = props;

  if (!hero.url) {
    return (
      {/* Added aria-label: the visible content is just "?" which screen readers
          would announce literally. This gives assistive tech a meaningful label. */}
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
      crossOrigin="anonymous"
      className={theme ? `hero ${theme}` : "hero"}
      ref={imageRef}
      src={hero.url}
      alt={hero.alt}
      onLoad={onImageLoad}
    />
  );
};
export default Image;
