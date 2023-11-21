import { CTA, Hero } from "@nxs-molecules";
import type { HeroCardProps } from "nxs-card";

const HeroCard: React.FC<HeroCardProps> = (props) => {
  const { hero, cta, theme, onClick, data } = props;

  if (!data) return <div />;

  const { title, tagline } = data;
  return (
    <div className={`hero-card ${theme || ""}`}>
      <div className="hero-card-header">
        {title && <h1 className="hero-card-heading">{title}</h1>}
        {tagline && <h2 className="tagline">{tagline}</h2>}
        {cta && <CTA cta={cta} onClick={onClick} />}
      </div>
      {hero && (
        <div className="flex-center">
          <Hero hero={hero} theme={hero?.theme} />
        </div>
      )}
    </div>
  );
};
export default HeroCard;
