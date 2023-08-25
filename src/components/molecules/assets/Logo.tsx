import { HeroProp } from "@nxs-utils/helpers/types";
import { Heading } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import { Link } from "react-router-dom";

export type LogoProps = {
  logo: HeroProp;
};

/**
 * Component Hero Logo
 * @param logo.url string; add url pointing to asset
 * @param logo.alt string; add an alt tag
 * @param name string; add an optional classname for logo container
 * @param logoName string; add an optional classname for logo asset
 * @returns image component
 */
const Logo: React.FC<LogoProps> = ({ logo }) => {
  const { label, name } = logo;
  return (
    <div className={name ? `logo ${name}` : "logo"}>
      <Link to="/" className="logo-link">
        <Hero hero={logo} name={name} />
      </Link>
      {label && <Heading data={label} />}
    </div>
  );
};

export default Logo;
