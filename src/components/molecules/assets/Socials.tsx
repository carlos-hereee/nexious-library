import { Icon } from "@nxs-atoms/index";
import { SocialMedia } from "@nxs-utils/helpers/types";

type SocialsProps = {
  socials: SocialMedia[];
  heading?: string;
};
const Socials: React.FC<SocialsProps> = (props) => {
  const { heading, socials } = props;
  return (
    <div className="flex-d-column text-center">
      {heading && <h2 className="heading">{heading}</h2>}
      <div className="socials-icons">
        {socials.length > 0 &&
          socials.map((d) => (
            <Icon key={d.uid} icon={d.name} name={d.name} size="3x" />
          ))}
      </div>
    </div>
  );
};
export default Socials;
