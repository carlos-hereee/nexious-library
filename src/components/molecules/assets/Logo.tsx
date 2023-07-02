import { HeroProp } from "@nxs-helpers/types";
import { Heading, Hero } from "@nxs-atoms";
import { capFirstChar } from "utils/text";

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
  let heading = logo.name
    ? logo.name.split(" ").map((t) => capFirstChar(t))
    : [""];

  return (
    <div className={name ? `logo ${name}` : "logo"}>
      <Heading data={heading.join(" ")} />
      <Hero
        data={logo}
        name={logoName ? `hero-logo ${logoName}` : "hero-logo"}
      />
    </div>
  );
};

export default Logo;
