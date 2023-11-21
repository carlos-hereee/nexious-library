import { Icon } from "@nxs-atoms";
import type { MediaProps } from "nxs-assets";
import { Hero } from "@nxs-molecules";

const Socials: React.FC<MediaProps> = (props) => {
  const { label, medias, hero } = props;

  return (
    <div className="flex-d-column text-center">
      <div className="container-split align-center">
        {label && <h2 className="heading">{label}</h2>}
        {hero && <Hero hero={hero} theme="hero-thumbnail" />}
      </div>
      <div className="socials-icons">
        {medias.length > 0 &&
          medias.map((d) => (
            <a key={d.uid || d.sharedKey} className="nav-link" href={d.link || "#"}>
              {d.media && <Icon icon={d.media} name={d.media} size="3x" />}
            </a>
          ))}
      </div>
    </div>
  );
};
export default Socials;
