import type { HyperlinkProp } from "nxs-typography";

export const Navlink: React.FC<HyperlinkProp> = ({ data, link }) => {
  return (
    <a href={link} className="nav-link">
      {data}
    </a>
  );
};

export default Navlink;
