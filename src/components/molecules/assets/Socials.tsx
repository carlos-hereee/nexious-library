import { Icon } from "@nxs-atoms/index";

type SocialsProps = {
  data: {
    name: string;
    uid?: string;
    link: string;
  }[];
  heading: string;
};
const Socials: React.FC<SocialsProps> = (props) => {
  const { heading, data } = props;
  return (
    <div className="flex-d-column text-center">
      <h2 className="heading">{heading}</h2>
      <div className="socials-icons">
        {data.length > 0 &&
          data.map((d) => (
            <Icon key={d.uid} icon={d.name} name={d.name} size="4x" />
          ))}
      </div>
    </div>
  );
};
export default Socials;
