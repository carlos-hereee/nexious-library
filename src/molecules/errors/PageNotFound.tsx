import { PageNotFoundProps } from "helpers/types.js";
import { Hero } from "atoms/index.js";

const PageNotFound: React.FC<PageNotFoundProps> = ({ message, hero }) => {
  return (
    <div className="container-not-found">
      <Hero data={hero} />
      <p className="not-found">{message}</p>
    </div>
  );
};

export default PageNotFound;
