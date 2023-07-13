import { Btn, Hero } from "@nxs-atoms/index";

type HeroCardProps = {
  heading: string;
  tagline: string;
  hero: {
    url: string;
    alt: string;
    name: string;
  };
  cta: string;
};
const HeroCard: React.FC<HeroCardProps> = (props) => {
  const { heading, tagline, hero, cta } = props;
  return (
    <div className="hero-card">
      <div className="hero-card-header">
        <h1 className="hero-card-heading">{heading}</h1>
        <h3 className="tagline">{tagline}</h3>
        <Btn name={cta}>{cta}</Btn>
      </div>
      <div>
        <Hero hero={hero} name={hero.name} />
      </div>
    </div>
  );
};
export default HeroCard;
