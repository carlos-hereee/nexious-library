import { Hero } from "@nxs-atoms/index";
import { HeroProp } from "@nxs-helpers/types";

type FeatureCardProps = {
  feature: {
    hero: HeroProp;
    heading: string;
    description: string;
  };
};
const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const { hero, heading, description } = feature;
  return (
    <div className="card">
      <div className="card-hero-header">
        <Hero hero={hero} />
        <h2 className="heading">{heading}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
};
export default FeatureCard;
