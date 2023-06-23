import { HeroProps } from "@nxs-helpers/types";

type Props = {
  data: HeroProps;
  name?: string;
};

/**
 * Component Hero Logo
 * @param data.url string; add url pointing to asset
 * @param data.alt string; add an alt tag
 * @param name string; add an optional classname
 * @returns image component
 */
const Logo: React.FC<Props> = ({ data, name }) => {
  return (
    <img
      className={name ? `hero hero-logo ${name}` : "hero hero-logo"}
      src={data.url}
      alt={data.alt}
    />
  );
};

export default Logo;
