import { useState } from "react";
import { ErrorMessage, Image, UnsplashCredit } from "@nxs-atoms";
import type { HeroProps } from "nxs-assets";

/**
 * Component Hero
 * @param hero.url string; add url pointing to asset
 * @param hero.alt string; add an alt tag
 * @param theme string; add an optional classname
 * @returns image component
 */
const Hero: React.FC<HeroProps> = ({ hero, theme, onImageClick, imageRef }) => {
  const [load, setLoad] = useState<boolean>();

  if (!hero) {
    return <ErrorMessage error={{ code: "missingProps", prop: "hero", value: hero }} />;
  }
  return hero?.small ? (
    <div
      className={load ? "blur-load--loaded" : "blur-load"}
      style={{ backgroundImage: `url(${hero.small})` }}
    >
      <Image
        onImageClick={onImageClick}
        onImageLoad={() => setLoad(true)}
        hero={hero}
        imageRef={imageRef}
        theme={theme}
      />
      {hero.creditTo && <UnsplashCredit creditTo={hero.creditTo} />}
    </div>
  ) : hero.creditTo ? (
    <div className="hero-wrapper">
      <Image
        onImageClick={onImageClick}
        onImageLoad={() => setLoad(true)}
        hero={hero}
        imageRef={imageRef}
        theme={theme}
      />
      {hero.creditTo && <UnsplashCredit creditTo={hero.creditTo} />}
    </div>
  ) : (
    <Image
      onImageClick={onImageClick}
      onImageLoad={() => setLoad(true)}
      hero={hero}
      imageRef={imageRef}
      theme={theme}
    />
  );
};

export default Hero;
