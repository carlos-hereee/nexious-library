import { HeroProps } from "@nxs-helpers/types";

type Props = { data: HeroProps; name?: string };

/**
 * Component Hero
 * @param data.url string; add url pointing to asset
 * @param data.alt string; add an alt tag
 * @param name string; add an optional classname
 * @returns image component
 */
const Hero: React.FC<Props> = ({ data, name }) => {
  return (
    <img
      className={name ? `hero ${name}` : "hero"}
      src={data.url}
      alt={data.alt}
    />
  );
};

export default Hero;
