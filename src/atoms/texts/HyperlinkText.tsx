import { Link } from "react-router-dom";

const HyperlinkText = ({ data }) => {
  return (
    <p>
      <span>{data.responseArr[0]} </span>
      {data.isNav ? (
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

export default HyperlinkText;
