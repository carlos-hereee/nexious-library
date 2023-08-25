import { HeroProp } from "@nxs-utils/helpers/types";
import { useState } from "react";
import { UnsplashCredit } from "@nxs-atoms";

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

  return (
    <div
      className={load ? "blur-load--loaded" : "blur-load"}
      style={{ backgroundImage: `url(${hero.small})` }}
    >
      <img
        loading="lazy"
        className={name ? `hero ${name}` : "hero"}
        src={hero.url}
        alt={hero.alt}
        onLoad={() => setLoad(true)}
      />
      {hero.credit && <UnsplashCredit creditTo={hero.credit} />}
    </div>
  );
};

export default Hero;
