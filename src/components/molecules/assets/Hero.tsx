import { HeroProp } from "@nxs-utils/helpers/types";
import { useState } from "react";
import { ErrorMessage, UnsplashCredit } from "@nxs-atoms";

type Props = { hero: HeroProp; theme?: string };

/**
 * Component Hero
 * @param hero.url string; add url pointing to asset
 * @param hero.alt string; add an alt tag
 * @param theme string; add an optional classname
 * @returns image component
 */
const Hero: React.FC<Props> = ({ hero, theme }) => {
  const [load, setLoad] = useState<boolean>();
  if (!hero) return <ErrorMessage code="missingProps" prop="hero" />;
  return hero?.small ? (
    <div
      className={load ? "blur-load--loaded" : "blur-load"}
      style={{ backgroundImage: `url(${hero.small})` }}
    >
      <img
        loading="lazy"
        className={theme ? `hero ${theme}` : "hero"}
        src={hero.url}
        alt={hero.alt}
        onLoad={() => setLoad(true)}
      />
      {hero.credit && <UnsplashCredit creditTo={hero.credit} />}
    </div>
  ) : (
    <div>
      <img
        loading="lazy"
        className={theme ? `hero ${theme}` : "hero"}
        src={hero.url}
        alt={hero.alt}
        onLoad={() => setLoad(true)}
      />
      {hero.credit && <UnsplashCredit creditTo={hero.credit} />}
    </div>
  );
};

export default Hero;
