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
const Hero: React.FC<HeroProps> = (props) => {
  const { hero, theme, onImageClick, imageRef, isDisable, layout, isDev } = props;
  const [load, setLoad] = useState<boolean>();

  if (!hero)
    return <ErrorMessage isDev={isDev} error={{ code: "missingProps", prop: "hero", value: hero, component: "Hero" }} />;
  if (!hero.url) {
    return (
      <Image
        onImageClick={!isDisable ? onImageClick : undefined}
        onImageLoad={() => setLoad(true)}
        hero={hero}
        imageRef={imageRef}
        theme={theme}
      />
    );
  }

  const loadStyling = load ? "blur-load--loaded" : "blur-load";
  const designStyle = layout ? `${layout} ${loadStyling}` : loadStyling;
  if (load) {
    return (
      <>
        <Image
          onImageClick={!isDisable ? onImageClick : undefined}
          onImageLoad={() => setLoad(true)}
          hero={hero}
          imageRef={imageRef}
          theme={theme}
        />
        {hero.creditTo && <UnsplashCredit creditTo={hero.creditTo} />}
      </>
    );
  }
  return (
    <div
      className={load ? designStyle : undefined}
      // Only paint the blur-up placeholder when a low-res `small` thumbnail exists.
      // Without this guard a hero that has no `small` (e.g. user avatars, which pass
      // only { url, alt }) emits `background-image: url(undefined)`; the browser then
      // resolves the literal "undefined" as a relative URL and fires a 404.
      style={hero.small ? { backgroundImage: `url(${hero.small})` } : undefined}
    >
      <Image
        onImageClick={!isDisable ? onImageClick : undefined}
        onImageLoad={() => setLoad(true)}
        hero={hero}
        imageRef={imageRef}
        theme={theme}
      />
      {hero.creditTo && <UnsplashCredit creditTo={hero.creditTo} />}
    </div>
  );
};

export default Hero;
