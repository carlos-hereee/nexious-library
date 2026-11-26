import { ReadMore } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import type { CardSectionProps } from "nxs-card";

const CardSection: React.FC<CardSectionProps> = (props) => {
  const { hero, hideReadMore, className, data } = props;
  return (
    <div className={`card-section ${className || ""}`}>
      {hero && <Hero hero={hero} className={hero.className} />}
      {hideReadMore ? data && <p className="text-center">{data}</p> : data && <ReadMore data={data} uid="header.uid" />}
    </div>
  );
};

export default CardSection;
