import { LinkProp } from "@nxs-helpers/types";

type LinkProps = {
  data: LinkProp;
};

/**
 * Component - Hyperlink
 * @param isLink boolean; check to add link or text
 * @param data.link string; add hyperlinks to text
 * @param data.str string; surronding text thats not a hyperlink
 * @param uid string; unique identifier
 * @returns
 */

const Hyperlink: React.FC<LinkProps> = ({ data }) => {
  return data.isLink ? (
    <a href={data.link} className="link">
      {data.link}
    </a>
  ) : (
    <span>{data.str} </span>
  );
};
export default Hyperlink;
