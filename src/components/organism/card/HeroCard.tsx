import { CTA, Hero } from "@nxs-molecules";
import { HeroCardProps } from "nxs-card";

const HeroCard: React.FC<HeroCardProps> = (props) => {
  const { hero, cta, theme } = props;
  const { title, tagline } = props?.data;

  return (
    <div className={`hero-card ${theme ? theme : ""}`}>
      <div className="hero-card-header">
        {title && <h1 className="hero-card-heading">{title}</h1>}
        {tagline && <h2 className="tagline">{tagline}</h2>}
        {cta && <CTA cta={cta} />}
      </div>
      {hero && (
        <div className="hero-container flex-1">
          <Hero hero={hero} theme={hero?.theme} />
        </div>
      )}
    </div>
  );
};
export default HeroCard;
