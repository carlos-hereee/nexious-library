import { CTA, Hero } from "@nxs-molecules";
import type { HeroCardProps } from "nxs-card";

const HeroCard: React.FC<HeroCardProps> = (props) => {
  const { hero, theme, onClick, data, viewAsPreview } = props;

  if (!data) return <div />;
  const { title, tagline } = data;
  return (
    <div className={`hero-card ${theme || ""}`}>
      <div className="hero-card-header">
        {title && <h1 className="hero-card-heading">{title}</h1>}
        {tagline && <h2 className="tagline">{tagline}</h2>}
        {data.cta && <CTA cta={data.cta} onClick={onClick} viewAsPreview={viewAsPreview} />}
      </div>
      {hero && <Hero hero={hero} theme={hero?.theme} />}
    </div>
  );
};
export default HeroCard;
