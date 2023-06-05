import { Link } from "react-router-dom";

export type HyperlinkProps = {
  data: {
    responseArr: [string, string];
    isLink?: boolean;
    link: string;
    word: string;
  };
};
export const Hyperlink = ({ data }: HyperlinkProps): JSX.Element => {
  return (
    <p>
      <span>{data.responseArr[0]} </span>
      {data.isLink ? (
        <Link to={data.link} className="link">
          {data.word}
        </Link>
      ) : (
        <a href={data.link} className="link">
          {data.word}
        </a>
      )}
      <span>{data.responseArr[1]}</span>
    </p>
  );
};
