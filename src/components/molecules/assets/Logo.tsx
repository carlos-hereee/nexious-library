import { HeroProp } from "@nxs-utils/helpers/types";
import { Heading } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";

export type LogoProps = {
  logo: HeroProp;
  name?: string;
  logoName?: string;
};

/**
 * Component Hero Logo
 * @param logo.url string; add url pointing to asset
 * @param logo.alt string; add an alt tag
 * @param name string; add an optional classname for logo container
 * @param logoName string; add an optional classname for logo asset
 * @returns image component
 */
const Logo: React.FC<LogoProps> = ({ logo, name, logoName }) => {
  return (
    <div className={name ? `logo ${name}` : "logo"}>
      <Hero
        hero={logo}
        name={logoName ? `hero-logo ${logoName}` : "hero-logo"}
      />
      {name && <Heading data={name} />}
    </div>
  );
};

export default Logo;
