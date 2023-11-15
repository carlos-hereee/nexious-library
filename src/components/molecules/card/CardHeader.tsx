import { Subtitle } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import { HeroCardProps } from "nxs-card";

/**
 * Component - Card Header
 * @param title string;
 * @param subTitle string;
 * @param hero.link string; url to assets
 * @param hero.name string; name of assets
 * @param hasHero boolean; check if component needs assets
 * @returns
 */
const CardHeader: React.FC<HeroCardProps> = (props) => {
  const { hero, data } = props;
  return (
    <div className="card-header">
      {data.title && <h3 className="heading">{data.title}</h3>}{" "}
      {data.tagline && <h4 className="heading">{data.tagline}</h4>}
      {hero && <Hero hero={hero} theme={hero.theme} />}
      {data.subtitle && <Subtitle data={data.subtitle} />}
    </div>
  );
};

export default CardHeader;
