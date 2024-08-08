import type { HyperlinkProp } from "nxs-typography";

export const Navlink: React.FC<HyperlinkProp> = ({ data, link, children }) => {
  return (
    <a href={link} className="nav-link">
      {data}
      {children}
    </a>
  );
};

export default Navlink;
