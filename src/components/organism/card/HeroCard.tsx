import { Hero, Btn } from "@nxs-atoms/index";

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
        <h2 className="tagline">{tagline}</h2>
        <Btn name="cta" title={cta}>
          {cta}
        </Btn>
      </div>
      <div className="hero-container">
        <Hero hero={hero} name={hero.name} />
      </div>
    </div>
  );
};
export default HeroCard;
