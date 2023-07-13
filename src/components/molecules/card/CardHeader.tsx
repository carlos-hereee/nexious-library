import { Hero, Subtitle } from "@nxs-atoms";
import { CardHeaderProps } from "@nxs-helpers/types";

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
  return (
    <div className="card-header">
      {isRow ? (
        <>
          {data.title && <h3 className="heading">{data.title}</h3>}
          {data.hasHero && data.hero && <Hero data={data.hero} />}
        </>
      ) : (
        <div>
          <div>
            {data.title && <h3 className="heading">{data.title}</h3>}
            {data.hasHero && data.hero && <Hero data={data.hero} />}
          </div>
          {data.subtitle && <Subtitle data={data.subtitle} />}
        </div>
      )}
    </div>
  );
};

export default CardHeader;
