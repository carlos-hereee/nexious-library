import { HeroProps } from "@nxs-helpers/types";
import { Capitalize, Heading, Hero } from "@nxs/atoms";

export type LogoProps = {
  data: HeroProps;
  title: string;
  name?: string;
  logoName?: string;
};

/**
 * Component Hero Logo
 * @param data.url string; add url pointing to asset
 * @param data.alt string; add an alt tag
 * @param name string; add an optional classname for logo container
 * @param logoName string; add an optional classname for logo asset
 * @returns image component
 */
const Logo: React.FC<LogoProps> = ({ data, name, title, logoName }) => {
  let heading = title.split(" ").map((t) => <Capitalize data={t} key={t} />);
  console.log("heading", heading);
  return (
    <div className={name ? `logo ${name}` : "logo"}>
      <Heading data={title} />
      <Hero
        data={data}
        name={logoName ? `hero-logo ${logoName}` : "hero-logo"}
      />
    </div>
  );
};

export default Logo;
