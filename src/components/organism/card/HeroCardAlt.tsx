import { Hero, Btn } from "@nxs-atoms/index";

type HeroCardProps = {
  heading: string;
  body: string;
  hero: {
    url: string;
    alt: string;
    name: string;
  };
};
const HeroCardAlt: React.FC<HeroCardProps> = (props) => {
  const { heading, body, hero } = props;
  return (
    <div className="hero-card-alt">
      <h1 className="heading">{heading}</h1>
      <div className="hero-card-alt-body">
        <Hero hero={hero} name={hero.name} />
        <p className="p-stretch">{body}</p>
      </div>
    </div>
  );
};
export default HeroCardAlt;
