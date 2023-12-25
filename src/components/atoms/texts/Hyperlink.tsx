/**
 * Component - Hyperlink
 * @param isLink boolean; check to add link or text
 * @param data.link string; add hyperlinks to text
 * @param data.str string; surronding text thats not a hyperlink
 * @param uid string; unique identifier
 * @returns
 */
import type { HyperlinkProp } from "nxs-typography";

const Hyperlink: React.FC<HyperlinkProp> = (props) => {
  const { data, isLink, link } = props;
  return isLink ? (
    // dont use just target="_blank" without  rel="noopener noreferrer"
    // It Makes Your Site Vulnerable to Phishing Attacks
    <a href={link} className="link" rel="noopener noreferrer" target="_blank">
      {data}
    </a>
  ) : (
    <span>{data} </span>
  );
};
export default Hyperlink;
