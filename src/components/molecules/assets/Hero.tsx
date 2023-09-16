import { HeroProp } from "@nxs-utils/helpers/types";
import { useState } from "react";
import { ErrorMessage, UnsplashCredit } from "@nxs-atoms";

type Props = {
  hero: HeroProp;
  theme?: string;
  onImageClick?: (e: any) => void;
};

/**
 * Component Hero
 * @param hero.url string; add url pointing to asset
 * @param hero.alt string; add an alt tag
 * @param theme string; add an optional classname
 * @returns image component
 */
const Hero: React.FC<Props> = ({ hero, theme, onImageClick }) => {
  const [load, setLoad] = useState<boolean>();
  if (!hero) return <ErrorMessage code="missingProps" prop="hero" />;
  return hero?.small ? (
    <div
      className={load ? "blur-load--loaded" : "blur-load"}
      style={{ backgroundImage: `url(${hero.small})` }}
    >
      {hero.url ? (
        <img
          loading="lazy"
          crossOrigin="anonymous"
          className={theme ? `hero ${theme}` : "hero"}
          src={hero.url}
          alt={hero.alt}
          onLoad={() => setLoad(true)}
        />
      ) : (
        <button
          type="button"
          className="preview-hero-empty"
          onClick={onImageClick}
        >
          ?
        </button>
      )}
      {hero.credit && <UnsplashCredit creditTo={hero.credit} />}
    </div>
  ) : (
    <>
      {hero.url ? (
        <img
          loading="lazy"
          crossOrigin="anonymous"
          className={theme ? `hero ${theme}` : "hero"}
          src={hero.url}
          alt={hero.alt}
          onLoad={() => setLoad(true)}
        />
      ) : (
        <button
          type="button"
          className="preview-hero-empty"
          onClick={onImageClick}
        >
          ?
        </button>
      )}
      {hero.credit && <UnsplashCredit creditTo={hero.credit} />}
    </>
  );
};

export default Hero;
