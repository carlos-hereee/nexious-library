import { HeroProp } from "@nxs-helpers/types";
import { capFirstChar } from "@nxs-utils/text";
import { useState } from "react";

type Props = { hero: HeroProp; name?: string };

/**
 * Component Hero
 * @param hero.url string; add url pointing to asset
 * @param hero.alt string; add an alt tag
 * @param name string; add an optional classname
 * @returns image component
 */
const Hero: React.FC<Props> = ({ hero, name }) => {
  const [load, setLoad] = useState<boolean>();
  const isCreditNeeded = hero.url.includes("unsplash");
  const artistName = hero.credit?.artistName
    .split("-")
    .map((a) => capFirstChar(a))
    .join(" ");

  return isCreditNeeded ? (
    <div
      className={
        load
          ? "credit-unsplash blur-load blur-load--loaded"
          : "credit-unsplash blur-load"
      }
    >
      <img
        loading="lazy"
        className={name ? `hero hero-${name}` : "hero"}
        src={hero.url}
        alt={hero.alt}
        onLoad={() => setLoad(true)}
      />
      <p className="credit-to">
        Photo by <a href={hero.credit?.artistUrl}>{artistName}</a> on{" "}
        <a href={hero.credit?.assetUrl}>Unsplash</a>
      </p>
    </div>
  ) : (
    <div className={load ? "blur-load blur-load--loaded" : "blur-load"}>
      <img
        loading="lazy"
        className={name ? `hero hero-${name}` : "hero"}
        src={hero.url}
        alt={hero.alt}
        onLoad={() => setLoad(true)}
      />
    </div>
  );
};

export default Hero;
