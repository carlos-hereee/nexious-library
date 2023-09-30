import { Icon } from "@nxs-atoms";
import { MediaProps } from "nxs-assets-medias";

const Socials: React.FC<MediaProps> = (props) => {
  const { label, medias } = props;
  return (
    <div className="flex-d-column text-center">
      {label && <h2 className="heading">{label}</h2>}
      <div className="socials-icons">
        {medias.length > 0 &&
          medias.map(
            (d) => d.icon && <Icon key={d.uid} icon={d.icon} name={d.name} size="3x" />
          )}
      </div>
    </div>
  );
};
export default Socials;
