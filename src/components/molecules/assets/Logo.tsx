import { HeroProp } from "@nxs-utils/helpers/types";
import { Heading } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import { Link } from "react-router-dom";

export type LogoProps = {
  logo: HeroProp;
  theme?: string;
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
  const { label, theme } = logo;
  console.log("logo", logo);
  return (
    <Link to="/" className={theme ? `logo-link ${theme}` : "logo-link"}>
      <Hero hero={logo} />
      {label && <Heading data={label} />}
    </Link>
  );
};

export default Logo;
