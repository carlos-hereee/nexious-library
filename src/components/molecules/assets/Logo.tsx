import { Link } from "react-router-dom";
import { Heading } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import type { HeroProps } from "nxs-assets";

const Logo: React.FC<HeroProps> = (props) => {
  const { hero, theme, label, onLogoClick } = props;

  if (onLogoClick)
    return (
      <button type="button" className="btn-logo" onClick={onLogoClick}>
        {hero && <Hero hero={hero} theme="logo" />}
        {label && <Heading data={label} />}
      </button>
    );
  return (
    <Link to="/" className={theme ? `logo-link ${theme}` : "logo-link"}>
      {hero && <Hero hero={hero} theme="logo" />}
      {label && <Heading data={label} />}
    </Link>
  );
};

export default Logo;
