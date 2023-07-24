import { Hero, Btn, Icon } from "@nxs-atoms/index";

type HeroCardProps = {
  heading: string;
  tagline?: string;
  hero: {
    url: string;
    alt: string;
    name: string;
  };
  cta?: string;
};
const HeroCard: React.FC<HeroCardProps> = (props) => {
  const { heading, tagline, hero, cta } = props;
  return (
    <div className="hero-card">
      <div className="hero-card-header">
        <h1 className="hero-card-heading">{heading}</h1>
        {tagline && <h2 className="tagline">{tagline}</h2>}
        {cta && (
          <Btn name="cta" title={cta}>
            <Icon icon="checkout" />
            {cta}
          </Btn>
        )}
      </div>
      <div className="hero-container flex-1">
        <Hero hero={hero} name={hero.name} />
      </div>
    </div>
  );
};
export default HeroCard;
