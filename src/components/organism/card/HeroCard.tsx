import { CardHeader, Hero } from "@nxs-molecules";
import type { HeroCardProps } from "nxs-card";

const HeroCard: React.FC<HeroCardProps> = (props) => {
  const { hero, theme, onClick, data, viewAsPreview } = props;

  if (!data) return <div />;
  return (
    <div className={`hero-card ${theme || ""}`}>
      <CardHeader data={data} theme="hero-card-header" onClick={onClick} viewAsPreview={viewAsPreview} />
      {hero && <Hero hero={hero} theme={hero?.theme} />}
    </div>
  );
};
export default HeroCard;
