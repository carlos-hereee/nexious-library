import { Hero, Icon } from "@nxs-atoms/index";
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
  console.log("feature", hero);
  return (
    <div className="card">
      <div className="card-hero-header">
        {hero.isIcon && hero.icon ? (
          <Icon icon={hero.icon} size="6x" name={hero.name} />
        ) : (
          <Hero hero={hero} name={hero.name} />
        )}
        <h2 className="heading">{heading}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
};
export default FeatureCard;
