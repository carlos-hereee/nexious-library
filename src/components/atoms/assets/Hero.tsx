import { HeroProp } from "@nxs-helpers/types";

type Props = { hero: HeroProp; name?: string };

/**
 * Component Hero
 * @param hero.url string; add url pointing to asset
 * @param hero.alt string; add an alt tag
 * @param name string; add an optional classname
 * @returns image component
 */
const Hero: React.FC<Props> = ({ hero, name }) => {
  return (
    <img
      className={name ? `hero hero-${name}` : "hero"}
      src={hero.url}
      alt={hero.alt}
    />
  );
};

export default Hero;
