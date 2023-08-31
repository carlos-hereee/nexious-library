import { Subtitle } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import { CardHeaderProps } from "@nxs-utils/helpers/types";

type CardHeaderProp = {
  data: CardHeaderProps;
  isRow?: boolean;
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
const CardHeader: React.FC<CardHeaderProp> = ({ data, isRow }) => {
  return isRow ? (
    <div className="card-header">
      {data.title && <h3 className="heading">{data.title}</h3>}
      {data.hero && <Hero hero={data.hero} theme={data.hero.theme} />}
    </div>
  ) : (
    <div className="card-header">
      <>
        {data.title && <h3 className="heading">{data.title}</h3>}
        {data.hero && <Hero hero={data.hero} theme={data.hero.theme} />}
      </>
      {data.subtitle && <Subtitle data={data.subtitle} />}
    </div>
  );
};

export default CardHeader;
