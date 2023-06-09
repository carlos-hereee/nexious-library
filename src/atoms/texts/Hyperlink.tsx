import { HyperlinkProps } from "helpers/interface.js";

const Hyperlink: React.FC<HyperlinkProps> = ({ data }) => {
  return (
    <p>
      <span>{data.responseArr[0]} </span>
      {data.isLink && (
        <a href={data.link} className="link">
          {data.word}
        </a>
      )}
      <span>{data.responseArr[1]}</span>
    </p>
  );
};
export default Hyperlink;
