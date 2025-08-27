import { Icon, Navlink } from "@nxs-atoms/index";
import type { MediaProps } from "@nxs-molecules/index";

const NavList: React.FC<MediaProps> = ({ medias, heading, theme }) => {
  return (
    <div className={theme || "container"}>
      {heading && <h2 className="heading">{heading}</h2>}
      <div className="card-container">
        {medias.map((d) => (
          <Navlink key={d.uid} link={d.link || "#"}>
            {d.media && <Icon icon={d.media} name={d.media} size="3x" />}
          </Navlink>
        ))}
      </div>
    </div>
  );
};
export default NavList;
