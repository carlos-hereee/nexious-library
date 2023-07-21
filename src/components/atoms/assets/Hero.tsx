import { HeroProp } from "@nxs-helpers/types";
import { capFirstChar } from "@nxs-utils/text";

type Props = { hero: HeroProp; name?: string };

/**
 * Component Hero
 * @param hero.url string; add url pointing to asset
 * @param hero.alt string; add an alt tag
 * @param name string; add an optional classname
 * @returns image component
 */
const Hero: React.FC<Props> = ({ hero, name }) => {
  const isCreditNeeded = hero.url.includes("unsplash");
  const artistName = hero.credit?.artistName
    .split("-")
    .map((a) => capFirstChar(a))
    .join(" ");

  return isCreditNeeded ? (
    <div className="credit-unsplash">
      <img
        className={name ? `hero hero-${name}` : "hero"}
        src={hero.url}
        alt={hero.alt}
      />
      <p className="credit-to">
        Photo by <a href={hero.credit?.artistUrl}>{artistName}</a> on{" "}
        <a href={hero.credit?.assetUrl}>Unsplash</a>
      </p>
    </div>
  ) : (
    <img
      className={name ? `hero hero-${name}` : "hero"}
      src={hero.url}
      alt={hero.alt}
    />
  );
};

export default Hero;
