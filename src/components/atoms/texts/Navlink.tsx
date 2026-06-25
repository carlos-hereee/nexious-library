import type { HyperlinkProp } from "nxs-typography";
import { safeUrl } from "@nxs-utils/data/safeUrl";

export const Navlink: React.FC<HyperlinkProp> = ({ data, link, children }) => {
  return (
    <a href={safeUrl(link)} className="nav-link">
      {data}
      {children}
    </a>
  );
};

export default Navlink;
