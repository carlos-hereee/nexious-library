import { Icon, Navlink } from "@nxs-atoms/index";
import type { MediaProps } from "@nxs-molecules/index";

const NavList: React.FC<MediaProps> = ({ medias, heading, className }) => {
  return (
    <div className={className || "container"}>
      {heading && <h2 className="heading">{heading}</h2>}
      <div className="card-container">
        {medias.map((d) => (
          // label gives the icon-only social links their accessible name
          // (the 2026-07-01 axe pass flagged these as WCAG link-name on
          // every consumer page footer).
          <Navlink key={d.uid} link={d.link || "#"} label={d.media}>
            {d.media && <Icon icon={d.media} name={d.media} size="3x" />}
          </Navlink>
        ))}
      </div>
    </div>
  );
};
export default NavList;
