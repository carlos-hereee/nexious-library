import { Link } from "react-router-dom";
import { Heading } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import { HeroProps } from "nxs-assets";

const Logo: React.FC<HeroProps> = (props) => {
  const { hero, theme, label } = props;
  return (
    <Link to="/" className={theme ? `logo-link ${theme}` : "logo-link"}>
      {hero && <Hero hero={hero} />}
      {label && <Heading data={label} />}
    </Link>
  );
};

export default Logo;
