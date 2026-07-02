import type { HyperlinkProp } from "nxs-typography";
import { safeUrl } from "@nxs-utils/data/safeUrl";

export const Navlink: React.FC<HyperlinkProp> = ({ data, link, children, label }) => {
  return (
    // aria-label only when provided AND there is no visible text (data), so a
    // text link's announced name always matches its visible label (WCAG 2.5.3).
    <a href={safeUrl(link)} className="nav-link" aria-label={!data && label ? label : undefined}>
      {data}
      {children}
    </a>
  );
};

export default Navlink;
