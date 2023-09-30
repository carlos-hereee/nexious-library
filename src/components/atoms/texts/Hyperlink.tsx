/**
 * Component - Hyperlink
 * @param isLink boolean; check to add link or text
 * @param data.link string; add hyperlinks to text
 * @param data.str string; surronding text thats not a hyperlink
 * @param uid string; unique identifier
 * @returns
 */

import { HyperlinkProp } from "nxs-typography";

const Hyperlink: React.FC<HyperlinkProp> = (props) => {
  const { data, isLink } = props;
  return isLink ? (
    <a href={data} className="link">
      {data}
    </a>
  ) : (
    <span>{data} </span>
  );
};
export default Hyperlink;
