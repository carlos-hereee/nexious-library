import { Hero, Icon } from "@nxs-atoms/index";
import { HeroProp } from "@nxs-utils/helpers/types";

type FeatureCardProps = {
  feature: {
    heading: string;
    body: string;
  };
  hero: HeroProp;
  name?: string;
};
const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const { hero, feature, name } = props;
  return (
    <div className={`card feature-card ${name ? name : ""}`}>
      <div className="card-hero-header">
        {hero.isIcon && hero.icon ? (
          <Icon icon={hero.icon} size="6x" name={hero.name} />
        ) : (
          <Hero hero={hero} name={hero.name} />
        )}
        <h2 className="heading">{feature.heading}</h2>
      </div>
      <p>{feature.body}</p>
    </div>
  );
};
export default FeatureCard;
