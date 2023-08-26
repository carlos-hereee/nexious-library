import { CardFooter, Hero } from "@nxs-molecules";
import { CTAProps, HeroProp } from "@nxs-utils/helpers/types";

type HeroCardProps = {
  data: { title: string; tagline?: string; hero: HeroProp; cta?: CTAProps[] };
};
const HeroCard: React.FC<HeroCardProps> = (props) => {
  const { title, tagline, hero, cta } = props.data;
  return (
    <div className="hero-card">
      <div className="hero-card-header">
        <h1 className="hero-card-heading">{title}</h1>
        {tagline && <h2 className="tagline">{tagline}</h2>}
        {cta && <CardFooter data={cta} />}
      </div>
      <div className="hero-container flex-1">
        <Hero hero={hero} theme={hero.name} />
      </div>
    </div>
  );
};
export default HeroCard;
