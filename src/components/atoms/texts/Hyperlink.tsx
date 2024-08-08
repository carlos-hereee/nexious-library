/**
 * Component - Hyperlink
 * @param isLink boolean; check to add link or text
 * @param data.link string; add hyperlinks to text
 * @param data.str string; surronding text thats not a hyperlink
 * @param uid string; unique identifier
 * @returns
 */
import type { HyperlinkProp } from "nxs-typography";

const Hyperlink: React.FC<HyperlinkProp> = ({ data, isLink, link }) => {
  if (!isLink) return <span>{data}</span>;
  // dont use just target="_blank" without  rel="noopener noreferrer"
  // It Makes Your Site Vulnerable to Phishing Attacks
  return (
    <a href={link} className="link" rel="noopener noreferrer" target="_blank">
      {data}
    </a>
  );
};
export default Hyperlink;
