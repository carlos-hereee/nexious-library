import { Hero } from "@nxs-molecules";
import type { HeroProps } from "nxs-assets";

const Logo: React.FC<HeroProps> = (props) => {
  const { hero, label, onLogoClick } = props;

  return (
    <button type="button" className="btn-logo" onClick={onLogoClick}>
      {hero && <Hero hero={hero} theme="logo" />}
      {label && <h2 className="hide-on-mobile heading">{label}</h2>}
    </button>
  );
};

export default Logo;
