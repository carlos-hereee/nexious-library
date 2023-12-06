import type { HeroProps } from "@nxs-molecules/index";

const Image = (props: HeroProps) => {
  const { theme, onImageClick, imageRef, hero, onImageLoad } = props;

  if (!hero.url) {
    return (
      <button type="button" className="preview-hero-empty" onClick={onImageClick}>
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
