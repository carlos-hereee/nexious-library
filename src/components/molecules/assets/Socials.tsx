import { Icon } from "@nxs-atoms";
import type { MediaProps } from "nxs-assets";

const Socials: React.FC<MediaProps> = (props) => {
  const { label, medias } = props;
  return (
    <div className="flex-d-column text-center">
      {label && <h2 className="heading">{label}</h2>}
      <div className="socials-icons">
        {medias.length > 0 &&
          medias.map(
            (d) =>
              d.media && (
                <Icon key={d.uid || d.sharedKey} icon={d.media} name={d.media} size="3x" />
              )
          )}
      </div>
    </div>
  );
};
export default Socials;
