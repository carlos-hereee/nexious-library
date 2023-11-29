import { Icon } from "@nxs-atoms";
import type { MediaProps } from "nxs-assets";
import { Hero } from "@nxs-molecules";

const Socials: React.FC<MediaProps> = (props) => {
  const { label, medias, hero, theme } = props;

  return (
    <div className={`container-split align-center${theme ? ` ${theme}` : ""}`}>
      {hero && <Hero hero={hero} />}
      <div className="container">
        {label && <h2 className="heading">{label}</h2>}
        <div className="card-container">
          {medias.map((d) => (
            <a key={d.uid} className="nav-link" href={d.link || "#"}>
              {d.media && <Icon icon={d.media} name={d.media} size="3x" />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Socials;
