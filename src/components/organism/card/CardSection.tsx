import { ReadMore } from "@nxs-atoms";
import { HeroProp } from "@nxs-utils/helpers/types";
import { Hero } from "@nxs-molecules";
import { CardSectionProps } from "nxs-card-section";

const CardSection: React.FC<CardSectionProps> = (props) => {
  const { hero, hideReadMore, theme, data } = props;
  return (
    <div className={`card-section ${theme ? theme : ""}`}>
      {hero && <Hero hero={hero} theme={hero.theme} />}
      {hideReadMore
        ? data && <p className="text-center">{data}</p>
        : data && <ReadMore data={data} uid="header.uid" />}
    </div>
  );
};

export default CardSection;
