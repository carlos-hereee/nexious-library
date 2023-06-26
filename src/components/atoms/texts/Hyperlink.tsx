import { LinkProp } from "@nxs-helpers/types";

type LinkProps = {
  data: LinkProp;
};

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
