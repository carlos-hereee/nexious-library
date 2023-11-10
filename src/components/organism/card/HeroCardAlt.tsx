import { Hero } from "main";
import { AssetProps } from "nxs-assets";

type HeroCardProps = {
  data: {
    heading?: string;
    body: string;
    hero: AssetProps;
  };
};
const HeroCardAlt: React.FC<HeroCardProps> = (props) => {
  const { heading, body, hero } = props.data;
  return (
    <div className="hero-card-alt">
      {heading && <h1 className="heading">{heading}</h1>}
      <div className="hero-card-body-alt">
        <Hero hero={hero} theme={hero.theme} />
        <p className="text-max">{body}</p>
      </div>
    </div>
  );
};
export default HeroCardAlt;
