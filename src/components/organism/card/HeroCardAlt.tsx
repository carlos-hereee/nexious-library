import { Hero } from "@nxs-molecules";

type HeroCardProps = {
  data: {
    heading?: string;
    body: string;
    hero: {
      url: string;
      alt: string;
      name: string;
    };
  };
};
const HeroCardAlt: React.FC<HeroCardProps> = (props) => {
  const { heading, body, hero } = props.data;
  return (
    <div className="hero-card-alt">
      {heading && <h1 className="heading">{heading}</h1>}
      <div className="hero-card-body-alt">
        <Hero hero={hero} theme={hero.name} />
        <p className="p-stretch">{body}</p>
      </div>
    </div>
  );
};
export default HeroCardAlt;
