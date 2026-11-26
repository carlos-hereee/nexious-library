import { CardHeader, Hero } from "@nxs-molecules";
import type { HeroCardProps } from "nxs-card";

const HeroCard: React.FC<HeroCardProps> = (props) => {
  const { hero, className, onClick, data, viewAsPreview } = props;

  // returning <div /> takes up layout space and can shift surrounding elements.
  // null renders nothing and is the correct React idiom for "nothing to show".
  if (!data) return null;
  return (
    <div className={`hero-card ${className || ""}`}>
      <CardHeader data={data} className="hero-card-header" onClick={onClick} viewAsPreview={viewAsPreview} />
      {hero && <Hero hero={hero} className={hero?.className} />}
    </div>
  );
};
export default HeroCard;
