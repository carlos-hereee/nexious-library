import { Hero, Icon } from "@nxs-atoms/index";
import { HeroProp } from "@nxs-helpers/types";

type FeatureCardProps = {
  feature: {
    heading: string;
    description: string;
  };
  hero: HeroProp;
};
const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const { hero, feature } = props;
  return (
    <div className="card feature-card">
      <div className="card-hero-header">
        {hero.isIcon && hero.icon ? (
          <Icon icon={hero.icon} size="6x" name={hero.name} />
        ) : (
          <Hero hero={hero} name={hero.name} />
        )}
        <h2 className="heading">{feature.heading}</h2>
      </div>
      <p>{feature.description}</p>
    </div>
  );
};
export default FeatureCard;
