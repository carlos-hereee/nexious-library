import type { MediaProps } from "nxs-assets";
import { Hero } from "@nxs-molecules";
import { NavList } from "@nxs-organism/index";

const Socials: React.FC<MediaProps> = ({ label, medias, hero, theme }) => {
  if (!hero || !hero.url) return <NavList medias={medias} heading={label} theme={theme} />;
  return (
    <div className={`container-split align-center${theme ? ` ${theme}` : ""}`}>
      {hero && hero.url && <Hero hero={hero} />}
      <NavList medias={medias} heading={label} />
    </div>
  );
};
export default Socials;
