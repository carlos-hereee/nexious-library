import { NavlinkProp } from "@nxs-helpers/types";

export const Navlink: React.FC<NavlinkProp> = ({ data, link }) => {
  return (
    <a href={link} className="nav-link">
      {data}
    </a>
  );
};

export default Navlink;
