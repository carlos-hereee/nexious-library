import { Heading, Hero, Subtitle } from "@nxs-atoms";
import { CardHeaderProps } from "@nxs-helpers/interface";

type CardHeaderProp = {
  data: CardHeaderProps;
};
/**
 * Component - Card Header
 * @param title string;
 * @param subTitle string;
 * @param hero.link string; url to assets
 * @param hero.name string; name of assets
 * @param hasHero boolean; check if component needs assets
 * @returns
 */
const CardHeader: React.FC<CardHeaderProp> = ({ data }) => {
  return (
    <div className="flex-g card-header">
      <Heading data={data.title} />
      {data.hasHero && data.hero && <Hero data={data.hero} />}
      {data.subtitle && <Subtitle data={data.subtitle} />}
    </div>
  );
};

export default CardHeader;
